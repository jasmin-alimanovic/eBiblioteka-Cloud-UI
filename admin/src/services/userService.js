import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const usersURL = `${baseUrl}/users`;
const addUserURL = `${usersURL}/add-user`;
const updateUserURL = `${usersURL}/update`;
const addFirebaseUser = `${usersURL}/add-user-firebase`;

export async function getUsers(sort, q, index, size) {
  const res = await axios.get(`${usersURL}`, {
    params: {
      sort: sort,
      q: q,
      page_index: index,
      page_size: size,
    },
  });
  return res.data;
}

export async function getNewUsers(sort, q, index, size) {
  const res = await axios.get(`${usersURL}/new-users`, {
    params: {
      sort: sort,
      q: q,
      page_index: index,
      page_size: size,
    },
  });
  return res.data;
}

export async function addUser(user) {
  return axios({
    method: "post",
    url: addUserURL,
    headers: { "Content-Type": "application/json" },
    data: user,
  });
}
export async function updateUser(id, user) {
  return axios({
    method: "put",
    url: `${updateUserURL}/${id}`,
    data: user,
    headers: { "Content-Type": "application/json" },
  });
}
export async function getUserByFID(fid) {
  const user = await axios.get(`${usersURL}/fid/${fid}`);
  return user?.data;
}
export async function getUserByEmail(email) {
  const user = await axios.get(`${usersURL}/email/${email}`);
  return user?.data;
}
export async function getUserById(id) {
  const user = await axios.get(`${usersURL}/${id}`);
  return user?.data;
}
export async function addUserToFirebase(user) {
  return axios({
    method: "post",
    url: addFirebaseUser,
    headers: { "Content-Type": "application/json" },
    data: user,
  });
}

export async function getUserCountByDate(days) {
  const user = await axios.get(`${usersURL}/group-by-date`, {
    params: { days },
  });
  return user?.data;
}
