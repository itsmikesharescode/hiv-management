import { loginSchema, registerSchema } from "$lib/schema";
import type { ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {

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
                        department: result.department
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
    }
};