import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import {Button} from "@chakra-ui/react";


export default function LoginPage () {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState<any>([]);


    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient
                .from('profiles')
                .select('id, email, username, avatar_url')
                .eq('id','auth.user().id')
            if (data !== null) {
                setData(data)
            }
        }
        // Only run query once user is logged in.
        if (user) loadData().then(r => console.log(r))
    }, [user])

    if (!user)
        return (
            <Auth
                redirectTo="http://localhost:3000/"
                appearance={{ theme: ThemeSupa }}
                supabaseClient={supabaseClient}
                providers={['google', 'github']}
                socialLayout="horizontal"
            />
        )

    return (
        <>
            <Button  onClick={() => supabaseClient.auth.signOut()} >Sign out</Button>
            <p>user:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    )
}

