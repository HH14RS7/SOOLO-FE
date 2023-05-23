import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from './shared/GlobalStyle';
import Router from './shared/Router';

const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
