import React, {useState} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {QueryClient, QueryClientProvider} from 'react-query';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3105';

function App() {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppInner />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
