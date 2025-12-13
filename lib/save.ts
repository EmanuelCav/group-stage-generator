import { IGroup } from '@/interface/Group';

import { supabase } from '@/lib/supabase';

export const saveGroupsToSupabase = async (groups: IGroup[], userId: string) => {

    const groupsWithUser = groups.map(g => ({ ...g, user_id: userId }));

    const { data, error } = await supabase
        .from('groups')
        .upsert(groupsWithUser, { onConflict: 'id' })
        .select('*');

    if (error) {
        console.error("Error guardando groups:", error);
        return null;
    }

    return data;
}

export const getGroupsFromSupabase = async (userId: string) => {
    const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("user_id", userId)
        .order("createdAt", { ascending: true });

    if (error) {
        console.error("Error obteniendo groups:", error);
        return [];
    }

    return data;
}
