let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

let genreGet = (state = initialState, action) => { 
    switch (action.type) {
        case 'GENRE_GET_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'GENRE_GET_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'GENRE_GET_FULFILLED':
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

export default genreGet