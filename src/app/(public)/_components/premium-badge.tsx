import { Star } from 'lucide-react'

export function PremiumBadge() {
  return (
    <div className="absolute bottom-2 right-2 rounded-full bg-yellow-500/70 w-10 h-10 z-[2] flex items-center justify-center">
      <Star className="text-white" />
    </div>
  )
}
