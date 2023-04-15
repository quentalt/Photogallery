import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import {AppProps} from "next/app";
import {ChakraBaseProvider, ChakraProvider} from "@chakra-ui/react";
import {Database} from "@/utils/schema";
import theme from "@/theme/theme";

export default function MyApp({
                   Component,
                   pageProps,
               }: AppProps<{
    initialSession: Session
}>) {

    const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())
    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <ChakraBaseProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraBaseProvider>
        </SessionContextProvider>
    )
}