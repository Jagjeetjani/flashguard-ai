const rivers = [
  {
    id: 'alaknanda',
    name: 'Alaknanda River',
    type: 'major',
    baseLevel: 3.2,
    dangerLevel: 5.5,
    coordinates: [
      [30.6100, 79.5583], // Govindghat
      [30.5567, 79.5650], // Near Joshimath
      [30.4700, 79.4850], // Near Helang
      [30.4270, 79.4330], // Pipalkoti
      [30.3500, 79.3000],
      [30.2850, 79.1800], // Gauchar
      [30.2600, 79.2200]  // Karnaprayag
    ]
  },
  {
    id: 'mandakini',
    name: 'Mandakini River',
    type: 'major',
    baseLevel: 2.8,
    dangerLevel: 4.8,
    coordinates: [
      [30.6200, 79.0700], // Sonprayag
      [30.5800, 79.1200],
      [30.5300, 79.0800], // Near Guptkashi
      [30.5000, 79.1500],
      [30.4500, 79.2000],
      [30.2850, 78.9800]  // Rudraprayag area
    ]
  },
  {
    id: 'rishiganga',
    name: 'Rishiganga',
    type: 'tributary',
    baseLevel: 1.5,
    dangerLevel: 3.0,
    coordinates: [
      [30.5000, 79.6200],
      [30.4900, 79.6000],
      [30.4833, 79.5833], // Reni
      [30.4750, 79.5700]
    ]
  },
  {
    id: 'dhauliganga',
    name: 'Dhauliganga',
    type: 'tributary',
    baseLevel: 2.0,
    dangerLevel: 4.0,
    coordinates: [
      [30.5500, 79.6500],
      [30.5300, 79.6000],
      [30.5567, 79.5650], // Near Joshimath
      [30.4700, 79.4850]  // Near Helang
    ]
  },
  {
    id: 'pindar',
    name: 'Pindar River',
    type: 'tributary',
    baseLevel: 1.8,
    dangerLevel: 3.5,
    coordinates: [
      [30.4000, 79.3500],
      [30.4550, 79.2900], // Nauti
      [30.3500, 79.2500],
      [30.2600, 79.2200]  // Joins Alaknanda at Karnaprayag
    ]
  },
  {
    id: 'balganga',
    name: 'Balganga',
    type: 'tributary',
    baseLevel: 1.2,
    dangerLevel: 2.5,
    coordinates: [
      [30.5800, 79.0200],
      [30.5500, 79.0500],
      [30.5300, 79.0800], // Guptkashi
      [30.5000, 79.1000]
    ]
  }
];

export default rivers;
