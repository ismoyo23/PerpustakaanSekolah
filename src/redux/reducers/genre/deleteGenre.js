let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: ''
}

let deleteGenre = (state = initialState, action) => { 
    switch (action.type) {
        case 'DELETE_GENRE_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'DELETE_GENRE_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'DELETE_GENRE_FULFILLED':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: 'data success'
            }
            default: {
                return state
            }
    }
}

export default deleteGenre