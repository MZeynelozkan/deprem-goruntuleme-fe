export type Position = [number, number];

export type countriesType = {
  name: string;
  cities: string[];
};

export interface UpdatedCity {
  update: EarthquakeFormInputs[];
  city: string;
}
