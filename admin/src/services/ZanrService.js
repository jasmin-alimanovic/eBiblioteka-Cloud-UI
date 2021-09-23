import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const zanrURL = `${baseUrl}/Zanr`;

export async function getzanrs() {
  const res = await axios.get(zanrURL);
  return res.data;
}

export async function addzanr(zanr) {
  return axios({
    method: "post",
    url: zanrURL,
    headers: { "Content-Type": "application/json" },
    data: zanr,
  });
}
export async function updatezanr(id, zanr) {
  return axios({
    method: "put",
    url: `${zanrURL}/${id}`,
    data: zanr,
    headers: { "Content-Type": "application/json" },
  });
}
