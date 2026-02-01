import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode } from 'react'

// Animation variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Stagger container for children animations
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// Stagger item variant
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Animated section wrapper component
interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  threshold?: number
  once?: boolean
}

export function AnimatedSection({
  children,
  className = '',
  variants = fadeInUp,
  delay = 0,
  threshold = 0.2,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated element with custom delay
interface AnimatedElementProps {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'section' | 'article' | 'ul' | 'li'
}

export function AnimatedElement({
  children,
  className = '',
  variants = fadeInUp,
  delay = 0,
  as = 'div',
}: AnimatedElementProps) {
  const Component = motion[as]

  return (
    <Component
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Component>
  )
}

// Stagger container component
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  fast?: boolean
  threshold?: number
  once?: boolean
}

export function StaggerContainer({
  children,
  className = '',
  fast = false,
  threshold = 0.1,
  once = true,
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fast ? staggerContainerFast : staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger item component
interface StaggerItemProps {
  children: ReactNode
  className?: string
  variants?: Variants
}

export function StaggerItem({
  children,
  className = '',
  variants = staggerItem,
}: StaggerItemProps) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// Export motion for direct use
export { motion, useInView }
