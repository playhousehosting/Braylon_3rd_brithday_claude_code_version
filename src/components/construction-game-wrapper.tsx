"use client"

import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"

const ConstructionGame = dynamic(
  () => import('./construction-game').then(mod => ({ default: mod.ConstructionGame })),
  {
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    ),
    ssr: false
  }
)

export { ConstructionGame }
