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

export default combineReducers({
  
    banner: getBannerTextsReducer,
    recentes: getRecentTextsReducer
});
