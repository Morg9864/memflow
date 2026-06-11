"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: {
            ...(typeof fadeUp.visible === "object" &&
            "transition" in fadeUp.visible
              ? (fadeUp.visible.transition as object)
              : {}),
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
