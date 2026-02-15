'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const DURATIONS = [5, 6, 7, 8, 9, 10]; // minutes

export function PracticeTimer() {
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // Play alarm sound using Web Audio API
  const playAlarm = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800; // Frequency in Hz
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);

      // Play 3 beeps
      setTimeout(() => playBeep(audioContext), 500);
      setTimeout(() => playBeep(audioContext), 1000);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playBeep = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setHasFinished(true);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleDurationChange = (minutes: number) => {
    setSelectedDuration(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    setHasFinished(false);
  };

  const handleStart = () => {
    setIsRunning(true);
    setHasFinished(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
    setHasFinished(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <style jsx>{`
        @keyframes flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .flash-animation {
          animation: flash 0.5s ease-in-out infinite;
        }
      `}</style>

      <div className="rounded-lg border border-white/10 bg-[#111] p-8">
        {/* Duration selector */}
        <div className="mb-8">
          <h3 className="mb-4 text-center text-sm font-medium text-gray-400">
            Select Duration
          </h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {DURATIONS.map((mins) => (
              <button
                key={mins}
                onClick={() => handleDurationChange(mins)}
                disabled={isRunning}
                className={`rounded-lg px-4 py-3 text-lg font-semibold transition-colors ${
                  selectedDuration === mins
                    ? 'bg-yokomo-blue text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>

        {/* Timer display */}
        <div className="mb-8">
          <div
            className={`mx-auto flex h-64 w-64 items-center justify-center rounded-full border-8 transition-colors ${
              hasFinished
                ? 'flash-animation border-racing-red bg-racing-red/10'
                : isRunning
                  ? 'border-yokomo-blue bg-yokomo-blue/10'
                  : 'border-white/20 bg-white/5'
            }`}
            style={{
              background: isRunning
                ? `conic-gradient(rgb(59, 130, 246) ${progress}%, rgba(255,255,255,0.05) ${progress}%)`
                : hasFinished
                  ? 'rgba(239, 68, 68, 0.1)'
                  : 'rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex h-56 w-56 items-center justify-center rounded-full bg-[#111]">
              <div className="text-center">
                <div
                  className={`text-6xl font-bold tabular-nums ${
                    hasFinished
                      ? 'flash-animation text-racing-red'
                      : isRunning
                        ? 'text-yokomo-blue'
                        : 'text-white'
                  }`}
                >
                  {formatTime(timeLeft)}
                </div>
                {hasFinished && (
                  <div className="mt-2 text-sm font-medium text-racing-red flash-animation">
                    TIME'S UP!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={timeLeft === 0}
              className="flex items-center gap-2 rounded-lg bg-yokomo-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-yokomo-blue/90 disabled:opacity-50"
            >
              <Play className="h-5 w-5" />
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 rounded-lg bg-racing-yellow px-6 py-3 font-semibold text-black transition-colors hover:bg-racing-yellow/90"
            >
              <Pause className="h-5 w-5" />
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
