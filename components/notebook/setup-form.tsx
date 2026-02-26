'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

// ─── Style constants — matched to site design language (submit-forms, setups-content) ──
const lCls  = 'mb-1 block text-sm font-medium text-gray-300'
const iCls  = 'h-10 w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue'
const sCls  = 'h-10 w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue'
const CARD  = 'rounded-lg border border-white/10 bg-[#111] p-6'
const GROUP = 'rounded-lg border border-white/10 bg-[#0A0A0A] p-4'
const TAB_A = 'rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-yokomo-blue text-white'
const TAB_I = 'rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
const G2    = 'grid grid-cols-1 md:grid-cols-2 gap-4'

// ─── Spring data ───────────────────────────────────────────────────────────────
type Spring = { brand: string; part: string; color: string; rate: number }

const FRONT_SPRINGS: Spring[] = [
  { brand: 'Yokomo',       part: 'YS-12725F',   color: 'Dot4',   rate: 3.22 },
  { brand: 'Yokomo',       part: 'YS-12700F',   color: 'Dot5',   rate: 3.39 },
  { brand: 'Yokomo',       part: 'YS-12675F',   color: 'Dot6',   rate: 3.57 },
  { brand: 'Yokomo',       part: 'YS-12650F',   color: 'Dot7',   rate: 3.65 },
  { brand: 'Yokomo',       part: 'YS-12625F',   color: 'Dot8',   rate: 3.84 },
  { brand: 'Yokomo Flex',  part: 'YS-12650FF',  color: 'Pink',   rate: 3.20 },
  { brand: 'Yokomo Flex',  part: 'YS-12625FF',  color: 'Green',  rate: 3.34 },
  { brand: 'Yokomo Flex',  part: 'YS-12600FF',  color: 'Orange', rate: 3.54 },
  { brand: 'Yokomo Flex',  part: 'YS-12575FF',  color: 'Black',  rate: 3.80 },
  { brand: 'Yokomo Flex',  part: 'YS-12550FF',  color: 'Purple', rate: 4.06 },
  { brand: 'Yokomo Flex',  part: 'YS-12525FF',  color: 'Brown',  rate: 4.25 },
  { brand: 'Associated',   part: 'AS91940',     color: 'White',  rate: 3.30 },
  { brand: 'Associated',   part: 'AS91941',     color: 'Gray',   rate: 3.40 },
  { brand: 'Associated',   part: 'AS91942',     color: 'Blue',   rate: 3.60 },
  { brand: 'Associated',   part: 'AS91943',     color: 'Yellow', rate: 3.80 },
  { brand: 'Associated',   part: 'AS91944',     color: 'Red',    rate: 4.00 },
  { brand: 'Associated',   part: 'AS91945',     color: 'Orange', rate: 4.30 },
  { brand: 'Associated',   part: 'AS91946',     color: 'Purple', rate: 4.60 },
  { brand: 'X-Gear',       part: '10511',       color: 'White',  rate: 2.85 },
  { brand: 'X-Gear',       part: '10512',       color: 'Gold',   rate: 2.98 },
  { brand: 'X-Gear',       part: '10513',       color: 'Red',    rate: 3.10 },
  { brand: 'X-Gear',       part: '10514',       color: 'Yellow', rate: 3.21 },
  { brand: 'X-Gear',       part: '10515',       color: 'Blue',   rate: 3.38 },
  { brand: 'X-Gear',       part: '10516',       color: 'Green',  rate: 3.54 },
  { brand: 'X-Gear',       part: '10517',       color: 'Pink',   rate: 3.77 },
  { brand: 'X-Gear',       part: '10518',       color: 'Silver', rate: 3.94 },
  { brand: 'X-Gear',       part: '10519',       color: 'Orange', rate: 4.19 },
  { brand: 'Willspeed',    part: 'W2001',       color: 'Yellow', rate: 4.00 },
  { brand: 'Willspeed',    part: 'W2002',       color: 'Orange', rate: 4.25 },
  { brand: 'Willspeed',    part: 'W2003',       color: 'Red',    rate: 4.50 },
  { brand: 'Willspeed',    part: 'W2004',       color: 'Green',  rate: 4.80 },
  { brand: 'Willspeed',    part: 'W2005',       color: 'Blue',   rate: 5.00 },
  { brand: 'Xray Conical', part: 'XR368381',    color: '1-Dot',  rate: 3.70 },
  { brand: 'Xray Conical', part: 'XR368382',    color: '2-Dot',  rate: 3.86 },
  { brand: 'Xray Conical', part: 'XR368383',    color: '3-Dot',  rate: 4.04 },
  { brand: 'Xray Conical', part: 'XR368384',    color: '4-Dot',  rate: 4.15 },
  { brand: 'Xray Conical', part: 'XR368385',    color: '5-Dot',  rate: 4.29 },
]

