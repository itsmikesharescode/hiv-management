
import type { User } from '@supabase/supabase-js';
import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import type { SearchStoreModel } from './types';

export const setUserState = (state: User | null) => {
    const stateGenerate = writable(state);
    setContext("userState", stateGenerate);
};

export const getUserState = () => getContext<Writable<User | null>>("userState");

//search store
export const createSearchStore = <T extends Record<PropertyKey, any>>(data: T[]) => {
    const { subscribe, set, update } = writable<SearchStoreModel<T>>({ data, filtered: data, search: "" });

    return { subscribe, set, update };
};

export const searchHandler = <T extends Record<PropertyKey, any>>(store: SearchStoreModel<T>) => {
    const searchTerm = store.search.toLocaleLowerCase() || "";
    store.filtered = store.data.filter((item) => { return item.searchTerms.toLocaleLowerCase().includes(searchTerm) });
};