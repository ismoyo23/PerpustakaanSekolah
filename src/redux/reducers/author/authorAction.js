let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: {}
}

let authorGet = (state = initialState, action) => { 
    switch (action.type) {
        case 'PROCESS_DATA_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'PROCESS_DATA_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'PROCESS_DATA_FULFILLED':
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