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

export const GetTextColors = () => async dispatch => {

    var numero_fundo = Math.floor(Math.random() * 4);

    var numero_texto= Math.floor(Math.random() * 4);
  
    var cores_fundo = ["#fae9e5","#f4e0d8","#f4f4f4","#e9e9e9"];
  
    var cores_texto = ["#212020", "#2a2a2a", "#782323", "#530000"];

    var cores = {
        texto : cores_texto[numero_texto],
        fundo: cores_fundo[numero_fundo]
    }

    dispatch({ type: 'SET_TEXT_COLORS', payload: cores });

};

export const GetImgLink = (link, index) => async dispatch => {

    dispatch({ type: 'GET_IMG_LINK', payload: link });
    dispatch({ type: 'GET_IMG_INDEX', payload: index });

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

export const GetSection = (id, page, type) => async dispatch => {

    await api.get(`/front/${type}/${id}/${page}`, {
    }).then(async function(response){

        var section = {
            titulo : response.data.titulo,
            textos: response.data.textos,
            total_pages: response.data.total_pages,
            page: page
        }

        if (type === 'categorias') {
            dispatch({ type: 'GET_CATEGORY', payload: section });
        } else if (type === 'tags') {
            dispatch({ type: 'GET_TAG', payload: section });             
        } else if (type === 'anos') {
            dispatch({ type: 'GET_YEAR', payload: section });
        } else if (type === 'autores') {
            dispatch({ type: 'GET_AUTHOR', payload: section });
        }

    })  
    .catch(function(err){
        console.log(err)
    })

};

export const GetFields = () => async dispatch => {

    await api.get(`/front/pesquisar/campos`, {
    }).then(async function(response){

        dispatch({ type: 'GET_FIELDS', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })

};

export const SelectField = (index) => async dispatch => {

    dispatch({ type: 'GET_SELECTED_FIELD', payload: index});

    dispatch({ type: 'GET_FILTERED', payload: null});

};

export const FilterTerm = (filter, list) => async dispatch => {

    var new_filter = filter.toLowerCase();

    var filtered;
    
    if (list.campo === 'título') {
        filtered = list.items.filter(value => value.titulo.toLowerCase().includes(new_filter))
    } else if (list.campo === 'filme') {
       filtered = list.items.filter(value => value.filme.toLowerCase().includes(new_filter))
    } else if (list.campo === 'diretor') {
        filtered = list.items.filter(value => value.diretor.toLowerCase().includes(new_filter))
    } else if (list.campo === 'categoria') {
       filtered = list.items.filter(value => value.categoria.toLowerCase().includes(new_filter))
    } else if (list.campo === 'tag') {
        filtered = list.items.filter(value => value.tag.toLowerCase().includes(new_filter))
    } else if (list.campo === 'ano') {
        filtered = list.items.filter(value => value.numero.toLowerCase().includes(new_filter))
    } else if (list.campo === 'autor') {
        filtered = list.items.filter(value => value.nome.toLowerCase().includes(new_filter))
    }

    dispatch({ type: 'GET_FILTERED', payload: filtered});

};

export const RemoveField = (field, search) => async dispatch => {

    if (field === 'título') {
        dispatch({ type: 'REMOVE_TÍTULO', payload: null});
    } else if (field === 'filme') {
        dispatch({ type: 'REMOVE_FILME', payload: null});
    } else if (field === 'diretor') {
        dispatch({ type: 'REMOVE_DIRETOR', payload: null});
    } else if (field === 'ano') {
        dispatch({ type: 'REMOVE_ANO', payload: null});
    } else if (field === 'autor') {
        dispatch({ type: 'REMOVE_AUTOR', payload: []});
    } else if (field === 'categoria') {
        dispatch({ type: 'REMOVE_CATEGORIA', payload: []});
    } else if (field === 'tag') {
        dispatch({ type: 'REMOVE_TAG', payload: []});
    } 

    if (field === 'categoria' || field === 'tag' || field === 'autor') {
        search[field] = [];
    } else {
        search[field] = null;
    }

    dispatch({ type: 'GET_TEXT', payload: null});

    if (!(search.título === null && search.filme === null && search.diretor === null && search.autor.length === 0 && search.ano === null && search.categoria.length === 0 && search.tag.length === 0)) {
        await api.post('/front/pesquisar', search).then(function(response){
            dispatch({ type: 'SET_RESULTS_PAGE', payload: 0 });
            dispatch({ type: 'SHOW_RESULTS', payload: response.data });
        })  
        .catch(function(err){
            console.log(err)
        })
    } else {
        dispatch({ type: 'SET_RESULTS_PAGE', payload: null });
        dispatch({ type: 'SHOW_RESULTS', payload: null });
    }

    dispatch({ type: 'GET_FILTERED', payload: null});

};

export const SearchTexts = (term, field, search) => async dispatch => {

    if (field === 'categoria' || field === 'tag' || field === 'autor') {

        if (!search[field].includes(term)) {
            search[field].push(term);
        }
        search.título = null;
        dispatch({ type: 'GET_TEXT', payload: null});
    }
    else if (field === 'título') {
        search = {
            título: term,
            filme: null,
            diretor:null,
            categoria: [],
            tag: [],
            ano: null,
            autor: []
        }

        dispatch({ type: 'GET_TEXT', payload: null});
    }
    else {
        search[field] = term;
        search.título = null;

        dispatch({ type: 'GET_TEXT', payload: null});
    }

    dispatch({ type: 'GET_FILTERED', payload: null});

    dispatch({ type: 'SEARCH', payload: search});

    await api.post('/front/pesquisar', search).then(function(response){
        dispatch({ type: 'SET_RESULTS_PAGE', payload: 0 });
        dispatch({ type: 'SHOW_RESULTS', payload: response.data });
    })  
    .catch(function(err){
        console.log(err)
    })
    
};

export const SetFontSize = (font) => async dispatch => {

    dispatch({ type: 'SET_FONT_SIZE', payload: font});
};

export const OpenCloseMenu = (value) => async dispatch => {

    dispatch({ type: 'OPEN_CLOSE_MENU', payload: value });
};

export const CheckMobile = (value) => async dispatch => {

    dispatch({ type: 'CHECK_MOBILE', payload: value });
};

export const SetResultsPage = (page) => async dispatch => {

    dispatch({ type: 'SET_RESULTS_PAGE', payload: page });
};

export const ResetResults = () => async dispatch => {

    dispatch({ type: 'SET_RESULTS_PAGE', payload: null });
    dispatch({ type: 'SHOW_RESULTS', payload: null });
    dispatch({ type: 'REMOVE_TÍTULO', payload: null});
    dispatch({ type: 'REMOVE_FILME', payload: null});
    dispatch({ type: 'REMOVE_DIRETOR', payload: null});
    dispatch({ type: 'REMOVE_ANO', payload: null});
    dispatch({ type: 'REMOVE_AUTOR', payload: []});
    dispatch({ type: 'REMOVE_CATEGORIA', payload: []});
    dispatch({ type: 'REMOVE_TAG', payload: []});
    
};