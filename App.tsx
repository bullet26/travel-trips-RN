import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {TabNavigation} from './src/routes';
import {Provider, DARK_MODE_THEME} from './src/theme';
import {handleDeepLink} from './src/api';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({url});
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
