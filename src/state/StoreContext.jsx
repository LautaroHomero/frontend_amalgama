import { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();

const initialState = {
  books: {},
  authors: {},
  users: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,
        books: action.payload.books,
        authors: action.payload.authors,
        users: action.payload.users
      };
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
