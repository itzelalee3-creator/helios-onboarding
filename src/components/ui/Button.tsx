import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-orange text-void hover:bg-orange-strong shadow-[0_0_0_1px_rgba(255,106,26,0.35)]",
  secondary:
    "bg-transparent text-ink border border-border-strong hover:border-blue-strong hover:text-blue-strong",
  ghost: "bg-surface-raised text-ink-muted hover:text-ink hover:bg-surface-hairline",
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  className,
  icon,
  href,
  ...rest
}: BaseProps & ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">)) {
  const classes = cn(
    "focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200",
    variantClass[variant],
    className
  );

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {icon}
    </Link>
  );
}
