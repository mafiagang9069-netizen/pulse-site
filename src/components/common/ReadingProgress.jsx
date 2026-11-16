import React, { useState, useEffect } from "react";

export default function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(3)) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollCompletion, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(completion)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        className="h-full bg-[#315CF5] transition-all duration-75 ease-out shadow-sm shadow-[#315CF5]/50"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
