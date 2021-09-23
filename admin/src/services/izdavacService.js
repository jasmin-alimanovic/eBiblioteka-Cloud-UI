import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const izdavacsURL = `${baseUrl}/izdavaci`;
const addizdavacURL = `${izdavacsURL}/add-Izdavac`;
const updateizdavacURL = `${izdavacsURL}/update`;

export async function getizdavace(sort, q, index, size) {
  const res = await axios.get(izdavacsURL, {
    params: {
      sort: sort,
      q: q,
      page_index: index,
      page_size: size,
    },
  });
  console.log(res.data);
  return res.data;
}

export async function addizdavac(izdavac) {
  return axios({
    method: "post",
    url: addizdavacURL,
    headers: { "Content-Type": "application/json" },
    data: izdavac,
  });
}
export async function updateizdavac(id, izdavac) {
  return axios({
    method: "put",
    url: `${updateizdavacURL}/${id}`,
    data: izdavac,
    headers: { "Content-Type": "application/json" },
  });
}
