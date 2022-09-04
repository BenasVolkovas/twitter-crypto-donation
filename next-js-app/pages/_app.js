import { SessionProvider } from "next-auth/react";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "regenerator-runtime/runtime";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    const supportedChainIds = [80001, 5];
    const connectors = {
        injected: {},
    };

    return (
        <ThirdwebWeb3Provider
            supportedChainIds={supportedChainIds}
            connectors={connectors}
        >
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ThirdwebWeb3Provider>
    );
}

export default MyApp;
