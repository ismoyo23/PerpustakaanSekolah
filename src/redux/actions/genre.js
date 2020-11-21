import axios from 'axios'

// ==============================================
// action get data genre
export let genreGet = (data) => ({
    type: 'GENRE_GET',
    payload: axios({
        method: 'GET',
        url: `${data.ConUrl}books/genre${data.Search}`
    })
})

// ==============================================
// action Add data genre
export let actionGenre = (data) => ({
    type: 'GENRE_ACTION',
    payload: axios({
        method: data.Method,
        url: data.ConUrl,
        data: {
            'name_genre': data.name_genre
        }
    })
})

// ===============================================
// action delete data genre
export let deleteGenre = (data) => ({
    type: 'DELETE_GENRE',
    payload: axios({
        method: 'DELETE',
        url: `${data.ConUrl}books/genre/${data.id}`
    })
})

// ===============================================
// action show data by id
export let showGenre = (data) => ({
    type: 'SHOW_GENRE',
    payload: axios({
        method: 'GET',
        url: `${data.ConUrl}books/genre/?field=id_genre&search=${data.id}`
    })
})