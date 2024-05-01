import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {

};

export const actions: Actions = {
    loginAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {

        } catch (error) {

        }
    }
};