import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export default function Logo({ className = "", size = "md", dark = false }: LogoProps) {
  const badgeSizeClass =
    size === "sm"
      ? "w-8 h-8 rounded-lg text-xs"
      : size === "lg"
      ? "w-12 h-12 rounded-2xl text-base"
      : "w-10 h-10 rounded-xl text-sm";

  const textSizeClass =
    size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 shrink-0 ${className}`}
      aria-label="20KB Photo Home"
    >
      <div
        className={`relative ${badgeSizeClass} bg-gradient-to-br from-[#1B2CC1] via-indigo-600 to-[#15239B] flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform shrink-0`}
      >
        <span className="tracking-tighter font-black">20</span>
        <span className="absolute inset-0 rounded-[inherit] border border-white/25 pointer-events-none" />
      </div>
      <div className="flex items-center">
        <span
          className={`${textSizeClass} font-black tracking-tight ${
            dark ? "text-white" : "text-gray-900"
          } transition-colors`}
        >
          20KB
        </span>
        <span className={`${textSizeClass} font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1B2CC1] to-blue-600 ml-1`}>
          Photo
        </span>
      </div>
    </Link>
  );
}
