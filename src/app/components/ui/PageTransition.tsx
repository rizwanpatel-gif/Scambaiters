import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98,
    filter: "blur(10px)"
  },
  enter: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)"
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.98,
    filter: "blur(10px)"
  }
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ 
        duration: 0.4,
        type: "spring",
        bounce: 0.1
      }}
      className="relative min-h-screen w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#1E293B] -z-10" />
      {children}
    </motion.main>
  );
}