const REAR_SPRINGS: Spring[] = [
  { brand: 'Yokomo',       part: 'YS-12115R',   color: 'Dot3',   rate: 1.86 },
  { brand: 'Yokomo',       part: 'YS-12110R',   color: 'Dot4',   rate: 2.00 },
  { brand: 'Yokomo',       part: 'YS-12105R',   color: 'Dot5',   rate: 2.07 },
  { brand: 'Yokomo',       part: 'YS-12100R',   color: 'Dot6',   rate: 2.19 },
  { brand: 'Yokomo Flex',  part: 'YS-121025RF', color: 'Pink',   rate: 1.81 },
  { brand: 'Yokomo Flex',  part: 'YS-12105RF',  color: 'Red',    rate: 1.83 },
  { brand: 'Yokomo Flex',  part: 'YS-12100RF',  color: 'Green',  rate: 1.86 },
  { brand: 'Yokomo Flex',  part: 'YS-12975RF',  color: 'Orange', rate: 1.91 },
  { brand: 'Associated',   part: 'AS91947',     color: 'Green',  rate: 1.78 },
  { brand: 'Associated',   part: 'AS91948',     color: 'White',  rate: 1.89 },
  { brand: 'Associated',   part: 'AS91949',     color: 'Gray',   rate: 1.99 },
  { brand: 'Associated',   part: 'AS91950',     color: 'Blue',   rate: 2.10 },
  { brand: 'Associated',   part: 'AS91951',     color: 'Yellow', rate: 2.25 },
  { brand: 'X-Gear',       part: '10521',       color: 'White',  rate: 1.91 },
  { brand: 'X-Gear',       part: '10522',       color: 'Gold',   rate: 1.97 },
  { brand: 'X-Gear',       part: '10523',       color: 'Red',    rate: 2.03 },
  { brand: 'X-Gear',       part: '10524',       color: 'Yellow', rate: 2.09 },
  { brand: 'X-Gear',       part: '10525',       color: 'Blue',   rate: 2.13 },
  { brand: 'X-Gear',       part: '10526',       color: 'Green',  rate: 2.19 },
  { brand: 'X-Gear',       part: '10527',       color: 'Pink',   rate: 2.27 },
  { brand: 'Willspeed',    part: 'W2006',       color: 'Yellow', rate: 1.98 },
  { brand: 'Willspeed',    part: 'W2007',       color: 'Orange', rate: 2.11 },
  { brand: 'Willspeed',    part: 'W2008',       color: 'Red',    rate: 2.27 },
  { brand: 'Willspeed',    part: 'W2009',       color: 'Green',  rate: 2.40 },
  { brand: 'Willspeed',    part: 'W2010',       color: 'Blue',   rate: 2.63 },
  { brand: 'Xray Conical', part: 'XR368481',    color: '1-Dot',  rate: 1.98 },
  { brand: 'Xray Conical', part: 'XR368482',    color: '2-Dot',  rate: 2.09 },
  { brand: 'Xray Conical', part: 'XR368483',    color: '3-Dot',  rate: 2.18 },
  { brand: 'Xray Conical', part: 'XR368484',    color: '4-Dot',  rate: 2.37 },
  { brand: 'Xray Conical', part: 'XR368485',    color: '5-Dot',  rate: 2.42 },
]

const SPRING_BRANDS = ['Yokomo', 'Yokomo Flex', 'Associated', 'X-Gear', 'Xray Conical', 'Willspeed']

// ─── Computed option lists ─────────────────────────────────────────────────────
const OIL_CST: string[] = [
  '100', '150', '200',
  ...Array.from({ length: 32 }, (_, i) => String(225 + i * 25)),
  '1100', '1200', '1300',
]

const SHAFT_LENGTHS = [
  '25.5', '26', '26.25', '26.5', '26.75',
  '27', '27.25', '27.5', '27.75',
  '28', '28.25', '28.5', '28.75',
  '29', '29.25', '29.5',
]

const CRASHES = Array.from({ length: 21 }, (_, i) => String(i))

