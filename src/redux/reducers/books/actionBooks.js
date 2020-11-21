let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: ''
}

let actionBooks = (state = initialState, action) => { 
    switch (action.type) {
        case 'BOOKS_ACTION_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'BOOKS_ACTION_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'BOOKS_ACTION_FULFILLED':
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

export default actionBooks
