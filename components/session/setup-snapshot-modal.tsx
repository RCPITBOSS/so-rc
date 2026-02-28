'use client'

import { useState } from 'react'

type SnapshotData = Record<string, unknown>

const SECTIONS = [
  {
    title: 'Track & Conditions',
    fields: [
      { key: 'track_name',     label: 'Track name' },
      { key: 'event_name',     label: 'Event name' },
      { key: 'date',           label: 'Date' },
      { key: 'surface',        label: 'Surface' },
      { key: 'conditions',     label: 'Conditions' },
      { key: 'track_temp',     label: 'Track temp' },
      { key: 'track_feel',     label: 'Track feel' },
      { key: 'traction_level', label: 'Traction' },
    ],
  },
  {
    title: 'Chassis',
    fields: [
      { key: 'main_chassis',        label: 'Main chassis' },
      { key: 'side_plate',          label: 'Side plate' },
      { key: 'gearbox',             label: 'Gearbox' },
      { key: 'diff_height',         label: 'Diff height' },
      { key: 'diff_type',           label: 'Diff type' },
      { key: 'diff_gear',           label: 'Diff gear' },
      { key: 'diff_decoder',        label: 'Decoder setting' },
      { key: 'slipper',             label: 'Slipper' },
      { key: 'battery_side_plate',  label: 'Battery side plate' },
      { key: 'battery_cradle',      label: 'Battery cradle hole' },
      { key: 'servo_weight',        label: 'Servo weight' },
      { key: 'chassis_weight',      label: 'Chassis weight' },
      { key: 'battery_weight',      label: 'Battery weight' },
      { key: 'total_weight',        label: 'Total weight (g)' },
    ],
  },
  {
    title: 'Hardware',
    fields: [
      { key: 'turnbuckles', label: 'Turnbuckles' },
      { key: 'ball_studs',  label: 'Ball studs' },
      { key: 'screws',      label: 'Screws' },
    ],
  },
  {
    title: 'Front End',
    fields: [
      { key: 'front_shock_tower_hole',             label: 'Shock tower hole' },
      { key: 'front_ball_stud_mount_material',     label: 'BSM material' },
      { key: 'front_ball_stud_mount_width',        label: 'BSM width' },
      { key: 'front_ball_stud_position',           label: 'Ball stud position' },
      { key: 'front_ball_stud_mount_washers',      label: 'Ball stud washers' },
      { key: 'front_arm_shock_mount',              label: 'Arm shock mount' },
      { key: 'front_arm_material',                 label: 'Arm material' },
      { key: 'front_suspension_mount_height',      label: 'Susp mount height' },
      { key: 'front_suspension_mount_material',    label: 'Susp mount material' },
      { key: 'front_center_link_material',         label: 'Center link material' },
      { key: 'front_center_link_height',           label: 'Center link height' },
      { key: 'front_center_link_washers',          label: 'Center link washers' },
      { key: 'front_hub_carrier_material',         label: 'Hub carrier material' },
      { key: 'front_hub_carrier_position',         label: 'Hub carrier position' },
      { key: 'front_caster_insert',                label: 'Caster insert' },
      { key: 'front_steering_block_material',      label: 'Steering block material' },
      { key: 'front_steering_block_orientation',   label: 'Steering block orientation' },
      { key: 'front_steering_block_washers',       label: 'Steering block washers' },
      { key: 'front_axle',                         label: 'Axle width' },
      { key: 'front_kingpin_top',                  label: 'Kingpin top' },
      { key: 'front_kingpin_bottom',               label: 'Kingpin bottom' },
      { key: 'front_shim_above',                   label: 'Shim above' },
      { key: 'front_shim_below',                   label: 'Shim below' },
      { key: 'front_camber',                       label: 'Camber (°)' },
      { key: 'front_toe',                          label: 'Toe (°)' },
      { key: 'front_ride_height',                  label: 'Ride height (mm)' },
      { key: 'front_sway_bar',                     label: 'Sway bar' },
    ],
  },
  {
    title: 'Rear End',
    fields: [
      { key: 'rear_shock_tower_hole',          label: 'Shock tower hole' },
      { key: 'rear_ball_stud_mount_material',  label: 'BSM material' },
      { key: 'rear_ball_stud_mount_position',  label: 'BSM position' },
      { key: 'rear_ball_stud_mount_washers',   label: 'BSM washers' },
      { key: 'rear_arm_shock_mount',           label: 'Arm shock mount' },
      { key: 'rear_arm_material',              label: 'Arm material' },
      { key: 'rear_arm_length',                label: 'Arm length' },
      { key: 'rear_arm_position',              label: 'Arm position' },
      { key: 'rear_suspension_mount',          label: 'Suspension mount' },
      { key: 'rear_hub_carrier_material',      label: 'Hub carrier material' },
      { key: 'rear_hub_carrier_position',      label: 'Hub carrier position' },
      { key: 'rear_hub_height',                label: 'Hub height insert' },
      { key: 'rear_link_mount_washers',        label: 'Link mount washers' },
      { key: 'rear_link_mount_orientation',    label: 'Link mount orientation' },
      { key: 'rear_ball_stud_washers',         label: 'Ball stud washers' },
      { key: 'rear_camber',                    label: 'Camber (°)' },
      { key: 'rear_toe',                       label: 'Toe (°)' },
      { key: 'rear_anti_squat',                label: 'Anti-squat' },
      { key: 'rear_ride_height',               label: 'Ride height (mm)' },
      { key: 'rear_sway_bar',                  label: 'Sway bar' },
      { key: 'rear_wheel_hub',                 label: 'Wheel hub' },
    ],
  },
  {
    title: 'Front Shocks',
    fields: [
      { key: 'front_shock_cap',              label: 'Cap' },
      { key: 'front_shock_shaft',            label: 'Shaft' },
      { key: 'front_shock_spring_brand',     label: 'Spring brand' },
      { key: 'front_shock_spring_part',      label: 'Spring part' },
      { key: 'front_shock_spring_rate',      label: 'Spring rate (lb/in)' },
      { key: 'front_shock_oil_cst',          label: 'Oil (cSt)' },
      { key: 'front_shock_oil_brand',        label: 'Oil brand' },
      { key: 'front_shock_piston_thickness', label: 'Piston thickness' },
      { key: 'front_shock_piston_holes',     label: 'Piston holes' },
      { key: 'front_shock_inner_spacer',     label: 'Inner spacer' },
      { key: 'front_shock_outer_spacer',     label: 'Outer spacer' },
      { key: 'front_shock_eyelet_length',    label: 'Eyelet length' },
      { key: 'front_shock_shaft_length',     label: 'Shaft length' },
    ],
  },
  {
    title: 'Rear Shocks',
    fields: [
      { key: 'rear_shock_cap',              label: 'Cap' },
      { key: 'rear_shock_shaft',            label: 'Shaft' },
      { key: 'rear_shock_spring_brand',     label: 'Spring brand' },
      { key: 'rear_shock_spring_part',      label: 'Spring part' },
      { key: 'rear_shock_spring_rate',      label: 'Spring rate (lb/in)' },
      { key: 'rear_shock_oil_cst',          label: 'Oil (cSt)' },
      { key: 'rear_shock_oil_brand',        label: 'Oil brand' },
      { key: 'rear_shock_piston_thickness', label: 'Piston thickness' },
      { key: 'rear_shock_piston_holes',     label: 'Piston holes' },
      { key: 'rear_shock_inner_spacer',     label: 'Inner spacer' },
      { key: 'rear_shock_outer_spacer',     label: 'Outer spacer' },
      { key: 'rear_shock_eyelet_length',    label: 'Eyelet length' },
      { key: 'rear_shock_shaft_length',     label: 'Shaft length' },
    ],
  },
  {
    title: 'Tires & Wheels',
    fields: [
      { key: 'front_compound', label: 'Front compound' },
      { key: 'rear_compound',  label: 'Rear compound' },
    ],
  },
  {
    title: 'Body & Wing',
    fields: [
      { key: 'body',               label: 'Body' },
      { key: 'front_wing_mount',   label: 'Front wing' },
      { key: 'front_wing_material',label: 'Front wing mount' },
      { key: 'rear_wing_size',     label: 'Rear wing size' },
      { key: 'rear_wing_height',   label: 'Rear wing height' },
    ],
  },
  {
    title: 'Drivetrain',
    fields: [
      { key: 'motor',   label: 'Motor' },
      { key: 'spur',    label: 'Spur (T)' },
      { key: 'pinion',  label: 'Pinion (T)' },
      { key: 'battery', label: 'Battery' },
      { key: 'esc',     label: 'ESC' },
      { key: 'servo',   label: 'Servo' },
    ],
  },
]

function hasValue(val: unknown): boolean {
  return val != null && val !== ''
}

export function SetupSnapshotModal({ snapshot }: { snapshot: SnapshotData | null }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-gray-500 transition-colors hover:text-gray-300"
      >
        View setup
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative ml-auto flex h-full w-full max-w-lg flex-col bg-[#111] shadow-2xl">

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="text-sm font-semibold text-white">Setup snapshot</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-lg leading-none text-gray-500 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {!snapshot ? (
                <p className="text-sm text-gray-500">No setup snapshot available for this run.</p>
              ) : (
                <div className="space-y-7">
                  {SECTIONS.map(section => {
                    const populated = section.fields.filter(f => hasValue(snapshot[f.key]))
                    if (populated.length === 0) return null
                    return (
                      <div key={section.title}>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {section.title}
                        </p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                          {populated.map(f => (
                            <div key={f.key}>
                              <p className="text-xs text-gray-500">{f.label}</p>
                              <p className="text-sm text-white">{String(snapshot[f.key])}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}
