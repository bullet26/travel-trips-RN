import {createContext, ReactNode, useMemo, useState, useEffect} from 'react';
import {checkTokenValidity} from '../../api';

type sourceMovePlaceType = {
  placeId: number;
  sourceType: 'up' | 'td' | 'wl' | 'searchResult';
  sourceId: number | null;
};

type ValueType = {
  isAuth: boolean;
  sourceMovePlaceData: sourceMovePlaceType | null;
};

type ActionType = {
  setAuthStatus: (value: boolean) => void;
  setSourceMovePlaceData: (value: sourceMovePlaceType | null) => void;
};

export const ContextValue = createContext<ValueType | null>(null);
export const ContextActions = createContext<ActionType | null>(null);

export const ContextProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [isAuth, setAuth] = useState(false);
  const [sourceMovePlaceData, setSourceMovePlace] =
    useState<sourceMovePlaceType | null>(null);

  const value = useMemo(
    () => ({isAuth, sourceMovePlaceData}),
    [isAuth, sourceMovePlaceData],
  );

  const setAuthStatus = (value: boolean) => {
    setAuth(value);
  };

  const setSourceMovePlaceData = (value: sourceMovePlaceType | null) => {
    setSourceMovePlace(value);
  };

  const actions = useMemo(
    () => ({
      setAuthStatus,
      setSourceMovePlaceData,
    }),
    [setAuthStatus, setSourceMovePlaceData],
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
