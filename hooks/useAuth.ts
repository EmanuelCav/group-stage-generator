import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

export function useAuth() {

    const [user, setUser] = useState<User | null>(null)
    const [loadingUser, setLoadingUser] = useState<boolean>(true)

    useEffect(() => {

        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoadingUser(false)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => listener.subscription.unsubscribe();
    }, [])

    return { user, loadingUser };
}