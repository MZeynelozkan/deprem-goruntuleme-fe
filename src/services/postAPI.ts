/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { URL } from "../constants/constants.ts";

export async function postNewEarthQuakeData(data: any) {
  try {
    const url = `${URL}addcountryandcity`;
    const req = await axios.post(url, data);

    return req.data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function updateNewEarthQuakeData(data: any) {
  try {
    const url = `${URL}`;
    console.log("url", url);
    console.log("data", data);
    const req = await axios.put(url, data);

    return req.data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function deleteRecentEarthquakeById(
  cityId: string,
  earthquakeId: string
) {
  try {
    const url = `${URL}delete/${cityId}/${earthquakeId}`;
    console.log("url", url);
    const req = await axios.delete(url);
    console.log(req.data);
    return req.data;
  } catch (error) {
    console.log("Error:", error);
  }
}