// ─── Select option lists ───────────────────────────────────────────────────────
const O = {
  surface:                ['Carpet', 'Astroturf', 'Clay', 'Dirt'],
  track_feel:             ['Smooth', 'Bumpy'],
  traction_level:         ['Low', 'Medium', 'High', 'Blue Groove'],
  track_temp:             ['Cold (<50°F)', 'Mild (50–70°F)', 'Warm (70–85°F)', 'Hot (>85°F)'],
  conditions:             ['Wet', 'Dry', 'Dusty'],
  run_type:               ['Practice', 'Qualifier', 'Main'],
  rating:                 ['1', '2', '3', '4', '5'],
  motor_temp:             ['Cool (<120°F)', 'Warm (120–150°F)', 'Hot (150–180°F)', 'Super Hot (>180°F)'],
  main_chassis:           ['SO 2.0', 'SO 3.0', 'DTM 3.1', 'CAL 3.1'],
  side_plate:             ['Standard', 'Graphite'],
  gearbox:                ['LD', 'LCA', 'LCG'],
  diff_height:            ['0', '1', '2', '3'],
  diff_type:              ['Gear', 'Ball Diff'],
  diff_gear:              ['2-gear', '4-gear'],
  slipper:                ['Ventilated Outer', 'Ventilated Dual', '3 Pad', 'Direct Drive'],
  battery_side_plate:     ['Forward', 'Middle', 'Back'],
  battery_cradle:         ['1', '2', '3', '4', '5'],
  servo_weight:           ['Aluminum', 'Steel'],
  chassis_weight:         ['Aluminum', 'Steel'],
  battery_weight:         ['None', '10g', '25g', '31g', '34g', '69g'],
  turnbuckles:            ['Steel', 'Titanium'],
  ball_studs:             ['Steel', 'Titanium'],
  screws:                 ['Steel', 'Titanium'],
  shock_tower_hole:       ['1', '2', '3', '4', '5'],
  bsm_material:           ['Plastic', 'Aluminum'],
  ball_stud_position:     ['Inside', 'Middle', 'Outside'],
  arm_shock_mount:        ['Inner', 'Middle', 'Outer'],
  arm_material:           ['Standard', 'Graphite'],
  front_bsm_width:        ['Standard', 'Narrow'],
  front_susp_height:      ['0', '+1'],
  front_susp_material:    ['Plastic', 'Aluminum', 'Steel'],
  center_link_material:   ['Plastic', 'Aluminum'],
  front_hub_carrier_mat:  ['Hard', 'Graphite'],
  front_hub_carrier_pos:  ['Forward', 'Back'],
  steering_block_mat:     ['Hard', 'Graphite'],
  steering_block_orient:  ['Narrow Low', 'Narrow High', 'Wide Low', 'Wide High'],
  kingpin_top:            ['Black', 'Thick'],
  kingpin_bottom:         ['Black', 'Thick'],
  shim:                   ['0', '2.5mm'],
  caster_insert:          ['-5°', '-2.5°', '0°', '2.5°', '5°'],
  front_axle:             ['4.5mm', '5mm'],
  front_sway_bar:         ['None', '0.9mm', '1.0mm', '1.1mm'],
  rear_arm_length:        ['S3', 'L5'],
  rear_arm_pos:           ['Forward', 'Middle', 'Back'],
  rear_susp_mount:        ['Standard', 'High Mount'],
  rear_hub_carrier_mat:   ['Hard', 'Graphite', 'Aluminum'],
  rear_hub_carrier_pos:   ['Forward', 'Middle', 'Back'],
  mm_steps:               ['0', '0.5', '1', '1.5', '2', '2.5', '3'],
  rear_link_orient:       ['In', 'Out'],
  anti_squat:             ['0', '1', '1.5', '2', '2.5', '3'],
  rear_sway_bar:          ['None', '1.0mm', '1.1mm', '1.2mm', '1.3mm', '1.4mm', '1.5mm'],
  wheel_hub:              ['4.3mm', '5mm', '6mm'],
  shock_cap:              ['Aluminum', 'Plastic'],
  shock_shaft:            ['Chrome', 'Titanium Coated'],
  oil_brand:              ['Associated', 'TLR', 'XTR', 'PT RC Racing', 'Mugen', 'Flash Point', 'Ultimate', 'Kyosho', 'JTP', 'Arrowmax', 'Hudy', 'X Ray', 'Yokomo', 'Sweep'],
  piston_thickness:       ['1.5mm', '2mm', '2.5mm'],
  piston_holes:           ['1.5x3', '1.6x2', '1.6x3', '1.7x2', '1.7x3', '1.8x2', '1.9x2', '2.0x2'],
  spacer:                 ['1mm', '1.5mm', '2mm', '2.5mm', '3mm'],
  eyelet_length:          ['Short', 'Medium', 'Long'],
  compound:               ['Aqua', 'Silver'],
  body:                   ['SO Standard', 'SO Lightweight', 'RO 1.0', 'JConcepts DTM F2', 'JConcepts DTM F2 Lightweight', 'JConcepts P2k'],
  front_wing_mount:       ['Wide', 'Narrow'],
  front_wing_material:    ['Plastic', 'Aluminum'],
  rear_wing_size:         ['6.5"', '7"'],
  rear_wing_height:       ['Up', 'Down'],
  esc:                    ['Yokomo RPX3', 'Yokomo RPX2', 'Yokomo PRO4', 'Hobbywing G3', 'Hobbywing G3X', 'Other'],
} as const

// ─── Number fields ─────────────────────────────────────────────────────────────
const NUMBER_FIELDS = new Set([
  'front_center_link_height', 'front_center_link_washers', 'front_steering_block_washers',
  'rear_ball_stud_mount_washers',
  'front_camber', 'front_toe', 'front_ride_height',
  'rear_camber', 'rear_toe', 'rear_ride_height',
  'front_shock_spring_rate', 'rear_shock_spring_rate',
  'front_shock_oil_cst', 'rear_shock_oil_cst',
  'total_weight', 'spur', 'pinion',
  'rating', 'crashes',
])

