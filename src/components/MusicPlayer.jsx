import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { HiPlay, HiPause, HiSpeakerWave } from 'react-icons/hi2'

const speeds = [0.5, 1, 1.5]

const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

const MusicPlayer = ({ src }) => {
  const waveRef = useRef(null)
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const player = WaveSurfer.create({
      container: waveRef.current,
      url: src,
      height: 42,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      cursorWidth: 0,
      waveColor: '#ddd6fe',
      progressColor: '#7c3aed',
      normalize: true,
    })

    player.on('ready', () => setDuration(player.getDuration()))
    player.on('timeupdate', (time) => setCurrent(time))
    player.on('finish', () => setPlaying(false))
    playerRef.current = player

    return () => player.destroy()
  }, [src])

  const togglePlay = () => {
    playerRef.current?.playPause()
    setPlaying((value) => !value)
  }

  const changeSpeed = (nextSpeed) => {
    setSpeed(nextSpeed)
    playerRef.current?.setPlaybackRate(nextSpeed)
  }

  const changeVolume = (event) => {
    const nextVolume = Number(event.target.value)
    setVolume(nextVolume)
    playerRef.current?.setVolume(nextVolume)
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-blue-50 px-4 py-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={togglePlay}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white"
      >
        {playing ? <HiPause className="text-xl" /> : <HiPlay className="ml-0.5 text-xl" />}
      </button>

      <div className="min-w-0 flex-1">
        <div ref={waveRef} />
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>{formatTime(current)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          {speeds.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeSpeed(item)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                speed === item ? 'bg-blue-500 text-white' : 'bg-white text-slate-500'
              }`}
            >
              {item}x
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-violet-600">
          <HiSpeakerWave />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={changeVolume}
            className="w-24 accent-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer