import { Router } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import { supabase } from './supabase';

import { IGroup } from "@/interface/Group";

WebBrowser.maybeCompleteAuthSession();
const redirectTo = AuthSession.makeRedirectUri()

export const createSessionFromUrl = async (url: string) => {

    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);

    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    });

    if (error) throw error;

    return data;
}

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo,
            skipBrowserRedirect: true,
        },
    })

    if (error) throw error

    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo)

    if (res.type === 'success') {
        const { url } = res
        const dataSession = await createSessionFromUrl(url)
        return dataSession
    }

    return null
}

export const handleSignOut = async (setIsSureLogOut: (isSureLogOut: boolean) => void, router: Router, setGroups: (data: IGroup[]) => void, getGroup: (data: IGroup) => void) => {

    try {

        const { error } = await supabase.auth.signOut();

        if (error) {
            setIsSureLogOut(false)
            return
        }

        setIsSureLogOut(false)
        router.replace("/")
        
        setGroups([])
        getGroup({
            teams: []
        })

    } catch (error) {
        console.log("Error al cerrar sesión:", error);
    }

}