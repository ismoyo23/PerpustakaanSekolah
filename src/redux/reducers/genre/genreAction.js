let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: ''
}

let genreAction = (state = initialState, action) => { 
    switch (action.type) {
        case 'GENRE_ACTION_PENDING':
        return{
            ...state,
            isLoading: true,
            isError: false
        }
        case 'GENRE_ACTION_REJECTED':
        return{
            ...state,
            isLoading: false,
            isError: true
        }
        case 'GENRE_ACTION_FULFILLED':
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

export default genreAction