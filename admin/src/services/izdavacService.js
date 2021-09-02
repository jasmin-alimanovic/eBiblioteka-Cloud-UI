import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const izdavacsURL = `${baseUrl}/izdavaci`;
const addizdavacURL = `${izdavacsURL}/add-Izdavac`;
const updateizdavacURL = `${izdavacsURL}/update`;

export async function getizdavace() {
  const res = await axios.get(izdavacsURL);
  return res.data;
}

export async function addizdavac(izdavac) {
  axios({
    method: "post",
    url: addizdavacURL,
    headers: { "Content-Type": "application/json" },
    data: izdavac,
  });
}
export async function updateizdavac(id, izdavac) {
  axios({
    method: "put",
    url: `${updateizdavacURL}/${id}`,
    data: izdavac,
    headers: "application/json",
  });
}
