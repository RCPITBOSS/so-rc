# Yokomo SO 2.0 / SO 3.0 — Setup Sheet Data Model v4

---

## TRACK & CONDITIONS

- **Event Name:** ___ (user enters)
- **Track Name:** ___ (user enters)
- **Date:** ___
- **Surface:** Carpet / Astroturf / Clay / Dirt
- **Track Feel:** Smooth / Bumpy
- **Traction Level:** Low / Medium / High / Blue Groove
- **Track Temp:** Cold (<50°F / <10°C) / Mild (50–70°F / 10–21°C) / Warm (70–85°F / 21–29°C) / Hot (>85°F / >29°C)
- **Conditions:** Wet / Dry / Dusty

---

## RUN LOG
*(One entry per run — saved on submit. Each run links to full setup snapshot. Changes between runs are automatically diffed and displayed with rating delta.)*

- **Run Type:** Practice / Qualifier / Main
- **Rating:** 1 / 2 / 3 / 4 / 5 stars
- **Motor Temp:** Cool (<120°F / <49°C) / Warm (120–150°F / 49–65°C) / Hot (150–180°F / 65–82°C) / Super Hot (>180°F / >82°C)
- **Crashes:** 0 / 1 / 2 / 3 / 4 / 5 / 6 / 7 / 8 / 9 / 10 / 11 / 12 / 13 / 14 / 15 / 16 / 17 / 18 / 19 / 20
- **Notes:** ___ (how the car felt)
- **Setup Changes This Run:** ___ (auto-diffed against previous snapshot + user notes)

### Rating Weight Logic
*(System use — not user facing)*
- Rating is weighted against number of setup changes made between runs
- Fewer changes = higher confidence that a specific change caused the rating delta
- Example: rating goes 3→5 with 1 change = high confidence signal on that change
- Example: rating goes 3→5 with 8 changes = low confidence, flagged as inconclusive
- Crashes are factored into rating weight — a low rating with 5 crashes is treated differently than a low rating with 0 crashes
- AI uses weighted signals to build setup recommendations over time

---

## CHASSIS & GEARBOX

- **Main Chassis:** SO 2.0 / SO 3.0 / DTM 3.1 / CAL 3.1
- **Chassis Side Plate:** Standard / Graphite
- **Gearbox:** LD / LCA / LCG
- **Diff Height:** 0 / 1 / 2 / 3 (0 = lowest)
- **Differential Type:** Gear / Ball Diff
  - If Gear: 2-gear / 4-gear
  - If Ball Diff: Decoder setting ___
- **Slipper:** Ventilated Outer / Ventilated Dual / 3 Pad / Direct Drive
- **Battery Position — Chassis Side Plate Hole:** Forward / Middle / Back
- **Battery Position — Cradle Hole:** 1 / 2 / 3 / 4 / 5 (1 = furthest forward)
- **Servo Weight:** Aluminum / Steel
- **Chassis Weight:** Aluminum / Steel
- **Battery Weight:** None / 10g / 25g / 31g / 34g / 69g
- **Total Weight:** ___ g (user enters)

---

## HARDWARE

- **Turnbuckles:** Steel / Titanium
- **Ball Studs:** Steel / Titanium
- **Screws:** Steel / Titanium

---

## FRONT END

### Shock Tower
- Mounting hole position: 1 / 2 / 3 / 4 / 5 (1 = innermost)

### Ball Stud Mount
- Material: Plastic / Aluminum
- Width: Standard / Narrow
- Ball stud position: Inside / Middle / Outside

### Front Arms
- Shock mounting position: Inner / Middle / Outer
- Material: Standard / Graphite

### Front Suspension Mount
- Height: 0 / +1
- Material: Plastic / Aluminum / Steel

### Center Link
- Material: Plastic / Aluminum
- Height: ___ mm
- Ball stud washers: ___

### Hub Carrier
- Material: Hard / Graphite
- Position: Forward / Back

### Steering Block
- Material: Hard / Graphite
- Orientation: Narrow Low / Narrow High / Wide Low / Wide High
- Ball stud washers: ___

### Kingpin Setup
- Top kingpin: Black / Thick
- Bottom kingpin: Black / Thick
- Shim above steering block: 0 / 2.5mm
- Shim below steering block: 0 / 2.5mm

### Caster Insert
- -5° / -2.5° / 0° / 2.5° / 5°

