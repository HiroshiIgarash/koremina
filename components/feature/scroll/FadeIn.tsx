"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface FadeInProps {
  children: ReactNode;
  display?: "block" | "inline-block" | "inline";
  delay?: number;
  margin?: string;
}

const FadeIn = ({
  children,
  display = "block",
  delay,
  margin = "0px 0px -20% 0px",
}: FadeInProps) => {
  return (
    <motion.span
      style={{ display }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration: 1, delay }}
    >
      {children}
    </motion.span>
  );
};

export default FadeIn;
