import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const booksURL = `${baseUrl}/books`;
const addBookURL = `${booksURL}/add-book`;
const updateBookURL = `${booksURL}/update`;

export async function getbooks(
  sort,
  q,
  page_index,
  page_size,
  kategorija = null
) {
  // const url = `${booksURL}?sort=${sort}&q=${q}&page_index=${index}&page_size=${size}`;
  const res = await axios.get(booksURL, {
    params: {
      sort,
      q,
      page_index,
      page_size,
      kategorija,
    },
  });
  return res.data;
}
export async function getbookbyid(id) {
  // const url = `${booksURL}?sort=${sort}&q=${q}&page_index=${index}&page_size=${size}`;
  const res = await axios.get(`${booksURL}/${id}`);
  return res.data;
}
export async function addBook(Book) {
  return axios({
    method: "post",
    url: addBookURL,
    headers: { "Content-Type": "application/json" },
    data: Book,
  });
}
export async function updateBook(id, Book) {
  return axios({
    method: "put",
    url: `${updateBookURL}/${id}`,
    data: Book,
    headers: { "Content-Type": "application/json" },
  });
}
