import { combineReducers } from 'redux';

const getBannerTextsReducer = (banner = null, action) => {
    if (action.type === 'GET_BANNER') {
  
      return action.payload;
      
    }
    
    return banner;
};

const getRecentTextsReducer = (recentes = null, action) => {
  if (action.type === 'GET_RECENT') {

    return action.payload;
    
  }
  
  return recentes;
};

const getDestaquesTextsReducer = (destaques = null, action) => {
  if (action.type === 'GET_DESTAQUES') {

    return action.payload;
    
  }
  
  return destaques;
};

const getBibliotecaReducer = (biblioteca = null, action) => {
  if (action.type === 'GET_BIBLIOTECA') {

    return action.payload;
    
  }
  
  return biblioteca;
};

const getTextReducer = (texto = null, action) => {
  if (action.type === 'GET_TEXT') {

    return action.payload;
    
  }
  
  return texto;
};

const getImgLinkReducer = (link = null, action) => {
  if (action.type === 'GET_IMG_LINK') {

    return action.payload;
    
  }
  
  return link;
};

const getImgIndexReducer = (index = null, action) => {
  if (action.type === 'GET_IMG_INDEX') {

    return action.payload;
    
  }
  
  return index;
};

const getCategoriesReducer = (categorias = null, action) => {
  if (action.type === 'GET_CATEGORIES') {

    return action.payload;
    
  }
  
  return categorias;
};


const getTagsReducer = (tags = null, action) => {
  switch(action.type){
    case 'GET_TAGS':
      return {
        ...tags,
        all: action.payload,
        filter: action.payload
      };
    case 'FILTER_TAGS':
      return {
        ...tags,
        filter: action.payload
      };
    default:
      return tags;
    }
};

const getAuthorsReducer = (autores = null, action) => {
  if (action.type === 'GET_AUTHORS') {

    return action.payload;
    
  }
  
  return autores;
};

const getYearsReducer = (anos = null, action) => {
  if (action.type === 'GET_YEARS') {

    return action.payload;
    
  }
  
  return anos;
};

const getCategoryReducer = (categoria = null, action) => {
  if (action.type === 'GET_CATEGORY') {

    return action.payload;
    
  }
  
  return categoria;
};

const getTagReducer = (tag = null, action) => {
  if (action.type === 'GET_TAG') {

    return action.payload;
    
  }
  
  return tag;
};

const getAuthorReducer = (autor = null, action) => {
  if (action.type === 'GET_AUTHOR') {

    return action.payload;
    
  }
  
  return autor;
};

const getAnoReducer = (ano = null, action) => {
  if (action.type === 'GET_YEAR') {

    return action.payload;
    
  }
  
  return ano;
};

const getFieldsReducer = (pesquisa = null, action) => {
  switch(action.type){
    case 'GET_FIELDS':
      return action.payload;
    case 'GET_SELECTED_FIELD':
      return {
        ...pesquisa,
        active: action.payload
      };
    default:
      return pesquisa;
    }
};

const getFilteredReducer = (filter = null, action) => {
  if (action.type === 'GET_FILTERED') {

    return action.payload;
    
  }
  
  return filter;
};

const searchReducer = (search = {título: null, filme: null, categoria: [], tag: [], ano: null, autor: []}, action) => {
  switch(action.type){
    case 'SEARCH':
      return action.payload;
      case 'REMOVE_TÍTULO':
        return {
          ...search,
          título: action.payload
        }
      case 'REMOVE_FILME':
        return {
          ...search,
          filme: action.payload
        }
      case 'REMOVE_ANO':
        return {
          ...search,
          ano: action.payload
        }
      case 'REMOVE_AUTOR':
        return {
          ...search,
          autor: action.payload
        }
      case 'REMOVE_CATEGORIA':
        return {
          ...search,
          categoria: action.payload
        }
      case 'REMOVE_TAG':
        return {
          ...search,
          tag: action.payload
        }
    default:
      return search;
    }
};

const getResultsReducer = (resultados = null, action) => {
  if (action.type === 'SHOW_RESULTS') {

    return action.payload;
    
  }
  
  return resultados;
};

export default combineReducers({
  banner: getBannerTextsReducer,
  recentes: getRecentTextsReducer,
  destaques: getDestaquesTextsReducer,
  biblioteca: getBibliotecaReducer,
  texto: getTextReducer,
  link: getImgLinkReducer,
  index: getImgIndexReducer,
  categorias: getCategoriesReducer,
  tags: getTagsReducer,
  autores: getAuthorsReducer,
  anos: getYearsReducer,
  categoria: getCategoryReducer,
  tag: getTagReducer,
  autor: getAuthorReducer,
  ano: getAnoReducer,
  pesquisa: getFieldsReducer,
  filter: getFilteredReducer,
  search: searchReducer,
  resultados: getResultsReducer,
});
