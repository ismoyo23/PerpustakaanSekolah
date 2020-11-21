import axios from "axios";

// ==============================================
// action get data Author
export let booksGet = (data) => ({
  type: "BOOKS_GET",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}books/${data.SearchBooks}`,
  }),
});

// ==============================================
// action Add data Author
export let addData = (data, form) => ({
  type: "PROCESS_BOOKS",
  payload: axios({
    method: data.Method,
    url: data.ConUrl,
    data: form,
  }),
});

// ===============================================
// action delete data author
export let deleteBooks = (data) => ({
  type: "DELETE_BOOKS",
  payload: axios({
    method: "DELETE",
    url: `${data.ConUrl}books/${data.id}`,
  }),
});

/// ===============================================
// action show data books by id
export let showBooks = (data) => ({
  type: "SHOW_BOOKS",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}books/?search=${data.id}&field=id`,
  }),
});
