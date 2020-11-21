let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

let borrowGet = (state = initialState, action) => { 
    switch (action.type) {
        case 'BORROW_GET_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'BORROW_GET_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'BORROW_GET_FULFILLED':
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

export default borrowGet