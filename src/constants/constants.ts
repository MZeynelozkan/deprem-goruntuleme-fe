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
        population: 15462452, // Nüfus
        region: "Marmara",
        earthquakes: [
          {
            date: "2024-10-10",
            magnitude: 4.5,
            depth: 10.2, // Derinlik (km)
            epicenter: { lat: 41.0023, lng: 29.0342 }, // Depremin merkez üssü
          },
          {
            date: "2024-08-25",
            magnitude: 3.2,
            depth: 5.8,
            epicenter: { lat: 41.0012, lng: 28.9817 },
          },
        ],
      },
      {
        name: "Ankara",
        lat: 39.9334,
        lng: 32.8597,
        population: 5676000,
        region: "İç Anadolu",
        earthquakes: [
          {
            date: "2024-09-15",
            magnitude: 3.8,
            depth: 7.5,
            epicenter: { lat: 39.9275, lng: 32.8632 },
          },
        ],
      },
    ],
  },
  {
    name: "Japonya",
    lat: 36.2048, // Japonya'nın ortalama konumu
    lng: 138.2529,
    cities: [
      {
        name: "Tokyo",
        lat: 35.6762,
        lng: 139.6503,
        population: 13929286,
        region: "Kanto",
        earthquakes: [
          {
            date: "2024-10-05",
            magnitude: 5.1,
            depth: 15.3,
            epicenter: { lat: 35.6548, lng: 139.7011 },
          },
          {
            date: "2024-09-20",
            magnitude: 4.3,
            depth: 8.7,
            epicenter: { lat: 35.6634, lng: 139.7491 },
          },
        ],
      },
      {
        name: "Osaka",
        lat: 34.6937,
        lng: 135.5023,
        population: 2754000,
        region: "Kansai",
        earthquakes: [
          {
            date: "2024-07-30",
            magnitude: 3.9,
            depth: 10.0,
            epicenter: { lat: 34.672, lng: 135.5181 },
          },
        ],
      },
    ],
  },
  {
    name: "İtalya",
    lat: 41.8719,
    lng: 12.5674,
    cities: [
      {
        name: "Roma",
        lat: 41.9028,
        lng: 12.4964,
        population: 2873000,
        region: "Lazio",
        earthquakes: [
          {
            date: "2024-09-10",
            magnitude: 4.0,
            depth: 12.1,
            epicenter: { lat: 41.8955, lng: 12.4823 },
          },
        ],
      },
      {
        name: "Milano",
        lat: 45.4642,
        lng: 9.19,
        population: 1366180,
        region: "Lombardia",
        earthquakes: [
          {
            date: "2024-08-02",
            magnitude: 2.9,
            depth: 6.2,
            epicenter: { lat: 45.4635, lng: 9.1857 },
          },
        ],
      },
    ],
  },
  {
    name: "ABD",
    lat: 37.0902,
    lng: -95.7129,
    cities: [
      {
        name: "Los Angeles",
        lat: 34.0522,
        lng: -118.2437,
        population: 3980400,
        region: "Kaliforniya",
        earthquakes: [
          {
            date: "2024-10-01",
            magnitude: 4.8,
            depth: 20.0,
            epicenter: { lat: 34.0437, lng: -118.2468 },
          },
          {
            date: "2024-09-12",
            magnitude: 3.5,
            depth: 7.9,
            epicenter: { lat: 34.0658, lng: -118.2385 },
          },
        ],
      },
      {
        name: "San Francisco",
        lat: 37.7749,
        lng: -122.4194,
        population: 883305,
        region: "Kaliforniya",
        earthquakes: [
          {
            date: "2024-09-29",
            magnitude: 5.2,
            depth: 18.7,
            epicenter: { lat: 37.7814, lng: -122.4292 },
          },
        ],
      },
    ],
  },
];

export const URL = "http://127.0.0.1:3000/api/earthquakes/";
