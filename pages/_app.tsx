import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
// import { ChakraProvider } from '@chakra-ui/react';
// import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      {/* <ChakraProvider>
        <NextNProgress
          color='#2B6CB0'
          startPosition={0.3}
          stopDelayMs={200}
          height={3.5}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </ChakraProvider> */}
    </QueryClientProvider>
  );
}

export default MyApp;
