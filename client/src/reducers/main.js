import { GET_DATA, DATA_ERROR } from "../actions/types";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case GET_DATA:
      return { ...state, data: [payload, ...state.data] };

    case DATA_ERROR:
      return { ...state, data: [] };

    default:
      return state;
  }
}
