  'use client'

  export default function Controls() {
    return (
      <div className="animate-pulse">
        {/* Track list skeleton */}
        <div className="space-y-2 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-14 bg-[#D9753B]/80 rounded w-full" />
          ))}
        </div>

        {/* Control panel skeleton */}
        <div className="bg-[#D9753B]/80 rounded-2xl p-6 flex flex-col gap-4">
          {/* Title/artist */}
          <div className="h-8 bg-white/60 rounded w-1/2" />
          <div className="h-6s bg-white/60 rounded w-1/3" />

          {/* Progress bar */}
          <div className="h-2 bg-white/60 rounded w-full mt-4" />

          {/* Buttons */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4 justify-center items-center">
              <div className="w-10 h-10 bg-white/60 rounded-full" />
              <div className="w-14 h-14 bg-white/60 rounded-full" />
              <div className="w-10 h-10 bg-white/60 rounded-full" />
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-white/60 rounded-full" />
              <div className="h-1 bg-[#D9CEC5]/30 rounded w-24" />
            </div>
          </div>
        </div>
      </div>
    )
}