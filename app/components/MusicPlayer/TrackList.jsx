'use client'

export default function Controls({ tracks, currentTrack, isPlaying, playTrack }) {
  return (
    <table className="w-full mb-6">
      <tbody>
        {tracks.map((track, index) => {
          const isCurrent = currentTrack?.id === track.id;

          return (
            <tr
              key={track.id}
              onClick={() => playTrack(track)}
              className={`
                border-b border-white/5 cursor-pointer transition-colors rounded-xl
                ${isCurrent ? 'bg-[#D9753B] text-white' : 'text-black'}
                hover:bg-[#D9753B] hover:text-white
              `}
            >
              <td className="p-4">
                {isCurrent && isPlaying ? (
                  <div
                    className={`flex gap-1 items-center ${
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
              </td>

              <td className="p-4 font-medium">{track.title}</td>
              <td className="p-4">{track.artist}</td>
              <td className="p-4">{track.duration}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}