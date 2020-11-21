let initialState = {
  isLoading: false,
  isError: false,
  errorMsg: "",
  data: [],
};

let absenceGet = (state = initialState, action) => {
  switch (action.type) {
    case "ABSENCE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ABSENCE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "ABSENCE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
      };
    default: {
      return state;
    }
  }
};

export default absenceGet;
