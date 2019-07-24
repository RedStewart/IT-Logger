import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR
} from './types';
const axios = require('axios');

// Get all techs from the server
export const getTechs = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get('/api/techs');

    dispatch({
      type: GET_TECHS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.msg
    });
  }
};

// Add technician to server
export const addTech = tech => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    setLoading();

    const res = await axios.post('/api/techs', tech, config);

    dispatch({
      type: ADD_TECH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.msg
    });
  }
};

// Delete tech from the server
export const deleteTech = id => async dispatch => {
  try {
    setLoading();

    await axios.delete(`/api/techs/${id}`);

    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.msg
    });
  }
};

//  Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
