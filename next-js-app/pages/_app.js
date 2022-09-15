import {SessionProvider} from "next-auth/react";
import {MoralisProvider} from "react-moralis";
import "../styles/globals.css";

function MyApp({Component, pageProps}) {
    return (
        <MoralisProvider
            serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
            appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
        >
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </MoralisProvider>
    );
}

export default MyApp;
