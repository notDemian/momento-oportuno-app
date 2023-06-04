import React from 'react';

type AuthState = {
  userToken: string | null;
  signIn: () => void;
  signOut: () => void;
  signUp: () => void;
};

const initialAutthState: AuthState = {
  userToken: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
};

export const AuthContext = React.createContext(initialAutthState);
