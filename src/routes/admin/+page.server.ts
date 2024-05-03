import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { ZodError } from "zod";

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession, supabaseAdmin } }) => {
    const { user } = await safeGetSession();

    if (!user) return redirect(302, "/?error=no-session");
    if (user.role === "authenticated") return redirect(302, "/student");

    return {
        user,
        repondents: await supabaseAdmin.from("hiv_results_tb").select('*, user_list_tb("*")')
    }
};

export const actions: Actions = {
    logoutAction: async ({ locals: { supabase } }) => {
        const { error } = await supabase.auth.signOut();
        if (error) return fail(401, { msg: error.message });
        else return { msg: "Log out success." }
    },

    createAccountAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        console.log('here');
        try {

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors })
        }
    }
};