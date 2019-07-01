import axios from "axios";
import { GET_DATA, DATA_ERROR } from "./types";

export const submit = searchData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ searchData });

  try {
    const res = await axios.post("http://localhost:1337/tweet", body, config);

    dispatch({
      type: DATA_ERROR,
      payload: res.data
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: DATA_ERROR
    });
  }
};

export const loadData = twObj => async dispatch => {
  console.log("ACTION === === === == ==",twObj);
  
  try {
    dispatch({
      type: GET_DATA,
      payload: twObj
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DATA_ERROR
    });
  }
};
