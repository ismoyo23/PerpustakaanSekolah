let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: ''
}

let deleteData = (state = initialState, action) => { 
    switch (action.type) {
        case 'DELETE_DATA_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'DELETE_DATA_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'DELETE_DATA_FULFILLED':
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

export default deleteData