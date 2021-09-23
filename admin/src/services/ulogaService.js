import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const ulogasURL = `${baseUrl}/uloge`;

export async function getulogas() {
  const res = await axios.get(ulogasURL);
  return res.data;
}

export async function adduloga(uloga) {
  return axios({
    method: "post",
    url: ulogasURL,
    headers: { "Content-Type": "application/json" },
    data: uloga,
  });
}
export async function updateuloga(id, uloga) {
  return axios({
    method: "put",
    url: `${ulogasURL}/${id}`,
    data: uloga,
    headers: "application/json",
  });
}
