"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={reveal}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ ...reveal.visible.transition, delay }}
    >
      {children}
    </motion.div>
  );
}
