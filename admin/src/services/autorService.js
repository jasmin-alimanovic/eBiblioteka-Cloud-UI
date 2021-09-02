import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const autorsURL = `${baseUrl}/autori`;

export async function getautors() {
  const res = await axios.get(autorsURL);
  return res.data;
}

export async function addautor(autor) {
  axios({
    method: "post",
    url: autorsURL,
    headers: { "Content-Type": "application/json" },
    data: autor,
  });
}
export async function updateautor(id, autor) {
  axios({
    method: "put",
    url: `${autorsURL}/${id}`,
    data: autor,
    headers: "application/json",
  });
}
