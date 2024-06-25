"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface FadeInProps {
  children: ReactNode
  display?: 'block' | 'inline-block' | 'inline'
  delay?: number
}

const FadeIn = ({ children,display='block',delay }: FadeInProps) => {
  return (
    <motion.span
      style={{ display }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true,margin:"0px 0px -20% 0px" }}
      transition={{ duration: 1,delay }}
    >
      {children}
    </motion.span>
  )
}

export default FadeIn