### Front Geometry
- Camber: ___ ° In / Out
- Toe: ___ ° In / Out
- Ride Height: ___ mm

### Front Axle
- 4.5mm / 5mm

### Front Sway Bar
- None / 0.9mm / 1.0mm / 1.1mm

---

## REAR END

### Shock Tower
- Mounting hole position: 1 / 2 / 3 / 4 / 5 (1 = innermost)

### Ball Stud Mount
- Material: Plastic / Aluminum
- Position: Inside / Middle / Outside
- Ball stud washers: ___

### Rear Arms
- Shock mounting position: Inner / Middle / Outer
- Material: Standard / Graphite
- Length: S3 / L5
- Position: Forward / Middle / Back

### Rear Suspension Mount
- Standard / High Mount

### Rear Hub Carrier
- Material: Hard / Graphite / Aluminum
- Position: Forward / Middle / Back
- Hub height: 0 / 0.5 / 1 / 1.5 / 2 / 2.5 / 3mm
- Link mount washers: 0 / 0.5 / 1 / 1.5 / 2 / 2.5 / 3mm
- Link mount orientation: In / Out
- Ball stud washers: 0 / 0.5 / 1 / 1.5 / 2 / 2.5 / 3mm

### Rear Geometry
- Camber: ___ ° In / Out
- Toe: ___ ° In / Out
- Anti-squat: 0 / 1 / 1.5 / 2 / 2.5 / 3°
- Ride Height: ___ mm

### Rear Sway Bar
- None / 1.0mm / 1.1mm / 1.2mm / 1.3mm / 1.4mm / 1.5mm

### Wheel Hub
- 4.3mm / 5mm / 6mm

---

## SHOCKS (Front and Rear — same fields)

- **Cap:** Aluminum / Plastic
- **Shaft:** Chrome / Titanium Coated
- **Spring Brand:** Yokomo / Associated / X-Gear / Xray Conical / Willspeed

**Spring — Front Options (lb/in):**
| Brand | Part # | Color/ID | Rate (lb/in) |
|---|---|---|---|
| Yokomo | YS-12725F | Dot4 | 3.22 |
| Yokomo | YS-12700F | Dot5 | 3.39 |
| Yokomo | YS-12675F | Dot6 | 3.57 |
| Yokomo | YS-12650F | Dot7 | 3.65 |
| Yokomo | YS-12625F | Dot8 | 3.84 |
| Yokomo Flex | YS-12650FF | Pink | 3.20 |
| Yokomo Flex | YS-12625FF | Green | 3.34 |
| Yokomo Flex | YS-12600FF | Orange | 3.54 |
| Yokomo Flex | YS-12575FF | Black | 3.80 |
| Yokomo Flex | YS-12550FF | Purple | 4.06 |
| Yokomo Flex | YS-12525FF | Brown | 4.25 |
| Associated | AS91940 | White | 3.30 |
| Associated | AS91941 | Gray | 3.40 |
| Associated | AS91942 | Blue | 3.60 |
| Associated | AS91943 | Yellow | 3.80 |
| Associated | AS91944 | Red | 4.00 |
| Associated | AS91945 | Orange | 4.30 |
| Associated | AS91946 | Purple | 4.60 |
| X-Gear | 10511 | White | 2.85 |
| X-Gear | 10512 | Gold | 2.98 |
| X-Gear | 10513 | Red | 3.10 |
| X-Gear | 10514 | Yellow | 3.21 |
| X-Gear | 10515 | Blue | 3.38 |
| X-Gear | 10516 | Green | 3.54 |
| X-Gear | 10517 | Pink | 3.77 |
| X-Gear | 10518 | Silver | 3.94 |
| X-Gear | 10519 | Orange | 4.19 |
| Willspeed | W2001 | Yellow | 4.00 |
| Willspeed | W2002 | Orange | 4.25 |
| Willspeed | W2003 | Red | 4.50 |
| Willspeed | W2004 | Green | 4.80 |
| Willspeed | W2005 | Blue | 5.00 |
| Xray Conical | XR368381 | 1-Dot | 3.70 |
| Xray Conical | XR368382 | 2-Dot | 3.86 |
| Xray Conical | XR368383 | 3-Dot | 4.04 |
| Xray Conical | XR368384 | 4-Dot | 4.15 |
| Xray Conical | XR368385 | 5-Dot | 4.29 |

