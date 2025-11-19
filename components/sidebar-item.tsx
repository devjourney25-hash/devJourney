"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  iconSrc?: string;
  href: string;
};

export const SidebarItem = ({ label, iconSrc, href }: Props) => {
  const pathname = usePathname();

  // Special handling for lesson module routes
  const active = href === "/lessonModule"
    ? pathname === "/lessonModule" || pathname.startsWith("/lessonModule/")
    : pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        active
          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/10"
          : "hover:bg-slate-800/50 border border-transparent hover:border-slate-700"
      )}
    >
      {iconSrc && (
        <div className={cn(
          "relative w-8 h-8 flex-shrink-0 transition-all",
          active && "scale-110"
        )}>
          <Image
            src={iconSrc}
            alt={label}
            width={32}
            height={32}
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      )}
      <span className={cn(
        "text-sm font-medium transition-colors",
        active
          ? "text-blue-400 font-semibold"
          : "text-gray-300 group-hover:text-white"
      )}>
        {label}
      </span>
    </Link>
  );
};