// in reducer.js
const initialState = {
    clients: []
};
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CLIENT':
        return {
          ...state,
          clients: [...state.clients, action.payload]
        };
      default:
        return state;
    }
}
export default reducer;  