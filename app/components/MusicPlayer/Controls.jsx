'use client'

import { useState, useEffect, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function Controls({ tracks, currentTrack, setCurrentTrack, isPlaying, setIsPlaying, audioRef }) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)

  const playNext = useCallback(() => {
    if (!currentTrack || tracks.length === 0) return
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id)
    const nextTrack = tracks[(currentIndex + 1) % tracks.length]
    setCurrentTrack(nextTrack)
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play(), 100)
  }, [currentTrack, tracks])

  const playPrevious = useCallback(() => {
    if (!currentTrack || tracks.length === 0) return
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id)
    const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length]
    setCurrentTrack(prevTrack)
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play(), 100)
  }, [currentTrack, tracks])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      playNext()
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack, playNext])

  const togglePlayPause = () => {
    if (!currentTrack) return
    if (isPlaying) audioRef.current?.pause()
    else audioRef.current?.play()
    setIsPlaying(!isPlaying)
  }

  const stopTrack = () => {
    if (!currentTrack) return
    audioRef.current?.pause()
    audioRef.current.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleProgressClick = (e) => {
    if (!currentTrack) return
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) audioRef.current.volume = newVolume
  }

  return (
    <>
      {currentTrack && (
        <div className='bg-[#D9753B] backdrop-blur-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-2xl p-6'>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-1">{currentTrack.title}</h3>
            <p className="text-white/70">{currentTrack.artist}</p>
          </div>

          <div className="mb-6">
            <div
              onClick={handleProgressClick}
              className="h-2 bg-white/10 rounded-full cursor-pointer group"
            >
              <div
                className="h-full bg-gradient-to-r from-white to-[#D9D2D2] transition-all relative rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex justify-between px-1 mt-2 text-white/70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={playPrevious} disabled={!currentTrack} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <SkipBack className="w-5 h-5 text-white" />
              </button>
              <button onClick={togglePlayPause} disabled={!currentTrack} className="w-14 h-14 rounded-full bg-gradient-to-r from-white to-white hover:from-white hover:white flex items-center justify-center transition-all shadow-lg hover:shadow-xl">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <button onClick={playNext} disabled={!currentTrack} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <SkipForward className="w-5 h-5 text-white" />
              </button>
              <button onClick={stopTrack} disabled={!currentTrack} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors">Stop</button>
            </div>

            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-white" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-white/10 rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white 0%, #D9D2D2 ${volume * 100}%, #e5e5e5 ${volume * 100}%, #e5e5e5 100%)`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
