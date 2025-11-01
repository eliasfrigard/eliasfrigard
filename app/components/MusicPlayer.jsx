'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function MusicPlayer() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/audio");
        const data = await res.json();
        setTracks(data);
        if (data.length > 0) setCurrentTrack(data[0]);
      } catch (err) {
        console.error("Failed to load audio tracks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();
  }, []);

  const playNext = useCallback(() => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextTrack = tracks[(currentIndex + 1) % tracks.length];
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  }, [currentTrack, tracks]);

  const playPrevious = useCallback(() => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  }, [currentTrack, tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, playNext]);

  const playTrack = (track) => {
    if (!track) return;
    if (currentTrack?.id === track.id) togglePlayPause();
    else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  const stopTrack = () => {
    if (!currentTrack) return;
    audioRef.current?.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleProgressClick = (e) => {
    if (!currentTrack) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  // Skeleton for the full player
  const SkeletonPlayer = () => (
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
  );

  return (
    <div className="bg-[#D9CEC5]/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 text-[#261915] p-4">
      {loading ? (
        <SkeletonPlayer />
      ) : (
        <>
          {/* Track list */}
          <table className="w-full mb-6">
            <tbody>
              {tracks.map((track, index) => (
                <tr
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`border-b border-white/5 cursor-pointer transition-colors hover:bg-[#D9753B] duration-100 rounded-xl ${
                    currentTrack?.id === track.id ? 'bg-white/10' : ''
                  }`}
                >
                  <td className="p-4 text-gray-300">{index + 1}</td>
                  <td>
                    <div className={`flex gap-1 items-center ${currentTrack?.id === track.id && isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="w-1 h-3 bg-[#D9753B] animate-pulse" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-4 bg-[#D9753B] animate-pulse" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-3 bg-[#D9753B] animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`font-medium ${currentTrack?.id === track.id ? 'text-[#D9753B]' : 'text-[#666773]'}`}>
                      {track.title}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{track.artist}</td>
                  <td className="p-4 text-gray-400">{track.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Control panel */}
          {currentTrack && (
            <div className='bg-[#D9753B] backdrop-blur-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-2xl p-6'>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-1">{currentTrack.title}</h3>
                <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
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
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={playPrevious} disabled={!currentTrack} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>
                  <button onClick={togglePlayPause} disabled={!currentTrack} className="w-14 h-14 rounded-full bg-gradient-to-r from-white to-white hover:from-white hover:to-pink-600 flex items-center justify-center transition-all shadow-lg hover:shadow-xl">
                    {isPlaying ? <Pause className="w-6 h-6 text-white" fill="#261915" /> : <Play className="w-6 h-6 text-white ml-1" fill="#261915" />}
                  </button>
                  <button onClick={playNext} disabled={!currentTrack} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <SkipForward className="w-5 h-5 text-white" />
                  </button>
                  <button onClick={stopTrack} disabled={!currentTrack} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors">Stop</button>
                </div>

                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 bg-white/10 rounded-full cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(236, 72, 153) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Hidden audio */}
      <audio ref={audioRef} src={currentTrack?.url || ''} />
    </div>
  );
}
