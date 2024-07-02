import "@/styles/globals.css";
import { VT323 } from "next/font/google";
import { store } from "@/store";
import { Provider } from "react-redux";

const inter = VT323({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
       <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
