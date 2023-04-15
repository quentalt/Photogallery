import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import {Database} from "@/utils/schema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseServerClient = createServerSupabaseClient<Database>({
        req,
        res,
    })
    const {
        data: { user },
    } = await supabaseServerClient.auth.getUser()

    res.status(200).json({ name: user?.user_metadata ?? '' })
}