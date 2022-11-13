import { createContext, useReducer } from 'react';

import PropTypes from 'prop-types';

import { PATH_AUTH } from '../routes/paths';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const handlers = {
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    initialState,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: 'auth',
  login: () => Promise.resolve(),
  logout: () => Promise.reject(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (userId, fName, lName, phone) => {
    const user = {
      userId,
      fName,
      lName,
      phone,
    };

    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  };

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'register',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
