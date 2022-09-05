import { SessionProvider } from "next-auth/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    const supportedChainIds = [80001, 5];

    return (
        <ThirdwebProvider
            supportedChainIds={supportedChainIds}
        >
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ThirdwebProvider>
    );
}

export default MyApp;
