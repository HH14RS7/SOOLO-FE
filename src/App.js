import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStyle } from './shared/GlobalStyle';
import Router from './shared/Router';
import { RecoilRoot } from 'recoil';
const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
