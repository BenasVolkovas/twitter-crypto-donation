import {SessionProvider} from "next-auth/react";
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react";
import {MoralisProvider} from "react-moralis";
import "../styles/globals.css";

function MyApp({Component, pageProps}) {
    const supportedChainIds = [80001, 5];

    return (
        <MoralisProvider
            serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
            appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
        >
            <ThirdwebProvider supportedChainIds={supportedChainIds}>
                <SessionProvider session={pageProps.session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </ThirdwebProvider>
        </MoralisProvider>
    );
}

export default MyApp;
