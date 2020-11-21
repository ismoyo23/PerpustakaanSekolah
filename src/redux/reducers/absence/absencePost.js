let initialState = {
  isLoading: false,
  isError: false,
  errorMsg: "",
  data: [],
};

let absencePost = (state = initialState, action) => {
  switch (action.type) {
    case "ABSENCE_POST_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ABSENCE_POST_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "ABSENCE_POST_FULFILLED":
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

export default absencePost;
