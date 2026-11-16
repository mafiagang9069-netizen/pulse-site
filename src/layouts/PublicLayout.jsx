import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Ticker from "../components/common/Ticker";
import { getPublishedArticles } from "../firebase/firestore";

export default function PublicLayout() {
  const { pathname } = useLocation();
  const [tickerArticles, setTickerArticles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;
    async function loadTicker() {
      try {
        const articles = await getPublishedArticles({ maxItems: 10 });
        if (isMounted && articles) {
          setTickerArticles(articles);
        }
      } catch (e) {
        // Fallback ticker handled internally
      }
    }
    loadTicker();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8] dark:bg-[#0F1115] text-[#171717] dark:text-[#F3F4F6] transition-colors duration-200">
      <Ticker articles={tickerArticles} />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