**Spring — Rear Options (lb/in):**
| Brand | Part # | Color/ID | Rate (lb/in) |
|---|---|---|---|
| Yokomo | YS-12115R | Dot3 | 1.86 |
| Yokomo | YS-12110R | Dot4 | 2.00 |
| Yokomo | YS-12105R | Dot5 | 2.07 |
| Yokomo | YS-12100R | Dot6 | 2.19 |
| Yokomo Flex | YS-121025RF | Pink | 1.81 |
| Yokomo Flex | YS-12105RF | Red | 1.83 |
| Yokomo Flex | YS-12100RF | Green | 1.86 |
| Yokomo Flex | YS-12975RF | Orange | 1.91 |
| Associated | AS91947 | Green | 1.78 |
| Associated | AS91948 | White | 1.89 |
| Associated | AS91949 | Gray | 1.99 |
| Associated | AS91950 | Blue | 2.10 |
| Associated | AS91951 | Yellow | 2.25 |
| X-Gear | 10521 | White | 1.91 |
| X-Gear | 10522 | Gold | 1.97 |
| X-Gear | 10523 | Red | 2.03 |
| X-Gear | 10524 | Yellow | 2.09 |
| X-Gear | 10525 | Blue | 2.13 |
| X-Gear | 10526 | Green | 2.19 |
| X-Gear | 10527 | Pink | 2.27 |
| Willspeed | W2006 | Yellow | 1.98 |
| Willspeed | W2007 | Orange | 2.11 |
| Willspeed | W2008 | Red | 2.27 |
| Willspeed | W2009 | Green | 2.40 |
| Willspeed | W2010 | Blue | 2.63 |
| Xray Conical | XR368481 | 1-Dot | 1.98 |
| Xray Conical | XR368482 | 2-Dot | 2.09 |
| Xray Conical | XR368483 | 3-Dot | 2.18 |
| Xray Conical | XR368484 | 4-Dot | 2.37 |
| Xray Conical | XR368485 | 5-Dot | 2.42 |

**Shock Oil:**
- CST: 100 / 150 / 200 / 225 / 250 / 275 / 300 / 325 / 350 / 375 / 400 / 425 / 450 / 475 / 500 / 525 / 550 / 575 / 600 / 625 / 650 / 675 / 700 / 725 / 750 / 775 / 800 / 825 / 850 / 875 / 900 / 925 / 950 / 975 / 1000 / 1100 / 1200 / 1300
- Brand: Associated / TLR / XTR / PT RC Racing / Mugen / Flash Point / Ultimate / Kyosho / JTP / Arrowmax / Hudy / X Ray / Yokomo / Sweep

- **Piston Thickness:** 1.5mm / 2mm / 2.5mm
- **Piston Holes:** 1.5x3 / 1.6x2 / 1.6x3 / 1.7x2 / 1.7x3 / 1.8x2 / 1.9x2 / 2.0x2
- **Inner Spacer:** 1 / 1.5 / 2 / 2.5 / 3mm
- **Outer Spacer:** 1 / 1.5 / 2 / 2.5 / 3mm
- **Eyelet Length:** Short / Medium / Long
- **Shaft Length:** 25.5 / 26 / 26.25 / 26.5 / 26.75 / 27 / 27.25 / 27.5 / 27.75 / 28 / 28.25 / 28.5 / 28.75 / 29 / 29.25 / 29.5mm

---

## TIRES & WHEELS

- **Front Tire:** JConcepts Smoothie 2 — Compound: Aqua / Silver
- **Rear Tire:** JConcepts Smoothie 2 — Compound: Aqua / Silver

---

## BODY & WING

- **Body:** SO Standard / SO Lightweight / RO 1.0 / JConcepts DTM F2 / JConcepts DTM F2 Lightweight / JConcepts P2k
- **Front Wing Mount:** Wide / Narrow
- **Front Wing Material:** Plastic / Aluminum
- **Rear Wing Size:** 6.5" / 7"
- **Rear Wing Height:** Up / Down

---

## DRIVETRAIN

- **Motor:** ___ (user enters)
- **Spur Gear:** ___ T
- **Pinion Gear:** ___ T
- **Battery:** ___ (user enters)
- **ESC:** Yokomo RPX3 / Yokomo RPX2 / Yokomo PRO4 / Hobbywing G3 / Hobbywing G3X / Other

---

*Data model version 4.0 — Yokomo SO 2.0 / SO 3.0 — superoffroadrc.com*
