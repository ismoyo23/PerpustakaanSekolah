let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: {}
}

let borrowAction = (state = initialState, action) => { 
    switch (action.type) {
        case 'BORROW_ACTION_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'BORROW_ACTION_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'BORROW_ACTION_FULFILLED':
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

export default borrowAction