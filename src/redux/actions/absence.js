import axios from "axios";

// ==============================================
// action get data Author
export let absenceGet = (data) => ({
  type: "ABSENCE",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}books/absence/get${data.Search}`,
  }),
});

export let absencePost = (data) => ({
  type: "ABSENCE_POST",
  payload: axios({
    method: "POST",
    url: `${data.ConUrl}books/absence/add`,
    data: {
      nik: data.nis,
      date: data.date,
     
    },
  }),
});
