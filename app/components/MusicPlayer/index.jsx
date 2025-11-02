'use client'

import React, { useState, useEffect, useRef } from 'react'

import PlayerSkeleton from './PlayerSkeleton'
import TrackList from './TrackList'
import Controls from './Controls'

export default function MusicPlayer() {
  const [tracks, setTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)

  const audioRef = useRef(null)

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/audio")
        const data = await res.json()
        setTracks(data)
        if (data.length > 0) setCurrentTrack(data[0])
      } catch (err) {
        console.error("Failed to load audio tracks:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTracks()
  }, [])

  const playTrack = (track) => {
    if (!track) return
    if (currentTrack?.id === track.id) togglePlayPause()
    else {
      setCurrentTrack(track)
      setIsPlaying(true)
      setTimeout(() => audioRef.current?.play(), 100)
    }
  }

  const togglePlayPause = () => {
    if (!currentTrack) return
    if (isPlaying) audioRef.current?.pause()
    else audioRef.current?.play()
    setIsPlaying(!isPlaying)
  }


  return (
    <div className="bg-[#D9CEC5]/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 text-[#261915] p-4">
      {loading ? (
        <PlayerSkeleton />
      ) : (
        <>
          <TrackList tracks={tracks} onTrackClick={playTrack} playTrack={playTrack} currentTrack={currentTrack} isPlaying={isPlaying} />

          {/* Control panel */}
          <Controls
            audioRef={audioRef}
            tracks={tracks}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </>
      )}

      <audio ref={audioRef} src={currentTrack?.url || ''} />
    </div>
  )
}
