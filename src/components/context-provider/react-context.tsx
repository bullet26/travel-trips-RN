import {createContext, ReactNode, useMemo, useState, useEffect} from 'react';
import {checkTokenValidity} from '../../api';

type ValueType = {
  isAuth: boolean;
};

type ActionType = {
  setAuthStatus: (value: boolean) => void;
};

export const ContextValue = createContext<ValueType | null>(null);
export const ContextActions = createContext<ActionType | null>(null);

export const ContextProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [isAuth, setAuth] = useState(false);

  const value = useMemo(() => ({isAuth}), [isAuth]);

  const setAuthStatus = (value: boolean) => {
    setAuth(value);
  };

  const actions = useMemo(
    () => ({
      setAuthStatus,
    }),
    [setAuthStatus],
  );

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await checkTokenValidity();

      setAuth(isValid);
    };

    checkAuth();
  }, []);

  return (
    <ContextValue.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </ContextValue.Provider>
  );
};
