import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import {Database} from "@/utils/schema";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/react";
import Avatar from "@/pages/Avatar";
import TabPage from "@/pages/tab_page";
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session }) {
    const supabase = useSupabaseClient<Database>()
    const user = useUser()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState<Profiles['username']>('')
    const [website, setWebsite] = useState<Profiles['website']>('')
    const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>('')

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({
                                     username,
                                     website,
                                     avatar_url,
                                 }: {
        username: Profiles['username']
        website: Profiles['website']
        avatar_url: Profiles['avatar_url']
    }) {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <TabPage/>
        <div className="form-widget">
            {/* Add to the body */}
            <Avatar
                uid={user?.id || ''}
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatarUrl(url)
                    updateProfile({ username, website, avatar_url: url })
                }}
            />
          <br/>
        </div>
        <div className="form-widget">
            <div>
                <label htmlFor="email">Email</label>
                <Input id="email" type="text" value={user?.email} disabled />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <Input
                    id="username"
                    type="text"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <Input
                    id="website"
                    type="website"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <Button
                    mt={2}
                    mb={4}
                    className="button primary block"
                    onClick={() => updateProfile({ username, website, avatar_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </Button>
            </div>
            <div>
                <Button
                    mt={2}
                    mb={4}
                    colorScheme='red'
                    className="h-10"
                    onClick={() => supabase.auth.signOut()}
                >
                    Sign out
                </Button>
            </div>
        </div>
        </>
    )
}
