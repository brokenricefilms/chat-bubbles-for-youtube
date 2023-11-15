import { motion, usePresence } from 'framer-motion'
import React from 'react'
import './bubble.css'

const transition = {
  type: 'spring',
  stiffness: 500,
  damping: 50,
  default: {
    duration: 0.4
  }
}

interface BubbleProps {
  id: number
  dy: number
  children: React.ReactNode
  fillColour: string
  strokeColour: string
}

const Bubble = ({ id, children, dy, fillColour, strokeColour }: BubbleProps) => {
  const [isPresent, safeToRemove] = usePresence()

  const animations = {
    layout: true,
    initial: 'out',
    animate: 'in',
    variants: {
      in: { opacity: 1, translateY: 0 },
      out: { opacity: 1, translateY: `${dy}px` }
    },
    exit: { opacity: 0, translateY: 0 },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition
  }

  return (
    <motion.div key={id} className="bubble" {...animations}>
      <div style={{ position: 'static' }}>
        <div className="bubble-content" style={{backgroundColor: fillColour, color: strokeColour}}>{children}</div>
      </div>
    </motion.div>
  )
}

export default Bubble
