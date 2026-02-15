'use client';

import { useState } from 'react';

const TRANSMISSION_RATIO = 2.6; // Yokomo SO 3-gear transmission

interface Motor {
  value: string;
  label: string;
  type: 'mod' | 'roar';
}

const motors: Motor[] = [
  { value: '9450', label: '3.5T (9450 KV)', type: 'mod' },
  { value: '7340', label: '4.5T (7340 KV)', type: 'mod' },
  { value: '6500', label: '5.0T (6500 KV)', type: 'mod' },
  { value: '5900', label: '5.5T (5900 KV)', type: 'mod' },
  { value: '5500', label: '6.0T (5500 KV)', type: 'mod' },
  { value: '5120', label: '6.5T (5120 KV)', type: 'mod' },
  { value: '4800', label: '7.0T (4800 KV)', type: 'mod' },
  { value: '4420', label: '7.5T (4420 KV)', type: 'mod' },
  { value: '4200', label: '8.0T (4200 KV)', type: 'mod' },
  { value: '3970', label: '8.5T (3970 KV)', type: 'mod' },
  { value: '4100', label: '13.5T (4100 KV)', type: 'roar' },
  { value: '3150', label: '17.5T (3150 KV)', type: 'roar' },
];

export function GearingCalculator() {
  const [pinion, setPinion] = useState(22);
  const [spur, setSpur] = useState(80);
  const [motorKV, setMotorKV] = useState('9450');
  const [battery, setBattery] = useState('7.4');
  const [timing, setTiming] = useState(30);
  const [timingRange, setTimingRange] = useState({ min: 20, max: 50 });

  const handleMotorChange = (value: string) => {
    const motor = motors.find((m) => m.value === value);
    if (!motor) return;

    setMotorKV(value);

    // Update gearing and timing based on motor type
    if (motor.type === 'mod') {
      setPinion(22);
      setSpur(80);
      setTimingRange({ min: 20, max: 50 });
      setTiming(30);
    } else {
      setPinion(30);
      setSpur(72);
      setTimingRange({ min: 20, max: 60 });
      setTiming(30);
    }
  };

  // Calculations
  const gearRatio = (spur / pinion).toFixed(2);
  const fdr = ((spur / pinion) * TRANSMISSION_RATIO).toFixed(2);

  const timingBoost = 1 + timing / 1000;
  const motorRPM = Math.round(parseFloat(battery) * parseFloat(motorKV) * timingBoost);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Left Column - Inputs */}
      <div className="rounded-lg border border-white/10 bg-[#111] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Gearing Setup</h2>

        <div className="space-y-4">
          {/* Pinion */}
          <div>
            <label className="mb-1 block text-sm text-gray-400">Pinion Gear (teeth)</label>
            <input
              type="number"
              value={pinion}
              onChange={(e) => setPinion(parseInt(e.target.value) || 0)}
              min={10}
              max={50}
              className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
            <div className="mt-1 text-xs text-gray-500">Typically adjusted for track conditions</div>
          </div>

          {/* Spur */}
          <div>
            <label className="mb-1 block text-sm text-gray-400">Spur Gear (teeth)</label>
            <input
              type="number"
              value={spur}
              onChange={(e) => setSpur(parseInt(e.target.value) || 0)}
              min={50}
              max={100}
              className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
            <div className="mt-1 text-xs text-gray-500">Usually stays constant</div>
          </div>

          {/* Motor */}
          <div>
            <label className="mb-1 block text-sm text-gray-400">Motor</label>
            <select
              value={motorKV}
              onChange={(e) => handleMotorChange(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            >
              <optgroup label="Modified - Hobbywing V10 G3">
                {motors.filter((m) => m.type === 'mod').map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Stock - Hobbywing V10 G4R ROAR">
                {motors.filter((m) => m.type === 'roar').map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Battery */}
          <div>
            <label className="mb-1 block text-sm text-gray-400">Battery</label>
            <select
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            >
              <option value="7.4">7.4v (Standard LiPo)</option>
              <option value="7.6">7.6v (LiHV)</option>
            </select>
          </div>

          {/* Timing */}
          <div>
            <label className="mb-1 block text-sm text-gray-400">Motor Timing (degrees)</label>
            <input
              type="range"
              value={timing}
              onChange={(e) => setTiming(parseInt(e.target.value))}
              min={timingRange.min}
              max={timingRange.max}
              className="w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>{timingRange.min}°</span>
              <span className="font-semibold text-white">{timing}°</span>
              <span>{timingRange.max}°</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">Factory default: 30°</div>
          </div>
        </div>
      </div>

      {/* Right Column - Outputs */}
      <div className="rounded-lg border border-white/10 bg-[#111] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Results</h2>

        <div className="space-y-6">
          {/* Gear Ratio */}
          <div className="rounded-lg border border-white/20 bg-black/50 p-3">
            <div className="text-sm text-gray-400">Gear Ratio</div>
            <div className="text-xl font-semibold text-white">{gearRatio}:1</div>
          </div>

          {/* FDR */}
          <div className="rounded-lg border border-white/20 bg-black/50 p-3">
            <div className="text-sm text-gray-400">Final Drive Ratio (FDR)</div>
            <div className="text-xl font-semibold text-white">{fdr}:1</div>
            <div className="mt-1 text-xs text-gray-500">Includes 2.6:1 transmission</div>
          </div>

          {/* Motor RPM */}
          <div className="rounded-lg border border-white/20 bg-black/50 p-3">
            <div className="text-sm text-gray-400">Motor RPM</div>
            <div className="text-xl font-semibold text-white">{motorRPM.toLocaleString()} RPM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
