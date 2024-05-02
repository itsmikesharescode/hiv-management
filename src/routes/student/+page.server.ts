import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

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
    }
};