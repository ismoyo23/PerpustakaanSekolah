let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

let booksGet = (state = initialState, action) => { 
    switch (action.type) {
        case 'BOOKS_GET_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'BOOKS_GET_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'BOOKS_GET_FULFILLED':
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



export default booksGet