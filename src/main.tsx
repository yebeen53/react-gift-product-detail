import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import theme from '@/data/theme';
import App from '@/App.tsx';
import GlobalStyles from '@/components/GlobalStyles';
import '@fontsource/pretendard/400.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{staleTime:1000*60*5,gcTime: 1000 * 60 * 5,refetchOnWindowFocus: false,retry: 1,
    },
    }
  }
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
