import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[60px] flex items-center justify-between bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 fixed top-0 w-full z-50 shadow-lg">
      <MobileSidebar />
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image 
          src="/LOGO.png" 
          alt="DevJourney" 
          width={32} 
          height={32}
          className="rounded-lg"
          style={{ width: 'auto', height: 'auto' }}
        />
        <h1 className="text-xl font-bold text-white">DevJourney</h1>
      </div>
      
      <div className="w-10" /> {/* Spacer for centering */}
    </nav>
  );
};