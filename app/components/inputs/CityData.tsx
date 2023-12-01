const cities = [
  {
    label: 'Helsinki',
    latlng: [
      60.1699,
      24.9384,
    ],
  },
  {
    label: 'Turku',
    latlng: [
      60.4518,
      22.2666,
    ],
  },
  {
    label: 'Tampere',
    latlng: [
      61.4978,
      23.7609,
    ],
  },
  {
    label: 'Oulu',
    latlng: [
      65.0121,
      25.4651,
    ],
  },
  {
    label: 'Vaasa',
    latlng: [
      63.0960,
      21.6158,
    ],
  },
  {
    label: 'Jyväskylä',
    latlng: [
      62.2417,
      25.7209,
    ],
  },
  {
    label: 'Kuopio',
    latlng: [
      62.8921,
      27.6770,
    ],
  },
  {
    label: 'Lahti',
    latlng: [
      60.9829,
      25.6615,
    ],
  },
  {
    label: 'Pori',
    latlng: [
      61.4867,
      21.7970,
    ],
  },
  {
    label: 'Kouvola',
    latlng: [
      60.8677,
      26.7041,
    ],
  },
  {
    label: 'Joensuu',
    latlng: [
      62.6019,
      29.7637,
    ],
  },
  {
    label: 'Lappeenranta',
    latlng: [
      61.0586,
      28.1865,
    ],
  },
  {
    label: 'Hämeenlinna',
    latlng: [
      60.9966,
      24.4644,
    ],
  },
  {
    label: 'Porvoo',
    latlng: [
      60.3928,
      25.6649,
    ],
  },
  {
    label: 'Mikkeli',
    latlng: [
      61.6886,
      27.2723,
    ],
  },
  {
    label: 'Kokkola',
    latlng: [
      63.8377,
      23.1305,
    ],
  },
  {
    label: 'Hyvinkää',
    latlng: [
      60.6313,
      24.8618,
    ],
  },
  {
    label: 'Nurmijärvi',
    latlng: [
      60.4720,
      24.8075,
    ],
  },
  {
    label: 'Järvenpää',
    latlng: [
      60.4711,
      25.0899,
    ],
  },
  {
    label: 'Rauma',
    latlng: [
      61.1282,
      21.5122,
    ],
  },
  {
    label: 'Lohja',
    latlng: [
      60.2519,
      24.0727,
    ],
  },
  {
    label: 'Kajaani',
    latlng: [
      64.2273,
      27.7285,
    ],
  },
  {
    label: 'Kerava',
    latlng: [
      60.3985,
      25.1258,
    ],
  },
  {
    label: 'Savonlinna',
    latlng: [
      61.8688,
      28.8809,
    ],
  },
  {
    label: 'Rovaniemi',
    latlng: [
      66.5039,
      25.7294,
    ],
  },
  {
    label: 'Kuusamo',
    latlng: [
      65.9667,
      29.1833,
    ],
  },
  {
    label: 'Imatra',
    latlng: [
      61.1744,
      28.7747,
    ],
  },
  {
    label: 'Seinäjoki',
    latlng: [
      62.7945,
      22.8282,
    ],
  },
  {
    label: 'Vantaa',
    latlng: [
      60.2941,
      25.0408,
    ],
  },
  {
    label: 'Kangasala',
    latlng: [
      61.4639,
      24.0678,
    ],
  },
  {
    label: 'Raisio',
    latlng: [
      60.4859,
      22.1673,
    ],
  },
  {
    label: 'Karhula',
    latlng: [
      60.4900,
      26.9450,
    ],
  },
  {
    label: 'Kemi',
    latlng: [
      65.7333,
      24.5667,
    ],
  },
  {
    label: 'Iisalmi',
    latlng: [
      63.5667,
      27.1833,
    ],
  },
  {
    label: 'Varkaus',
    latlng: [
      62.3167,
      27.9167,
    ],
  },
  {
    label: 'Raahe',
    latlng: [
      64.6833,
      24.4833,
    ],
  },
  {
    label: 'Ylöjärvi',
    latlng: [
      61.5500,
      23.6000,
    ],
  },
  {
    label: 'Hamina',
    latlng: [
      60.5694,
      27.1989,
    ],
  },
  {
    label: 'Kaarina',
    latlng: [
      60.4083,
      22.4167,
    ],
  },
  {
    label: 'Tornio',
    latlng: [
      65.8500,
      24.1833,
    ],
  },
  {
    label: 'Heinola',
    latlng: [
      61.2000,
      26.0333,
    ],
  },
  {
    label: 'Hollola',
    latlng: [
      61.0500,
      25.4333,
    ],
  },
  {
    label: 'Valkeakoski',
    latlng: [
      61.2667,
      24.0333,
    ],
  },
  {
    label: 'Siilinjärvi',
    latlng: [
      63.0833,
      27.6667,
    ],
  },
  {
    label: 'Kuusankoski',
    latlng: [
      60.9000,
      26.6333,
    ],
  },
  {
    label: 'Salo',
    latlng: [
      60.3833,
      23.1333,
    ],
  },
  {
    label: 'Uusikaupunki',
    latlng: [
      60.8000,
      21.4167,
    ],
  },
  {
    label: 'Janakkala',
    latlng: [
      60.9000,
      24.6000,
    ],
  },
  {
    label: 'Lieto',
    latlng: [
      60.5000,
      22.4500,
    ],
  },
  {
    label: 'Vammala',
    latlng: [
      61.3333,
      22.9000,
    ],
  },
  {
    label: 'Nastola',
    latlng: [
      60.9500,
      25.9333,
    ],
  },
  {
    label: 'Orimattila',
    latlng: [
      60.8000,
      25.7500,
    ],
  },
  {
    label: 'Kauhajoki',
    latlng: [
      62.4333,
      22.1833,
    ],
  },
  {
    label: 'Tammisaari',
    latlng: [
      59.9667,
      23.4333,
    ],
  },
  {
    label: 'Kemijärvi',
    latlng: [
      66.7167,
      27.4167,
    ],
  },
  {
    label: 'Parainen',
    latlng: [
      60.3000,
      22.3000,
    ],
  },
  {
    label: 'Jämsä',
    latlng: [
      61.8667,
      25.1833,
    ],
  },
  {
    label: 'Lempäälä',
    latlng: [
      61.3167,
      23.7500,
    ],
  },

];

export default cities;
