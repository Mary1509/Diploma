const initialState = {
  isLogged: false,
  token: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogged: true,
        token: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        isLogged: false,
        token: ''
      };
    default:
      return state;
  }
};
