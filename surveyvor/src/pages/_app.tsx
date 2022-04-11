import "../styles/globals.css";
import SocketsProvider from "../context/socket.context";
  // @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
    <SocketsProvider>
      <Component {...pageProps} />
    </SocketsProvider>
  );
}

export default MyApp;
