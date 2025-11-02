'use client'

export default function Controls({ tracks, currentTrack, isPlaying, playTrack }) {
  return (
    <div className="grid grid-cols-[60px_1fr_200px_80px] gap-3 mb-3">
      {tracks.map((track, index) => {
        const isCurrent = currentTrack?.id === track.id;

        return (
          <div
            key={track.id}
            className={`col-span-4 grid grid-cols-subgrid items-center rounded-lg px-6 py-4 hover:shadow-md hover:bg-[#D9753B] hover:text-white cursor-pointer duration-[75ms] ${isCurrent ? 'bg-[#D9753B] text-white' : 'text-black'}`}
            onClick={() => playTrack(track)}
          >
            <div className="text-sm">
              {isCurrent && isPlaying ? (
                <div
                  className={`flex gap-1 items-center justify-center h-full ${
                    isCurrent && isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="w-1 h-3 bg-white animate-pulse" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-3 bg-white animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="font-medium truncate">{track.title}</div>
            <div className="truncate">
              {
                index % 2 === 0 ? 'Alakotila / Räsänen / Frigård' : 'ALDA'
              }
            </div>
            <div className="text-sm">{track.duration}</div>
          </div>
        )
      })}
    </div>
  )
}