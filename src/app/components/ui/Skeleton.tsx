import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      className={`${className} bg-gradient-to-r from-[#051530] via-[#0a1f3f] to-[#051530] bg-[length:200%_100%]`}
      animate={{
        backgroundPosition: ['0% 0%', '200% 0%', '0% 0%'],
      }}
      transition={{
        duration: 2,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  );
}

export function PostSkeleton() {
  return (
    <div className="w-full space-y-4 p-4 rounded-2xl border border-[#1a2942] bg-[#051530]">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/4 rounded-md" />
          <Skeleton className="h-3 w-1/3 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="flex space-x-4">
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
    </div>
  );
}
