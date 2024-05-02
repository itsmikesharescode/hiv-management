import { loginSchema, registerSchema, resetPassSchema } from "$lib/schema";
import type { ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
    const { user } = await safeGetSession();

    if (user) {
        const { role } = user;
        if (role === "authenticated") return redirect(302, "/student");
        else if (role === "service_role") return redirect(302, "/admin");
    }


};

export const actions: Actions = {

    loginAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = loginSchema.parse(formData);

            const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
                email: result.email,
                password: result.password
            });

            if (loginError) return fail(401, { msg: loginError.message });
            else return { msg: "Log in successfully." };

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();

            return fail(400, { errors: fieldErrors });
        }
    },

    registerAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = registerSchema.parse(formData);

            const { data: { user }, error } = await supabase.auth.signUp({
                email: result.email,
                password: result.password,
                options: {
                    data: {
                        fullName: `${result.lastName}, ${result.firstName} ${result.middleName}`,
                        birthDay: result.birthDay,
                        age: result.age,
                        yearLvl: result.yearLvl,
                        section: result.section,
                        department: result.department,
                    }
                }
            });

            if (error) return fail(401, { msg: error.message });
            else if (user) return { msg: "Account Created." };

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();

            return fail(400, { errors: fieldErrors });
        }
    },

    resetPassAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = resetPassSchema.parse(formData);

            const { error } = await supabase.auth.resetPasswordForEmail(result.email);

            if (error) return fail(401, { msg: error.message });
            else return { msg: `An email containing reset password has been sent to ${result.email}` };

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();

            return fail(400, { errors: fieldErrors });
        }
    }
};

