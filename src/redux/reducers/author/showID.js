import { showData } from "../../actions/author"

let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: ''
}

let showID = (state = initialState, action) => { 
    switch (action.type) {
        case 'SHOW_ID_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'SHOW_ID_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'SHOW_ID_FULFILLED':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: 'delete success'
            }
            default: {
                return state
            }
    }
}

export default showID