import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-midnight hover:bg-gold-light shadow-gold focus-visible:ring-gold",
  secondary:
    "bg-deep-navy text-offwhite hover:bg-royal-navy focus-visible:ring-deep-navy",
  outline:
    "border border-gold/60 text-foreground hover:border-gold hover:bg-gold/5 focus-visible:ring-gold",
  ghost: "text-foreground hover:bg-foreground/5 focus-visible:ring-foreground/30",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

/**
 * Base button primitive for the NorthFlow AI Platform design system.
 * Keep variants limited and intentional — gold is reserved for primary
 * calls to action so it retains its weight.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide",
          "transition-colors duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
