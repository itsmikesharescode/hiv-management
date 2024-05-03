import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { ZodError } from "zod";
import { createAccountSchema, updateAccountSchema } from "$lib/schema";

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession, supabaseAdmin } }) => {
    const { user } = await safeGetSession();

    if (!user) return redirect(302, "/?error=no-session");
    if (user.role === "authenticated") return redirect(302, "/student");

    return {
        user,
        repondents: await supabaseAdmin.from("user_list_tb").select('*, hiv_results_tb("*")')
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

        try {
            const result = createAccountSchema.parse(formData);
            const { data: { user }, error } = await supabaseAdmin.auth.admin.createUser({
                email: result.email,
                password: result.password,
                email_confirm: true,
                user_metadata: {
                    fullName: `${result.lastName}, ${result.firstName} ${result.middleName}`,
                    birthDay: result.birthDay,
                    age: result.age,
                    yearLvl: result.yearLvl,
                    section: result.section,
                    department: result.department,
                }
            });

            if (error) return fail(401, { msg: error.message });
            else if (user) return { msg: "Account Created" };
        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors })
        }
    },

    deleteRespondentAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = await request.formData();

        const userId = formData.get("userId") as string;

        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (error) return fail(401, { msg: error.message });
        else return { msg: "Respondent Deleted Successfully." };
    },

    updateAccountAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = updateAccountSchema.parse(formData);



        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors })
        }
    },
};