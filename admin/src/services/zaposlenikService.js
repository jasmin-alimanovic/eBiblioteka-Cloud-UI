import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const zaposleniciURL = `${baseUrl}/zaposlenici`;
const addZaposlenikURL = `${zaposleniciURL}/add-zaposlenik`;
const updateZaposlenikURL = `${zaposleniciURL}/update`;

export async function getZaposlenike(sort, q, index, size) {
  const res = await axios.get(zaposleniciURL, {
    params: {
      sort: sort,
      q: q,
      page_index: index,
      page_size: size,
    },
  });
  return res.data;
}

export async function getZaposlenikByFID(fid) {
  const user = await axios.get(`${zaposleniciURL}/fid/${fid}`);
  return user?.data;
}

export async function addZaposlenik(user) {
  return axios({
    method: "post",
    url: addZaposlenikURL,
    headers: { "Content-Type": "application/json" },
    data: user,
  });
}
export async function updateZaposlenik(id, user) {
  console.log(id, user);
  return axios({
    method: "put",
    url: `${updateZaposlenikURL}/${id}`,
    data: user,
    headers: { "Content-Type": "application/json" },
  });
}
