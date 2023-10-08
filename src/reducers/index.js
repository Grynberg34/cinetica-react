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

export default combineReducers({
  banner: getBannerTextsReducer,
  recentes: getRecentTextsReducer,
  destaques: getDestaquesTextsReducer,
  biblioteca: getBibliotecaReducer,
  texto: getTextReducer
});
