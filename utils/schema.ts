export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: number
                    username: string
                    email: string
                    password: string
                    created_at: string
                    avatar_url: string
                    website: string

                }
            }
            User: {
                Row: {
                    id: number
                    name: string
                    email: string
                    password: string
                    created_at: string
                    avatar_url: string
                }
            }
            Images: {
                Row: {
                    created_at: string | null
                    href: string | null
                    id: number
                    imageSrc: string | null
                    name: string | null
                }
                Insert: {
                    created_at?: string | null
                    href?: string | null
                    id?: number
                    imageSrc?: string | null
                    name?: string | null
                }
                Update: {
                    created_at?: string | null
                    href?: string | null
                    id?: number
                    imageSrc?: string | null
                    name?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

