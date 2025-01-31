import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {TabNavigation} from './src/routes';
import {Provider, DARK_MODE_THEME} from './src/theme';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider value={DARK_MODE_THEME}>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
