import {useContext} from 'react';
import {ContextValue} from '../components';

export const useContextValues = () => {
  const valuesContext = useContext(ContextValue);

  if (!valuesContext) {
    throw new Error('useContextValues must be used within a ContextValue!');
  }

  return valuesContext;
};
