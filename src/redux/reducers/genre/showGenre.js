import { showData } from "../../actions/author"

let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

let showGenre = (state = initialState, action) => { 
    switch (action.type) {
        case 'SHOW_GENRE_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'SHOW_GENRE_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'SHOW_GENRE_FULFILLED':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: action
            }
            default: {
                return state
            }
    }
}

export default showGenre