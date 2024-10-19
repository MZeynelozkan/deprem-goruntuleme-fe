import { z } from "zod";

export const formSchema = z.object({
  cityName: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(50),
  latitude: z.string().min(-90, "Latitude must be between -90 and 90").max(90),
  longitude: z
    .string()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180),
  recentEarthquakes: z.array(
    z.object({
      date: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
      magnitude: z
        .string()
        .min(0)
        .max(10, "Magnitude must be between 0 and 10"),
      depth: z.string().min(0, "Depth must be positive"),
    })
  ),
  countryName: z
    .string()
    .min(2, "Country name must be at least 2 characters")
    .max(50),
});
