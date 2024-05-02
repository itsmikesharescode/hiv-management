import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { StudentInput } from "$lib/types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    const { user } = await safeGetSession();

    if (!user) return redirect(302, "/?error=no-session");
    if (user.role === "service_role") return redirect(302, "/admin");

    return {
        user,
        userList: await supabase.from("user_list_tb").select("had_submit").eq("user_id", user.id).limit(1).single() as PostgrestSingleResponse<{ had_submit: boolean }>
    }
};

export const actions: Actions = {
    logoutAction: async ({ locals: { supabase } }) => {
        const { error } = await supabase.auth.signOut();
        if (error) return fail(401, { msg: error.message });
        else return { msg: "Log out success." }
    },

    submitResultAction: async ({ locals: { supabase }, request }) => {
        const formData = await request.formData();

        const studentStringObj = formData.get("studentAnswers") as string;

        const studentAnswers = JSON.parse(studentStringObj) as { userId: string, percentage: number };


        const { error } = await supabase.rpc("submit_result", {
            user_id_param: studentAnswers.userId,
            percentage_param: studentAnswers.percentage
        });

        if (error) return fail(401, { msg: error.message });
        else return { msg: "Successfully submitted." };

    }
};