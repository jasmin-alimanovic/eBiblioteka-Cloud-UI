import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const usersURL = `${baseUrl}/users`;
const addUserURL = `${usersURL}/add-user`;
const updateUserURL = `${usersURL}/update`;

export async function getUsers(sort, q, index, size) {
  const res = await axios.get(
    `${usersURL}??sort=${sort}&q=${q}&page_index=${index}&page_size=${size}`
  );
  return res.data;
}

export async function addUser(user) {
  axios({
    method: "post",
    url: addUserURL,
    headers: { "Content-Type": "application/json" },
    data: user,
  });
}
export async function updateUser(id, user) {
  axios({
    method: "post",
    url: `${updateUserURL}/${id}`,
    data: user,
    headers: "application/json",
  });
}
