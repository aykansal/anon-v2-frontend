import '../styles/globals.css';
import Provider from '../components/Provider';

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
