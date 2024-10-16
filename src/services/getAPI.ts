import { URL } from "@/constants/constants";
import axios from "axios";

export async function getAllEarthQuakes() {
  try {
    const url = `${URL}all`;
    console.log("Requesting URL:", url); // Log the URL
    const req = await axios.get(url);
    console.log(req.data);
    return req.data;
  } catch (error) {
    console.log("Error:", error);
  }
}
