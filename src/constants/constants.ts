export const countries = [
  {
    name: "Türkiye",
    lat: 39.9334, // Türkiye'nin ortalama konumu (Ankara baz alındı)
    lng: 32.8597,
    cities: [
      {
        name: "İstanbul",
        lat: 41.0082,
        lng: 28.9784,
        earthquakes: [
          { date: "2024-10-10", magnitude: 4.5 },
          { date: "2024-08-25", magnitude: 3.2 },
        ],
      },
      {
        name: "Ankara",
        lat: 39.9334,
        lng: 32.8597,
        earthquakes: [{ date: "2024-09-15", magnitude: 3.8 }],
      },
    ],
  },
  {
    name: "Japonya",
    lat: 36.2048, // Japonya'nın ortalama konumu (Tokyo baz alındı)
    lng: 138.2529,
    cities: [
      {
        name: "Tokyo",
        lat: 35.6762,
        lng: 139.6503,
        earthquakes: [
          { date: "2024-10-05", magnitude: 5.1 },
          { date: "2024-09-20", magnitude: 4.3 },
        ],
      },
      {
        name: "Osaka",
        lat: 34.6937,
        lng: 135.5023,
        earthquakes: [{ date: "2024-07-30", magnitude: 3.9 }],
      },
    ],
  },
  {
    name: "İtalya",
    lat: 41.8719, // İtalya'nın ortalama konumu (Roma baz alındı)
    lng: 12.5674,
    cities: [
      {
        name: "Roma",
        lat: 41.9028,
        lng: 12.4964,
        earthquakes: [{ date: "2024-09-10", magnitude: 4.0 }],
      },
      {
        name: "Milano",
        lat: 45.4642,
        lng: 9.19,
        earthquakes: [{ date: "2024-08-02", magnitude: 2.9 }],
      },
    ],
  },
  {
    name: "ABD",
    lat: 37.0902, // ABD'nin ortalama konumu (geniş coğrafya nedeniyle yaklaşık bir merkez)
    lng: -95.7129,
    cities: [
      {
        name: "Los Angeles",
        lat: 34.0522,
        lng: -118.2437,
        earthquakes: [
          { date: "2024-10-01", magnitude: 4.8 },
          { date: "2024-09-12", magnitude: 3.5 },
        ],
      },
      {
        name: "San Francisco",
        lat: 37.7749,
        lng: -122.4194,
        earthquakes: [{ date: "2024-09-29", magnitude: 5.2 }],
      },
    ],
  },
];
