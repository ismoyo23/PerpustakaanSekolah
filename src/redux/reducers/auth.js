import Swal from 'sweetalert2'
const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: {}
}

let auth = (state = initialState, action) =>{
    switch (action.type) {
        case "LOGIN_PENDING":
        return {
            ...state,
            isLoading: true,
            isError: false
        }
        case "LOGIN_REJECTED":
        return {
            ...state,
            isLoading: false,
            isError: true,
            errorMsg: 'Data Rejected'
        }
        case "LOGIN_FULFILLED":
            
        return {
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload.data.data[0]
        }
        case "LOGOUT":
            
        return {
            ...state,
            isLoading: false,
            isError: false,
            data: {}
        }
        default: {
            return state
        }
    }
}

export default auth