// ─── All form keys ─────────────────────────────────────────────────────────────
const ALL_KEYS = [
  'name', 'notes',
  'event_name', 'track_name', 'date', 'surface', 'track_feel', 'traction_level', 'track_temp', 'conditions',
  'run_type', 'rating', 'motor_temp', 'crashes', 'run_notes', 'setup_changes',
  'main_chassis', 'side_plate', 'gearbox', 'diff_height', 'diff_type', 'diff_gear', 'diff_decoder',
  'slipper', 'battery_side_plate', 'battery_cradle', 'servo_weight', 'chassis_weight', 'battery_weight', 'total_weight',
  'turnbuckles', 'ball_studs', 'screws',
  'front_shock_tower_hole', 'front_ball_stud_mount_material', 'front_ball_stud_mount_width',
  'front_ball_stud_position', 'front_arm_shock_mount', 'front_arm_material',
  'front_suspension_mount_height', 'front_suspension_mount_material',
  'front_center_link_material', 'front_center_link_height', 'front_center_link_washers',
  'front_hub_carrier_material', 'front_hub_carrier_position',
  'front_steering_block_material', 'front_steering_block_orientation', 'front_steering_block_washers',
  'front_kingpin_top', 'front_kingpin_bottom', 'front_shim_above', 'front_shim_below', 'front_caster_insert',
  'front_camber', 'front_camber_dir', 'front_toe', 'front_toe_dir',
  'front_ride_height', 'front_axle', 'front_sway_bar',
  'rear_shock_tower_hole', 'rear_ball_stud_mount_material', 'rear_ball_stud_mount_position', 'rear_ball_stud_mount_washers',
  'rear_arm_shock_mount', 'rear_arm_material', 'rear_arm_length', 'rear_arm_position',
  'rear_suspension_mount', 'rear_hub_carrier_material', 'rear_hub_carrier_position',
  'rear_hub_height', 'rear_link_mount_washers', 'rear_link_mount_orientation', 'rear_ball_stud_washers',
  'rear_camber', 'rear_camber_dir', 'rear_toe', 'rear_toe_dir',
  'rear_anti_squat', 'rear_ride_height', 'rear_sway_bar', 'rear_wheel_hub',
  'front_shock_cap', 'front_shock_shaft',
  'front_shock_spring_brand', 'front_shock_spring_part', 'front_shock_spring_rate',
  'front_shock_oil_cst', 'front_shock_oil_brand',
  'front_shock_piston_thickness', 'front_shock_piston_holes',
  'front_shock_inner_spacer', 'front_shock_outer_spacer',
  'front_shock_eyelet_length', 'front_shock_shaft_length',
  'rear_shock_cap', 'rear_shock_shaft',
  'rear_shock_spring_brand', 'rear_shock_spring_part', 'rear_shock_spring_rate',
  'rear_shock_oil_cst', 'rear_shock_oil_brand',
  'rear_shock_piston_thickness', 'rear_shock_piston_holes',
  'rear_shock_inner_spacer', 'rear_shock_outer_spacer',
  'rear_shock_eyelet_length', 'rear_shock_shaft_length',
  'front_compound', 'rear_compound',
  'body', 'front_wing_mount', 'front_wing_material', 'rear_wing_size', 'rear_wing_height',
  'motor', 'spur', 'pinion', 'battery', 'esc',
]

const TABS = [
  { value: 'track',        label: 'Track' },
  { value: 'run',          label: 'Run Log' },
  { value: 'chassis',      label: 'Chassis' },
  { value: 'hardware',     label: 'Hardware' },
  { value: 'front',        label: 'Front' },
  { value: 'rear',         label: 'Rear' },
  { value: 'front-shocks', label: 'Front Shocks' },
  { value: 'rear-shocks',  label: 'Rear Shocks' },
  { value: 'tires',        label: 'Tires' },
  { value: 'body',         label: 'Body' },
  { value: 'drivetrain',   label: 'Drivetrain' },
]

