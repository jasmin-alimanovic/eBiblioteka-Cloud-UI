import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const kategorijasURL = `${baseUrl}/Kategorija`;

export async function getkategorijas() {
  const res = await axios.get(kategorijasURL);
  return res.data;
}

export async function addkategorija(kategorija) {
  axios({
    method: "post",
    url: kategorijasURL,
    headers: { "Content-Type": "application/json" },
    data: kategorija,
  });
}
export async function updatekategorija(id, kategorija) {
  axios({
    method: "put",
    url: `${kategorijasURL}/${id}`,
    data: kategorija,
    headers: "application/json",
  });
}
