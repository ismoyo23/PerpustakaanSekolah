let initialState = {
  isLoading: false,
  isError: false,
  errorMsg: "",
  data: [],
};

let user = (state = initialState, action) => {
  switch (action.type) {
    case "USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "USER_FULFILLED":
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

export default user;
