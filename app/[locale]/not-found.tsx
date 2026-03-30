"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Liens en <a> pour rechargement complet : évite fond noir après nav depuis 404 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = () => window.location.href = "/";
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-[#0000aa] flex flex-col items-center justify-center text-center px-6 text-white font-mono select-none">
      <h1 className="bg-white text-[#0000aa] px-4 py-2 inline-block text-xl font-bold mb-8">
        WINDOWS_XP_ERROR_STYLE
      </h1>
      <div className="text-[6rem] md:text-[8rem] font-bold opacity-90 mb-6">404</div>
      <p className="text-lg max-w-lg leading-relaxed mb-8 text-white/90">
        A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.
        <br /><br />
        The page you are looking for has been terminated.
        <br /><br />
        * Press any key to continue.
        <br />
        * Press CTRL+ALT+DEL to restart your browser.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 border-2 border-white px-6 py-3 font-bold hover:bg-white hover:text-[#0000aa] transition-colors shadow-[2px_2px_0_#fff] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
      >
        _REBOOT_SYSTEM (HOME)
      </a>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
        <a href="/contact" className="text-white/80 hover:text-white underline">Contact</a>
        <a href="/a-propos" className="text-white/80 hover:text-white underline">À propos</a>
      </div>
      <span className="mt-4 inline-block w-4 h-6 bg-white animate-pulse" title="Press any key" />
    </main>
  );
}