// ─── Field components ──────────────────────────────────────────────────────────
function Field({
  label, name, type = 'text', opts, v, upd,
}: {
  label: string
  name: string
  type?: string
  opts?: ReadonlyArray<string>
  v: string
  upd: (n: string, val: string) => void
}) {
  if (opts) {
    return (
      <div>
        <label className={lCls}>{label}</label>
        <select name={name} value={v} onChange={e => upd(name, e.target.value)} className={sCls}>
          <option value="">—</option>
          {opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    )
  }
  return (
    <div>
      <label className={lCls}>{label}</label>
      <input
        name={name} type={type} value={v}
        onChange={e => upd(name, e.target.value)}
        step={type === 'number' ? 'any' : undefined}
        className={iCls}
      />
    </div>
  )
}

function InOutField({
  label, name, v, upd,
}: {
  label: string
  name: string
  v: (n: string) => string
  upd: (n: string, val: string) => void
}) {
  return (
    <div>
      <label className={lCls}>{label}</label>
      <div className="flex gap-2">
        <input
          type="number" step="any"
          value={v(name)}
          onChange={e => upd(name, e.target.value)}
          placeholder="0.0"
          className={`${iCls} min-w-0 flex-1`}
        />
        <select
          value={v(`${name}_dir`)}
          onChange={e => upd(`${name}_dir`, e.target.value)}
          className={`${sCls} w-20 shrink-0`}
        >
          <option value="">—</option>
          <option>In</option>
          <option>Out</option>
        </select>
      </div>
    </div>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={GROUP}>
      <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
      <div className={G2}>{children}</div>
    </div>
  )
}

function ShockPanel({
  pos, v, upd,
}: {
  pos: 'front' | 'rear'
  v: (n: string) => string
  upd: (n: string, val: string) => void
}) {
  const p = `${pos}_shock_`
  const springs = pos === 'front' ? FRONT_SPRINGS : REAR_SPRINGS
  const brand = v(`${p}spring_brand`)
  const filtered = springs.filter(s => s.brand === brand)
  const rate = v(`${p}spring_rate`)

  function handleBrand(val: string) {
    upd(`${p}spring_brand`, val)
    upd(`${p}spring_part`, '')
    upd(`${p}spring_rate`, '')
  }

  function handleSpring(part: string) {
    const s = springs.find(sp => sp.part === part)
    upd(`${p}spring_part`, part)
    upd(`${p}spring_rate`, s ? String(s.rate) : '')
  }

  return (
    <div className="space-y-4">
      <Group title="Body">
        <Field label="Cap"   name={`${p}cap`}   opts={O.shock_cap}   v={v(`${p}cap`)}   upd={upd} />
        <Field label="Shaft" name={`${p}shaft`} opts={O.shock_shaft} v={v(`${p}shaft`)} upd={upd} />
      </Group>

      <Group title="Spring">
        <div>
          <label className={lCls}>Brand</label>
          <select value={brand} onChange={e => handleBrand(e.target.value)} className={sCls}>
            <option value="">—</option>
            {SPRING_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className={lCls}>
            Spring{rate && <span className="ml-2 font-mono text-yokomo-blue">{rate} lb/in</span>}
          </label>
          <select
            value={v(`${p}spring_part`)}
            onChange={e => handleSpring(e.target.value)}
            disabled={!brand}
            className={`${sCls} disabled:opacity-40`}
          >
            <option value="">—</option>
            {filtered.map(s => (
              <option key={s.part} value={s.part}>
                {s.color} ({s.part}) — {s.rate} lb/in
              </option>
            ))}
          </select>
        </div>
      </Group>

      <Group title="Oil">
        <Field label="Oil (cSt)"  name={`${p}oil_cst`}   opts={OIL_CST}     v={v(`${p}oil_cst`)}   upd={upd} />
        <Field label="Oil brand"  name={`${p}oil_brand`} opts={O.oil_brand}  v={v(`${p}oil_brand`)} upd={upd} />
      </Group>

      <Group title="Piston">
        <Field label="Thickness" name={`${p}piston_thickness`} opts={O.piston_thickness} v={v(`${p}piston_thickness`)} upd={upd} />
        <Field label="Holes"     name={`${p}piston_holes`}     opts={O.piston_holes}     v={v(`${p}piston_holes`)}     upd={upd} />
      </Group>

      <Group title="Spacers & Length">
        <Field label="Inner spacer"  name={`${p}inner_spacer`}  opts={O.spacer}        v={v(`${p}inner_spacer`)}  upd={upd} />
        <Field label="Outer spacer"  name={`${p}outer_spacer`}  opts={O.spacer}        v={v(`${p}outer_spacer`)}  upd={upd} />
        <Field label="Eyelet length" name={`${p}eyelet_length`} opts={O.eyelet_length} v={v(`${p}eyelet_length`)} upd={upd} />
        <Field label="Shaft length"  name={`${p}shaft_length`}  opts={SHAFT_LENGTHS}   v={v(`${p}shaft_length`)}  upd={upd} />
      </Group>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export function SetupForm({ userId }: { userId: string }) {
  const [tab, setTab] = useState('track')
  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(ALL_KEYS.map(k => [k, '']))
  )
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [savedSetups, setSavedSetups] = useState<{ id: string; name: string; created_at: string }[]>([])
  const [loading, setLoading] = useState(false)

  const upd = (n: string, val: string) => setForm(prev => ({ ...prev, [n]: val }))
  const v   = (n: string) => form[n] ?? ''

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('setups')
      .select('id, name, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setSavedSetups(data) })
  }, [userId])

  async function loadSetup(id: string) {
    if (!id) return
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('setups').select('*').eq('id', id).single()
    if (data) {
      const sd: Record<string, unknown> = data.setup_data ?? {}
      setForm(prev => {
        const next = { ...prev }
        next['name']  = data.name  ?? ''
        next['notes'] = data.notes ?? ''
        for (const key of ALL_KEYS) {
          if (key === 'name' || key === 'notes') continue
          const val = sd[key]
          next[key] = val == null ? '' : String(val)
        }
        return next
      })
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    setErrorMsg('')

    // Build setup_data JSONB from all form fields except top-level columns
    const setupData: Record<string, string | number | null> = {
      front_tire: 'JConcepts Smoothie 2',
      rear_tire:  'JConcepts Smoothie 2',
    }
    for (const [key, value] of Object.entries(form)) {
      if (key === 'name' || key === 'notes') continue
      setupData[key] = NUMBER_FIELDS.has(key)
        ? (value === '' ? null : Number(value))
        : (value || null)
    }

    const supabase = createClient()
    const { error } = await supabase.from('setups').insert({
      user_id:    userId,
      name:       form.name || null,
      notes:      form.notes || null,
      car_model:  form.main_chassis || null,
      setup_data: setupData,
    })

    if (error) { setErrorMsg(error.message); setStatus('error') }
    else        { setStatus('saved') }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Setup name + notes ── */}
      <div className={CARD}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">Setup Details</h2>
          <select
            value=""
            onChange={e => loadSetup(e.target.value)}
            disabled={loading || savedSetups.length === 0}
            className="rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-1.5 text-sm text-gray-300 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue disabled:opacity-50"
          >
            <option value="">{loading ? 'Loading…' : 'Load a saved setup…'}</option>
            {savedSetups.map(s => (
              <option key={s.id} value={s.id}>
                {s.name || '(unnamed)'} — {new Date(s.created_at).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-4">
          <div>
            <label className={lCls}>Setup name</label>
            <input
              name="name" type="text" value={v('name')}
              onChange={e => upd('name', e.target.value)}
              placeholder="e.g. Carpet – warm tyres – Q1"
              required className={iCls}
            />
          </div>
          <div>
            <label className={lCls}>Notes</label>
            <textarea
              name="notes" value={v('notes')}
              onChange={e => upd('notes', e.target.value)}
              placeholder="General setup notes…"
              rows={3} className={`${iCls} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div>
        <div className="sticky top-16 z-10 overflow-x-auto bg-[#0A0A0A] py-3">
          <div className="flex gap-2 whitespace-nowrap">
            {TABS.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTab(t.value)}
                className={tab === t.value ? TAB_A : TAB_I}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Track & Conditions ── */}
        {tab === 'track' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Track &amp; Conditions</h2>
            <div className={G2}>
              <Field label="Event name"  name="event_name"     v={v('event_name')}     upd={upd} />
              <Field label="Track name"  name="track_name"     v={v('track_name')}     upd={upd} />
              <Field label="Date"        name="date"           v={v('date')}           upd={upd} type="date" />
              <Field label="Surface"     name="surface"        v={v('surface')}        upd={upd} opts={O.surface} />
              <Field label="Track feel"  name="track_feel"     v={v('track_feel')}     upd={upd} opts={O.track_feel} />
              <Field label="Traction"    name="traction_level" v={v('traction_level')} upd={upd} opts={O.traction_level} />
              <Field label="Track temp"  name="track_temp"     v={v('track_temp')}     upd={upd} opts={O.track_temp} />
              <Field label="Conditions"  name="conditions"     v={v('conditions')}     upd={upd} opts={O.conditions} />
            </div>
          </div>
        )}

        {/* ── Run Log ── */}
        {tab === 'run' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Run Log</h2>
            <div className={G2}>
              <Field label="Run type"   name="run_type"   v={v('run_type')}   upd={upd} opts={O.run_type} />
              <Field label="Rating"     name="rating"     v={v('rating')}     upd={upd} opts={O.rating} />
              <Field label="Motor temp" name="motor_temp" v={v('motor_temp')} upd={upd} opts={O.motor_temp} />
              <Field label="Crashes"    name="crashes"    v={v('crashes')}    upd={upd} opts={CRASHES} />
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className={lCls}>How the car felt</label>
                <textarea
                  name="run_notes" value={v('run_notes')}
                  onChange={e => upd('run_notes', e.target.value)}
                  placeholder="Loose, pushing, good balance…"
                  rows={3} className={`${iCls} resize-none`}
                />
              </div>
              <div>
                <label className={lCls}>Setup changes this run</label>
                <textarea
                  name="setup_changes" value={v('setup_changes')}
                  onChange={e => upd('setup_changes', e.target.value)}
                  placeholder="What changed from the previous run…"
                  rows={3} className={`${iCls} resize-none`}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Chassis ── */}
        {tab === 'chassis' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Chassis &amp; Gearbox</h2>
            <div className={G2}>
              <Field label="Main chassis"        name="main_chassis"       v={v('main_chassis')}       upd={upd} opts={O.main_chassis} />
              <Field label="Chassis side plate"  name="side_plate"         v={v('side_plate')}         upd={upd} opts={O.side_plate} />
              <Field label="Gearbox"             name="gearbox"            v={v('gearbox')}            upd={upd} opts={O.gearbox} />
              <Field label="Diff height"         name="diff_height"        v={v('diff_height')}        upd={upd} opts={O.diff_height} />
              <Field label="Diff type"           name="diff_type"          v={v('diff_type')}          upd={upd} opts={O.diff_type} />
              {v('diff_type') === 'Gear' && (
                <Field label="Diff gear"         name="diff_gear"          v={v('diff_gear')}          upd={upd} opts={O.diff_gear} />
              )}
              {v('diff_type') === 'Ball Diff' && (
                <Field label="Decoder setting"   name="diff_decoder"       v={v('diff_decoder')}       upd={upd} />
              )}
              <Field label="Slipper"             name="slipper"            v={v('slipper')}            upd={upd} opts={O.slipper} />
              <Field label="Battery side plate"  name="battery_side_plate" v={v('battery_side_plate')} upd={upd} opts={O.battery_side_plate} />
              <Field label="Battery cradle hole" name="battery_cradle"     v={v('battery_cradle')}     upd={upd} opts={O.battery_cradle} />
              <Field label="Servo weight"        name="servo_weight"       v={v('servo_weight')}       upd={upd} opts={O.servo_weight} />
              <Field label="Chassis weight"      name="chassis_weight"     v={v('chassis_weight')}     upd={upd} opts={O.chassis_weight} />
              <Field label="Battery weight"      name="battery_weight"     v={v('battery_weight')}     upd={upd} opts={O.battery_weight} />
              <Field label="Total weight (g)"    name="total_weight"       v={v('total_weight')}       upd={upd} type="number" />
            </div>
          </div>
        )}

        {/* ── Hardware ── */}
        {tab === 'hardware' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Hardware</h2>
            <div className={G2}>
              <Field label="Turnbuckles" name="turnbuckles" v={v('turnbuckles')} upd={upd} opts={O.turnbuckles} />
              <Field label="Ball studs"  name="ball_studs"  v={v('ball_studs')}  upd={upd} opts={O.ball_studs} />
              <Field label="Screws"      name="screws"      v={v('screws')}      upd={upd} opts={O.screws} />
            </div>
          </div>
        )}

        {/* ── Front ── */}
        {tab === 'front' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Front End</h2>
            <div className="space-y-4">
              <Group title="Shock Tower">
                <Field label="Mounting hole" name="front_shock_tower_hole" v={v('front_shock_tower_hole')} upd={upd} opts={O.shock_tower_hole} />
              </Group>

              <Group title="Ball Stud Mount">
                <Field label="Material"           name="front_ball_stud_mount_material" v={v('front_ball_stud_mount_material')} upd={upd} opts={O.bsm_material} />
                <Field label="Width"              name="front_ball_stud_mount_width"    v={v('front_ball_stud_mount_width')}    upd={upd} opts={O.front_bsm_width} />
                <Field label="Ball stud position" name="front_ball_stud_position"       v={v('front_ball_stud_position')}       upd={upd} opts={O.ball_stud_position} />
              </Group>

              <Group title="Arms">
                <Field label="Shock mount" name="front_arm_shock_mount" v={v('front_arm_shock_mount')} upd={upd} opts={O.arm_shock_mount} />
                <Field label="Material"    name="front_arm_material"    v={v('front_arm_material')}    upd={upd} opts={O.arm_material} />
              </Group>

              <Group title="Suspension Mount">
                <Field label="Height"   name="front_suspension_mount_height"   v={v('front_suspension_mount_height')}   upd={upd} opts={O.front_susp_height} />
                <Field label="Material" name="front_suspension_mount_material" v={v('front_suspension_mount_material')} upd={upd} opts={O.front_susp_material} />
              </Group>

              <Group title="Center Link">
                <Field label="Material"    name="front_center_link_material" v={v('front_center_link_material')} upd={upd} opts={O.center_link_material} />
                <Field label="Height (mm)" name="front_center_link_height"   v={v('front_center_link_height')}   upd={upd} type="number" />
                <Field label="Washers"     name="front_center_link_washers"  v={v('front_center_link_washers')}  upd={upd} type="number" />
              </Group>

              <Group title="Hub Carrier">
                <Field label="Material" name="front_hub_carrier_material" v={v('front_hub_carrier_material')} upd={upd} opts={O.front_hub_carrier_mat} />
                <Field label="Position" name="front_hub_carrier_position" v={v('front_hub_carrier_position')} upd={upd} opts={O.front_hub_carrier_pos} />
              </Group>

              <Group title="Steering Block">
                <Field label="Material"    name="front_steering_block_material"    v={v('front_steering_block_material')}    upd={upd} opts={O.steering_block_mat} />
                <Field label="Orientation" name="front_steering_block_orientation" v={v('front_steering_block_orientation')} upd={upd} opts={O.steering_block_orient} />
                <Field label="Washers"     name="front_steering_block_washers"     v={v('front_steering_block_washers')}     upd={upd} type="number" />
              </Group>

              <Group title="Kingpin">
                <Field label="Top"           name="front_kingpin_top"    v={v('front_kingpin_top')}    upd={upd} opts={O.kingpin_top} />
                <Field label="Bottom"        name="front_kingpin_bottom" v={v('front_kingpin_bottom')} upd={upd} opts={O.kingpin_bottom} />
                <Field label="Shim above"    name="front_shim_above"     v={v('front_shim_above')}     upd={upd} opts={O.shim} />
                <Field label="Shim below"    name="front_shim_below"     v={v('front_shim_below')}     upd={upd} opts={O.shim} />
                <Field label="Caster insert" name="front_caster_insert"  v={v('front_caster_insert')}  upd={upd} opts={O.caster_insert} />
              </Group>

              <Group title="Geometry">
                <InOutField label="Camber (°)"    name="front_camber"      v={v} upd={upd} />
                <InOutField label="Toe (°)"       name="front_toe"         v={v} upd={upd} />
                <Field label="Ride height (mm)"   name="front_ride_height" v={v('front_ride_height')} upd={upd} type="number" />
                <Field label="Axle"               name="front_axle"        v={v('front_axle')}        upd={upd} opts={O.front_axle} />
                <Field label="Sway bar"           name="front_sway_bar"    v={v('front_sway_bar')}    upd={upd} opts={O.front_sway_bar} />
              </Group>
            </div>
          </div>
        )}

        {/* ── Rear ── */}
        {tab === 'rear' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Rear End</h2>
            <div className="space-y-4">
              <Group title="Shock Tower">
                <Field label="Mounting hole" name="rear_shock_tower_hole" v={v('rear_shock_tower_hole')} upd={upd} opts={O.shock_tower_hole} />
              </Group>

              <Group title="Ball Stud Mount">
                <Field label="Material" name="rear_ball_stud_mount_material" v={v('rear_ball_stud_mount_material')} upd={upd} opts={O.bsm_material} />
                <Field label="Position" name="rear_ball_stud_mount_position" v={v('rear_ball_stud_mount_position')} upd={upd} opts={O.ball_stud_position} />
                <Field label="Washers"  name="rear_ball_stud_mount_washers"  v={v('rear_ball_stud_mount_washers')}  upd={upd} type="number" />
              </Group>

              <Group title="Arms">
                <Field label="Shock mount" name="rear_arm_shock_mount" v={v('rear_arm_shock_mount')} upd={upd} opts={O.arm_shock_mount} />
                <Field label="Material"    name="rear_arm_material"    v={v('rear_arm_material')}    upd={upd} opts={O.arm_material} />
                <Field label="Length"      name="rear_arm_length"      v={v('rear_arm_length')}      upd={upd} opts={O.rear_arm_length} />
                <Field label="Position"    name="rear_arm_position"    v={v('rear_arm_position')}    upd={upd} opts={O.rear_arm_pos} />
              </Group>

              <Group title="Suspension Mount">
                <Field label="Type" name="rear_suspension_mount" v={v('rear_suspension_mount')} upd={upd} opts={O.rear_susp_mount} />
              </Group>

              <Group title="Hub Carrier">
                <Field label="Material"           name="rear_hub_carrier_material"   v={v('rear_hub_carrier_material')}   upd={upd} opts={O.rear_hub_carrier_mat} />
                <Field label="Position"           name="rear_hub_carrier_position"   v={v('rear_hub_carrier_position')}   upd={upd} opts={O.rear_hub_carrier_pos} />
                <Field label="Hub height"         name="rear_hub_height"             v={v('rear_hub_height')}             upd={upd} opts={O.mm_steps} />
                <Field label="Link mount washers" name="rear_link_mount_washers"     v={v('rear_link_mount_washers')}     upd={upd} opts={O.mm_steps} />
                <Field label="Link mount orient." name="rear_link_mount_orientation" v={v('rear_link_mount_orientation')} upd={upd} opts={O.rear_link_orient} />
                <Field label="Ball stud washers"  name="rear_ball_stud_washers"      v={v('rear_ball_stud_washers')}      upd={upd} opts={O.mm_steps} />
              </Group>

              <Group title="Geometry">
                <InOutField label="Camber (°)"  name="rear_camber"      v={v} upd={upd} />
                <InOutField label="Toe (°)"     name="rear_toe"         v={v} upd={upd} />
                <Field label="Anti-squat"       name="rear_anti_squat"  v={v('rear_anti_squat')}  upd={upd} opts={O.anti_squat} />
                <Field label="Ride height (mm)" name="rear_ride_height" v={v('rear_ride_height')} upd={upd} type="number" />
                <Field label="Sway bar"         name="rear_sway_bar"    v={v('rear_sway_bar')}    upd={upd} opts={O.rear_sway_bar} />
                <Field label="Wheel hub"        name="rear_wheel_hub"   v={v('rear_wheel_hub')}   upd={upd} opts={O.wheel_hub} />
              </Group>
            </div>
          </div>
        )}

        {/* ── Front Shocks ── */}
        {tab === 'front-shocks' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Front Shocks</h2>
            <ShockPanel pos="front" v={v} upd={upd} />
          </div>
        )}

        {/* ── Rear Shocks ── */}
        {tab === 'rear-shocks' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Rear Shocks</h2>
            <ShockPanel pos="rear" v={v} upd={upd} />
          </div>
        )}

        {/* ── Tires ── */}
        {tab === 'tires' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Tires &amp; Wheels</h2>
            <p className="mb-4 text-sm text-gray-500">Tire: JConcepts Smoothie 2</p>
            <div className={G2}>
              <Field label="Front compound" name="front_compound" v={v('front_compound')} upd={upd} opts={O.compound} />
              <Field label="Rear compound"  name="rear_compound"  v={v('rear_compound')}  upd={upd} opts={O.compound} />
            </div>
          </div>
        )}

        {/* ── Body ── */}
        {tab === 'body' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Body &amp; Wing</h2>
            <div className={G2}>
              <Field label="Body"                name="body"                v={v('body')}                upd={upd} opts={O.body} />
              <Field label="Front wing mount"    name="front_wing_mount"    v={v('front_wing_mount')}    upd={upd} opts={O.front_wing_mount} />
              <Field label="Front wing material" name="front_wing_material" v={v('front_wing_material')} upd={upd} opts={O.front_wing_material} />
              <Field label="Rear wing size"      name="rear_wing_size"      v={v('rear_wing_size')}      upd={upd} opts={O.rear_wing_size} />
              <Field label="Rear wing height"    name="rear_wing_height"    v={v('rear_wing_height')}    upd={upd} opts={O.rear_wing_height} />
            </div>
          </div>
        )}

        {/* ── Drivetrain ── */}
        {tab === 'drivetrain' && (
          <div className={CARD}>
            <h2 className="mb-6 text-xl font-semibold text-white">Drivetrain</h2>
            <div className={G2}>
              <Field label="Motor"      name="motor"   v={v('motor')}   upd={upd} />
              <Field label="Spur (T)"   name="spur"    v={v('spur')}    upd={upd} type="number" />
              <Field label="Pinion (T)" name="pinion"  v={v('pinion')}  upd={upd} type="number" />
              <Field label="Battery"    name="battery" v={v('battery')} upd={upd} />
              <Field label="ESC"        name="esc"     v={v('esc')}     upd={upd} opts={O.esc} />
            </div>
          </div>
        )}
      </div>

      {/* ── Submit ── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          {status === 'saved' && <p className="text-sm text-green-400">Setup saved.</p>}
          {status === 'error' && <p className="text-sm text-red-400">{errorMsg || 'Failed to save.'}</p>}
        </div>
        <button
          type="submit"
          disabled={status === 'saving'}
          className="rounded-lg bg-yokomo-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-yokomo-blue/90 disabled:opacity-50"
        >
          {status === 'saving' ? 'Saving…' : 'Save setup'}
        </button>
      </div>
    </form>
  )
}
