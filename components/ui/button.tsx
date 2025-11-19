import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold
  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
  disabled:opacity-50 uppercase tracking-wide`, 
  {
    variants: {
      variant: {
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-4 active:border-0",
        default:" bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-5oo",
        primary: "bg-sky-400 text-white hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
        primaryOutline:"bg-white text-cyan-500 hover:bg-indigo-100",
        secondary: "bg-indigo-500 text-white hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        secondaryOutline:"bg-white text-green-500 hover:bg-slate-100",
        danger: "bg-rose-500 text-white hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
        dangerOutline:"bg-white text-rose-500 hover:bg-slate-100",
        super: "bg-indigo-500 text-white hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        superOutline:"bg-white text-indigo-500 hover:bg-slate-100",
        ghost:"bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
        sidebar: "bg-transparent text-slate-500 border-2 border-transparent hover:bg-gray-600/20 transition-none",
        sidebarOutline:"bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none",
        dark: "bg-gray-900 text-gray-300 border-gray-700 border-b-4 active:border-b-2 hover:bg-gray-800 shadow-md",
        darkOutline: "bg-transparent text-gray-400 border-gray-600 border-2 hover:bg-gray-800/40 backdrop-blur-md",
        night: "bg-black text-indigo-400 border-indigo-600 border-b-4 active:border-b-2 hover:bg-gray-950 shadow-lg",
        shadow: "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-900/80",
        abyss: "bg-gradient-to-b from-slate-950 to-gray-900 text-cyan-400 border-cyan-600 border-b-4 active:border-b-2 hover:brightness-125",
    
        frostbite: "bg-white/10 backdrop-blur-lg text-blue-300 border border-blue-500 hover:bg-white/20 shadow-md",
    hologram: "bg-black text-cyan-400 border border-cyan-500 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.8)]",
    infernal: "bg-gradient-to-br from-red-700 via-orange-600 to-yellow-400 text-white shadow-lg hover:brightness-125",
    plasma: "bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 text-white border-none animate-pulse",
    cyberpunk: "bg-gray-900 text-pink-400 border-2 border-pink-500 hover:bg-pink-500/20 hover:text-pink-300",
    arcane: "bg-indigo-900 text-purple-300 border border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]",
    voidPulse: "bg-black text-white border border-gray-600 hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:scale-105 transition-transform",
    liquidMetal: "bg-gradient-to-br from-gray-700 to-gray-500 text-white border-none shadow-inner hover:brightness-125",
    solarFlare: "bg-yellow-400 text-black border-yellow-600 border-b-4 active:border-b-2 hover:bg-yellow-300 shadow-lg",
    phantom: "bg-transparent text-gray-400 border border-gray-500 hover:bg-gray-600/20 hover:text-white transition-all",

      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        xs: "h-7 px-2 py-1", 
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
