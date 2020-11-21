let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

let authorGet = (state = initialState, action) => { 
    switch (action.type) {
        case 'RECEIVE_DATA_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'RECEIVE_DATA_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'RECEIVE_DATA_FULFILLED':
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

export default authorGet