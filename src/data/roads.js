const roads = [
  {
    id: 'nh7-joshi-badri',
    name: 'NH-7 (Joshimath-Badrinath)',
    type: 'national',
    connectingVillages: ['joshimath', 'govindghat', 'pandukeshwar'],
    vulnerabilityScore: 0.7,
    coordinates: [
      [30.5567, 79.5650],
      [30.5800, 79.5600],
      [30.6100, 79.5583],
      [30.6250, 79.5700]
    ],
    riskFactors: ['Landslide prone', 'River-adjacent', 'Steep gradient']
  },
  {
    id: 'nh107-karna-rudra',
    name: 'NH-107 (Karnaprayag-Rudraprayag)',
    type: 'national',
    connectingVillages: ['karnaprayag', 'gauchar'],
    vulnerabilityScore: 0.4,
    coordinates: [
      [30.2600, 79.2200],
      [30.2700, 79.2000],
      [30.2850, 79.1800]
    ],
    riskFactors: ['River-adjacent', 'Moderate traffic']
  },
  {
    id: 'sh-ukhimath-guptkashi',
    name: 'SH-Ukhimath-Guptkashi',
    type: 'state',
    connectingVillages: ['ukhimath', 'guptkashi'],
    vulnerabilityScore: 0.5,
    coordinates: [
      [30.5300, 79.2400],
      [30.5400, 79.1600],
      [30.5300, 79.0800]
    ],
    riskFactors: ['Mountain pass', 'Sharp curves']
  },
  {
    id: 'vr-reni-tapovan',
    name: 'Village Road (Reni-Tapovan)',
    type: 'village',
    connectingVillages: ['reni'],
    vulnerabilityScore: 0.85,
    coordinates: [
      [30.4833, 79.5833],
      [30.4900, 79.6000],
      [30.4950, 79.6200]
    ],
    riskFactors: ['Highly landslide prone', 'Narrow', 'Poor condition']
  },
  {
    id: 'nh107-gupt-son',
    name: 'NH-107 (Guptkashi-Sonprayag)',
    type: 'national',
    connectingVillages: ['guptkashi', 'sonprayag'],
    vulnerabilityScore: 0.65,
    coordinates: [
      [30.5300, 79.0800],
      [30.5800, 79.0750],
      [30.6200, 79.0700]
    ],
    riskFactors: ['Heavy pilgrim traffic', 'Steep drop-offs']
  },
  {
    id: 'nh7-pipal-helang',
    name: 'NH-7 (Pipalkoti-Helang)',
    type: 'national',
    connectingVillages: ['pipalkoti', 'helang'],
    vulnerabilityScore: 0.6,
    coordinates: [
      [30.4270, 79.4330],
      [30.4500, 79.4600],
      [30.4700, 79.4850]
    ],
    riskFactors: ['Rockfall area', 'Narrow sections']
  }
];

export default roads;
