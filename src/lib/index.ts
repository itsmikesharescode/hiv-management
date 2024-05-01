
import type { User } from '@supabase/supabase-js';
import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

export const setUserState = (state: User | null) => {
    const stateGenerate = writable(state);
    setContext("userState", stateGenerate);
};

export const getUserState = () => getContext<Writable<User | null>>("userState");