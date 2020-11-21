import axios from "axios";

export const login = (data) => ({
  type: "LOGIN",
  payload: axios({
    method: "POST",
    url: `${data.env}books/login`,
    data: {
      nik: data.nik,
    },
  }),
});

export let logout = () => {
  return {
    type: "LOGOUT",
  };
};

export let user = (data) => ({
  type: "USER",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}books/absence/get${data.Search}`,
  }),
});
