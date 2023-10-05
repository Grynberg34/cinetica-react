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