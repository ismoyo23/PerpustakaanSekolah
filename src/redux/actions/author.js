import axios from 'axios'

// ==============================================
// action get data Author
export let authorGet = (data) => ({
    type: 'RECEIVE_DATA',
    payload:axios({
        method: 'GET',
        url: `${data.ConUrl}books/author${data.Search}`
    })
})

// ==============================================
// action Add data Author
export let addData = (data) => ({
    type: 'PROCESS_DATA',
    payload: axios({
        method: data.Method,
        url: data.ConUrl,
        data: {
            'name_author': data.name_author,
            'profile_author': data.profile_author
        }
    })
})

// ===============================================
// action delete data author
export let removeData = (data) => ({
    type: 'DELETE_DATA',
    payload: axios({
        method: 'DELETE',
        url: `${data.ConUrl}books/author/${data.id}`
    })
})

export let showID = (data) => ({
    type: 'SHOW_ID',
    payload: axios({
        methot: 'GET',
        url: `${data.ConUrl}books/author?field=id_author&search=${data.id}`
    }) 
})