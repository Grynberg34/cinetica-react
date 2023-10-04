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