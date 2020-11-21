import axios from "axios";

export let borrowGet = (data) => ({
  type: "BORROW_GET",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}books/borrower${data.params}`,
  }),
});

export let borrowAction = (data) => ({
  type: "BORROW_ACTION",
  payload: axios({
    method: "DELETE",
    url: `${data.ConUrl}books/borrower/${data.id}`,
  }),
});
