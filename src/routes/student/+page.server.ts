import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { StudentInput } from "$lib/types";

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
    const { user } = await safeGetSession();

    if (!user) return redirect(302, "/?error=no-session");
    if (user.role === "service_role") return redirect(302, "/admin");
    return { user }
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



    }
};