let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

let showBooks = (state = initialState, action) => { 
    switch (action.type) {
        case 'SHOW_BOOKS_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'SHOW_BOOKS_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'SHOW_BOOKS_FULFILLED':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data
            }
            default: {
                return state
            }
    }
}

export default showBooks