import { URL } from "@/constants/constants";
import { setScaleDatas } from "@/slices/dataSlice";
import store from "@/store/store";
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

export async function getEarthquakesByScales(scale: string | undefined) {
  try {
    const url = `${URL}scale/${scale}`;
    const req = await axios.get(url);

    store.dispatch(setScaleDatas(req.data));
    console.log("req.data", req.data);

    return req.data;
  } catch (error) {
    console.log("Error:", error);
  }
}
