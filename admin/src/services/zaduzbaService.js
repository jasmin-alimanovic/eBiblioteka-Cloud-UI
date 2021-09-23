import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const ZaduzbasURL = `${baseUrl}/zaduzbe`;
const addZaduzbaURL = `${ZaduzbasURL}/add-Zaduzba`;
const updateZaduzbaURL = `${ZaduzbasURL}/update`;

export async function getZaduzbe(sort, q, index, size) {
  const res = await axios.get(
    `${ZaduzbasURL}?sort=${sort}&q=${q}&page_index=${index}&page_size=${size}`
  );
  return res.data;
}

export async function addZaduzba(Zaduzba) {
  return axios({
    method: "post",
    url: addZaduzbaURL,
    headers: { "Content-Type": "application/json" },
    data: Zaduzba,
  });
}
export async function updateZaduzba(id, Zaduzba) {
  return axios({
    method: "put",
    url: `${updateZaduzbaURL}/${id}`,
    data: Zaduzba,
    headers: { "Content-Type": "application/json" },
  });
}
export async function getZaduzbeCountByDate(days) {
  const count = await axios.get(`${ZaduzbasURL}/group-by-date`, {
    params: { days },
  });
  return count?.data;
}
