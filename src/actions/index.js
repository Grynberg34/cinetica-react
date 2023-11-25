import api from '../api/api';

export const GetBannerTexts = () => async dispatch => {

    await api.get('/front/banner', {
    }).then(async function(response){
        dispatch({ type: 'GET_BANNER', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetRecentTexts = () => async dispatch => {

    await api.get('/front/recentes', {
    }).then(async function(response){
        dispatch({ type: 'GET_RECENT', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetDestaqueTexts = () => async dispatch => {

    await api.get('/front/destaques', {
    }).then(async function(response){
        dispatch({ type: 'GET_DESTAQUES', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetBiblioteca = () => async dispatch => {

    await api.get('/front/biblioteca', {
    }).then(async function(response){
        dispatch({ type: 'GET_BIBLIOTECA', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetText = (id) => async dispatch => {

    await api.get(`/front/texto/${id}`, {
    }).then(async function(response){
        dispatch({ type: 'GET_TEXT', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetImgLink = (link) => async dispatch => {

    dispatch({ type: 'GET_IMG_LINK', payload: link });

};

export const GetCategories = () => async dispatch => {

    await api.get(`/front/categorias`, {
    }).then(async function(response){
        dispatch({ type: 'GET_CATEGORIES', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetTags = () => async dispatch => {

    await api.get(`/front/tags`, {
    }).then(async function(response){

        for (let i = response.data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [response.data[i], response.data[j]] = [response.data[j], response.data[i]];
        }

        dispatch({ type: 'GET_TAGS', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const SearchTags = (filter, list) => async dispatch => {

    var new_filter = filter.toLowerCase();

    var filtered_list_tags = list.filter(value => value.tag.toLowerCase().includes(new_filter))

    dispatch({ type: 'FILTER_TAGS', payload: filtered_list_tags});

};

export const GetAuthors = () => async dispatch => {

    await api.get(`/front/autores`, {
    }).then(async function(response){
        dispatch({ type: 'GET_AUTHORS', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetYears = () => async dispatch => {

    await api.get(`/front/anos`, {
    }).then(async function(response){
        dispatch({ type: 'GET_YEARS', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetCategory = (id, page) => async dispatch => {

    await api.get(`/front/categorias/${id}/${page}`, {
    }).then(async function(response){

        var categoria = {
            titulo : response.data.titulo,
            textos: response.data.textos,
            total_pages: response.data.total_pages,
            page: page

        }

        dispatch({ type: 'GET_CATEGORY', payload: categoria });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetTag = (id, page) => async dispatch => {

    await api.get(`/front/tags/${id}/${page}`, {
    }).then(async function(response){

        var tag = {
            titulo : response.data.titulo,
            textos: response.data.textos,
            total_pages: response.data.total_pages,
            page: page

        }

        dispatch({ type: 'GET_TAG', payload: tag });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetAuthor = (id, page) => async dispatch => {

    await api.get(`/front/autores/${id}/${page}`, {
    }).then(async function(response){

        var autor = {
            titulo : response.data.titulo,
            textos: response.data.textos,
            total_pages: response.data.total_pages,
            page: page

        }

        dispatch({ type: 'GET_AUTHOR', payload: autor });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetAno = (id, page) => async dispatch => {

    await api.get(`/front/anos/${id}/${page}`, {
    }).then(async function(response){

        var ano = {
            titulo : response.data.titulo,
            textos: response.data.textos,
            total_pages: response.data.total_pages,
            page: page

        }

        dispatch({ type: 'GET_YEAR', payload: ano });
    })  
    .catch(function(err){
        console.log(err)
    })

};