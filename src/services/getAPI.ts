import { URL } from "@/constants/constants";
import axios from "axios";

export async function getAllEarthQuakes() {
  try {
    const url = `${URL}all`;
    const req = await axios.get(url);

    return req.data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function getCitiesWithCountries(coutryName: string) {
  try {
    const url = `${URL}country/${coutryName}`;

    const req = await axios.get(url);
    return req.data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function getCountries() {
  try {
    const url = `${URL}countries`;
    const req = await axios.get(url);
    return req.data;
  } catch (error) {
    console.log("Error:", error);
  }
}
