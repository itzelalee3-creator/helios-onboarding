"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li";
  /**
   * Above-the-fold content is visible immediately at load, so it should
   * animate in on mount rather than wait for a scroll-triggered
   * IntersectionObserver hit (which can fail to fire for content already
   * inside the viewport at first paint, leaving it stuck at opacity:0).
   * Set false for hero content; leave true (default) for below-the-fold
   * sections that should reveal as the user scrolls to them.
   */
  onScroll?: boolean;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  onScroll = true,
}: SectionRevealProps) {
  const prefersReduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionTag = motion[as];

  // Above-the-fold content must never risk staying invisible, so it skips
  // the whileInView/animate state machine (which can fail to resolve for
  // content already in the viewport at first paint) and just renders
  // directly. A plain CSS fade-in gives it motion without that risk.
  if (!onScroll) {
    return (
      <div
        className={cn("animate-fade-in-up", className)}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </div>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function StaggerGroup({ children, className, stagger = 0.08 }: StaggerGroupProps) {
  const prefersReduced = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReduced ? 0 : stagger },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const prefersReduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}
