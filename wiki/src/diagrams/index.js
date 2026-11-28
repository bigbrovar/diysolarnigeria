// Layouts for the schematics drawn by src/components/Schematic.astro.
//
//   w, h     the size of the drawing
//   blocks   at: [x, y, width, height] from the top-left corner. t is the title,
//            s the lines under it, k the colour (solar, batt, grid, load, earth, data)
//   wires    d is an SVG path. "M120 84 V150" starts at x=120, y=84 and runs down
//            to y=150. H runs sideways to an x, V up or down to a y.
//            label and at: [x, y] put a small tag beside the wire.
//   notes    free text at a position. k: 'b' makes it bold.

export const diagrams = {
  'sizing-steps': {
    w: 760, h: 200,
    caption: 'The four sizing steps. Each one uses the result of the step before it.',
    legend: ['step'],
    blocks: [
      { at: [10, 30, 170, 84], k: 'load', icon: 'list', t: '1. Audit', s: ['Watts and hours', 'for every load'] },
      { at: [200, 30, 170, 84], k: 'grid', icon: 'inv', t: '2. Inverter', s: ['Total watts,', 'plus headroom'] },
      { at: [390, 30, 170, 84], k: 'batt', icon: 'batt', t: '3. Battery', s: ['Energy used', 'after sunset'] },
      { at: [580, 30, 170, 84], k: 'solar', icon: 'pv', t: '4. Panels', s: ["A day's energy", 'in few hours'] },
    ],
    wires: [
      { d: 'M180 72 H200', k: 'step' },
      { d: 'M370 72 H390', k: 'step' },
      { d: 'M560 72 H580', k: 'step' },
    ],
    notes: [
      { at: [95, 146], anchor: 'middle', text: 'Gives watts and Wh a day' },
      { at: [285, 146], anchor: 'middle', text: 'Sized for the peak load' },
      { at: [475, 146], anchor: 'middle', text: 'Sized for the night' },
      { at: [665, 146], anchor: 'middle', text: 'Sized for the worst month' },
    ],
  },

  'panels-to-controller': {
    w: 760, h: 340,
    caption: 'Two strings of panels feeding one charge controller, with the three checks marked where they apply.',
    legend: ['solar', 'batt'],
    blocks: [
      { at: [20, 20, 220, 68], k: 'solar', icon: 'pv', t: 'String 1', s: ['3 panels in series'] },
      { at: [260, 20, 220, 68], k: 'solar', icon: 'pv', t: 'String 2', s: ['3 panels in series'] },
      { at: [140, 150, 220, 68], k: 'solar', icon: 'chip', t: 'Charge controller', s: ['MPPT'] },
      { at: [140, 258, 220, 64], k: 'batt', icon: 'batt', t: 'Battery', s: ['12, 24 or 48 V'] },
    ],
    wires: [
      { d: 'M130 88 V120 H250 V150', k: 'solar' },
      { d: 'M370 88 V120 H250', k: 'solar' },
      { d: 'M250 218 V258', k: 'batt' },
    ],
    notes: [
      { at: [510, 40], k: 'b', text: 'Check 1: voltage' },
      { at: [510, 58], text: 'Voc of one string, added up,' },
      { at: [510, 74], text: 'is below the PV voltage limit.' },
      { at: [510, 124], k: 'b', text: 'Check 2: current' },
      { at: [510, 142], text: 'Isc of all strings, added up,' },
      { at: [510, 158], text: 'is below the input current limit.' },
      { at: [510, 216], k: 'b', text: 'Check 3: output' },
      { at: [510, 234], text: 'Array watts ÷ battery volts' },
      { at: [510, 250], text: 'is within the rated output amps,' },
      { at: [510, 266], text: 'and within what the battery takes.' },
    ],
  },

  'battery-busbar': {
    w: 760, h: 440,
    caption: 'Each battery, the inverter and the charge controller connect to one pair of busbars, each through its own breaker.',
    legend: ['batt', 'solar'],
    blocks: [
      { at: [20, 20, 200, 64], k: 'batt', icon: 'batt', t: 'Battery 1', s: ['Equal cable length'] },
      { at: [240, 20, 200, 64], k: 'batt', icon: 'batt', t: 'Battery 2', s: ['Equal cable length'] },
      { at: [60, 116, 120, 50], k: 'batt', t: 'DC MCCB', s: ['200 A'] },
      { at: [280, 116, 120, 50], k: 'batt', t: 'DC MCCB', s: ['200 A'] },
      { at: [20, 200, 420, 60], k: 'batt', icon: 'board', t: 'Battery busbars', s: ['One positive bar, one negative bar'] },
      { at: [170, 292, 120, 50], k: 'batt', t: 'DC MCCB', s: ['150 A'] },
      { at: [120, 372, 220, 60], k: 'grid', icon: 'inv', t: 'Inverter', s: ['35 to 50 mm² cable'] },
      { at: [520, 20, 220, 64], k: 'solar', icon: 'chip', t: 'Charge controller', s: ['100 A in this example'] },
      { at: [570, 205, 120, 50], k: 'solar', t: 'Breaker', s: ['125 A'] },
    ],
    wires: [
      { d: 'M120 84 V116', k: 'batt' },
      { d: 'M340 84 V116', k: 'batt' },
      { d: 'M120 166 V200', k: 'batt' },
      { d: 'M340 166 V200', k: 'batt' },
      { d: 'M230 260 V292', k: 'batt' },
      { d: 'M230 342 V372', k: 'batt' },
      { d: 'M630 84 V205', k: 'solar' },
      { d: 'M570 230 H440', k: 'solar' },
    ],
  },

  'changeover': {
    w: 760, h: 340,
    caption: 'The circuits the inverter will power move to their own board, live and neutral together. A changeover switch selects inverter or mains for that board.',
    legend: ['grid', 'load'],
    blocks: [
      { at: [20, 20, 200, 64], k: 'grid', icon: 'grid', t: 'Mains supply', s: ['Meter'] },
      { at: [20, 130, 200, 64], k: 'grid', icon: 'board', t: 'Main board', s: ['Other circuits stay'] },
      { at: [20, 250, 200, 64], k: 'grid', icon: 'home', t: 'Heavy loads', s: ['On mains only'] },
      { at: [280, 20, 200, 64], k: 'load', icon: 'inv', t: 'Inverter', s: ['AC in, AC out'] },
      { at: [520, 130, 220, 64], k: 'load', icon: 'cable', t: 'Changeover switch', s: ['Inverter or mains'] },
      { at: [520, 250, 220, 64], k: 'load', icon: 'board', t: 'Inverter board', s: ['Own RCCB and breakers'] },
    ],
    wires: [
      { d: 'M120 84 V130', k: 'grid' },
      { d: 'M120 194 V250', k: 'grid' },
      { d: 'M220 148 H250 V52 H280', k: 'grid', label: 'AC in', at: [256, 108] },
      { d: 'M220 176 H520', k: 'grid', label: 'Mains side, L + N', at: [330, 170] },
      { d: 'M480 52 H630 V130', k: 'load', label: 'Inverter side, L + N', at: [500, 44] },
      { d: 'M630 194 V250', k: 'load', label: 'L + N', at: [640, 226] },
    ],
  },

  'spd-layers': {
    w: 760, h: 300,
    caption: 'Surge protection in layers. Each device passes a smaller surge to the next. The layers need cable between them to work in turn, and every one needs a good connection to earth.',
    legend: ['grid', 'earth'],
    blocks: [
      { at: [10, 40, 150, 64], k: 'grid', icon: 'grid', t: 'Supply', s: ['Meter'] },
      { at: [190, 40, 170, 64], k: 'grid', icon: 'bolt', t: 'Type 1 SPD', s: ['Service entry'] },
      { at: [390, 40, 170, 64], k: 'grid', icon: 'bolt', t: 'Type 2 SPD', s: ['Near equipment'] },
      { at: [590, 40, 160, 64], k: 'load', icon: 'home', t: 'Type 3', s: ['In sockets and', 'appliances'] },
      { at: [10, 220, 740, 56], k: 'earth', icon: 'earth', t: 'Earth bar and earth rod', s: ['Without a working earth, an SPD has nowhere to send the surge'] },
    ],
    wires: [
      { d: 'M160 72 H190', k: 'grid' },
      { d: 'M360 72 H390', k: 'grid' },
      { d: 'M560 72 H590', k: 'grid' },
      { d: 'M275 104 V220', k: 'earth' },
      { d: 'M475 104 V220', k: 'earth' },
    ],
    notes: [
      { at: [290, 140], text: '40 to 65 kA' },
      { at: [290, 157], text: 'Up about 3,500 V' },
      { at: [490, 140], text: '8 to 20 kA' },
      { at: [490, 157], text: 'Up 1,500 V or less' },
      { at: [375, 24], anchor: 'middle', k: 'b', text: 'Enough cable between' },
      { at: [575, 24], anchor: 'middle', k: 'b', text: '10 m of cable or more' },
    ],
  },

  'earthing': {
    w: 760, h: 380,
    caption: 'Outdoor equipment goes straight to the earth rod. Indoor equipment shares one main earth busbar, which has a single heavy cable to the rod.',
    legend: ['earth'],
    blocks: [
      { at: [20, 20, 220, 64], k: 'solar', icon: 'pv', t: 'Panels and rack', s: ['Outdoors'] },
      { at: [290, 20, 200, 64], k: 'grid', icon: 'inv', t: 'Inverter', s: ['Indoors'] },
      { at: [530, 20, 210, 64], k: 'grid', icon: 'bolt', t: 'SPDs, controller', s: ['Indoors'] },
      { at: [290, 160, 450, 60], k: 'earth', icon: 'board', t: 'Main earth busbar', s: ['One bar. Crimped lugs, bolted down tight'] },
      { at: [20, 296, 720, 64], k: 'earth', icon: 'earth', t: 'Earth rods', s: ['All rods on the property bonded together'] },
    ],
    wires: [
      { d: 'M130 84 V296', k: 'earth', label: 'Direct, 6 mm² or more', at: [140, 196] },
      { d: 'M390 84 V160', k: 'earth' },
      { d: 'M635 84 V160', k: 'earth' },
      { d: 'M515 220 V296', k: 'earth', label: '16 mm²', at: [525, 262] },
    ],
  },

  'top-balance': {
    w: 760, h: 220,
    caption: 'Top balancing by hand: every cell is charged to 3.65 V alone, then all cells are joined in parallel and charged to 3.65 V again.',
    legend: ['batt'],
    blocks: [
      { at: [20, 70, 250, 78], k: 'grid', icon: 'supply', t: 'Lithium cell charger', s: ['Set to 3.65 V', 'Stop when current is low'] },
      { at: [330, 30, 410, 158], k: 'batt', icon: 'batt', t: 'All cells in parallel', s: ['Every positive joined to one bar,', 'every negative joined to another.', '', 'In parallel they are one big 3.2 V cell,', 'so they settle to the same voltage.'] },
    ],
    wires: [
      { d: 'M270 96 H330', k: 'batt', label: 'Pos', at: [286, 88] },
      { d: 'M270 124 H330', k: 'neg', label: 'Neg', at: [286, 142] },
    ],
  },

  'monitoring': {
    w: 760, h: 300,
    caption: 'A typical monitoring setup: the inverter and battery connect to a small computer in the house, and you view it from a phone or laptop.',
    legend: ['data'],
    blocks: [
      { at: [20, 30, 200, 64], k: 'grid', icon: 'inv', t: 'Inverter', s: ['RS485 or RS232 port'] },
      { at: [280, 30, 200, 64], k: 'data', icon: 'cable', t: 'Adapter', s: ['USB or Waveshare'] },
      { at: [540, 30, 200, 64], k: 'data', icon: 'chip', t: 'Pi or mini PC', s: ['Runs the dashboard'] },
      { at: [20, 150, 200, 64], k: 'batt', icon: 'batt', t: 'Battery BMS', s: ['Bluetooth or cable'] },
      { at: [540, 210, 200, 64], k: 'load', icon: 'phone', t: 'Phone or laptop', s: ['On your network'] },
    ],
    wires: [
      { d: 'M220 62 H280', k: 'data' },
      { d: 'M480 62 H540', k: 'data' },
      { d: 'M220 182 H590 V94', k: 'data' },
      { d: 'M690 94 V210', k: 'data' },
    ],
  },
};
