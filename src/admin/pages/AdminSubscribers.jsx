import React, { useState, useEffect } from "react";
import { Users, Download, Mail, CheckCircle2 } from "lucide-react";
import { getNewsletterSubscribers } from "../../firebase/firestore";
import SEO from "../../components/common/SEO";

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getNewsletterSubscribers();
        setSubscribers(data || []);
      } catch (e) {
        setSubscribers([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const exportCSV = () => {
    if (subscribers.length === 0) {
      alert("No subscribers to export.");
      return;
    }
    const headers = "Email,SubscribedAt,Status\n";
    const rows = subscribers.map(s => `"${s.email}","${s.subscribedAt || ''}","${s.status || 'active'}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `pulse-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <SEO title="Newsletter Subscribers — CMS" canonicalPath="/admin/subscribers" noIndex={true} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#315CF5]">Audience</span>
          <h1 className="font-serif text-3xl font-extrabold text-[#171717] dark:text-white mt-1">
            Newsletter Subscribers
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            The Morning Pulse Dispatch subscriber base.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg flex items-center space-x-2 transition-colors shadow-sm whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white dark:bg-[#181B22] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>Total Records: {subscribers.length}</span>
          <span>Status: Synchronized</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-neutral-400">Loading subscribers...</div>
        ) : subscribers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAFAF8] dark:bg-[#12151D] text-xs font-mono uppercase text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="py-3 px-6">Subscriber Email</th>
                  <th className="py-3 px-4">Subscribed At</th>
                  <th className="py-3 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {subscribers.map((sub, i) => (
                  <tr key={sub.id || i} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="py-4 px-6 font-mono text-xs font-medium">
                      {sub.email}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-neutral-500">
                      {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleString() : "—"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {sub.status || "active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-neutral-500 text-sm">
            <Mail className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
            <p>No newsletter subscribers recorded in Cloud Firestore yet.</p>
            <p className="text-xs text-neutral-400 mt-1">Readers subscribing via the homepage or footer form will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
