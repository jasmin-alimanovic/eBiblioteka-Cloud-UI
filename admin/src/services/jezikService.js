import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const jeziksURL = `${baseUrl}/jezici`;
const addjezikURL = jeziksURL;
const updatejezikURL = jeziksURL;

export async function getjezike() {
  const res = await axios.get(jeziksURL);
  return res.data;
}

export async function addjezik(jezik) {
  return axios({
    method: "post",
    url: addjezikURL,
    headers: { "Content-Type": "application/json" },
    data: jezik,
  });
}
export async function updatejezik(id, jezik) {
  return axios({
    method: "put",
    url: `${updatejezikURL}/${id}`,
    data: jezik,
    headers: { "Content-Type": "application/json" },
  });
}
