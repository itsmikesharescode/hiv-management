import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Email is required." }),
    password: z.string().min(1, { message: "Must enter a password." })
});

export const registerSchema = z.object({
    age: z.string(),
    firstName: z.string().min(1, { message: 'Enter a valid first name.' }).max(20, { message: "Max character is 20 for first name." }),
    middleName: z.string().min(1, { message: 'Enter a valid middle name.' }).max(20, { message: "Max character is 20 for middle name." }),
    lastName: z.string().min(1, { message: 'Enter a valid last name.' }).max(20, { message: "Max character is 20 for last name." }),
    birthDay: z.string().min(1, { message: "Enter a valid birthday." }),
    yearLvl: z.string().min(1, { message: "Must enter your year level." }).max(20, { message: "Max character is 20 for year level." }),
    section: z.string().min(1, { message: "Must enter your section." }).max(30, { message: "Max character is 30 for section." }),
    department: z.string().min(1, { message: "Must enter your department." }).max(30, { message: "Max character is 30 for department." }),
    email: z.string().email({ message: "Email is required." }).max(30, { message: "Max character is 30 for email." }),
    password: z.string().min(6, { message: "Must enter a strong password." }).max(30, { message: "Max character is 30 for password." }),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword, age }, ctx) => {

    if (password !== confirmPassword) {

        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmPassword"]
        });

    }

    if (Math.abs(Number(age)) < 18) {
        ctx.addIssue({
            code: "custom",
            message: "You must be in legal age.",
            path: ["birthDay"]
        });
    }


});

export const resetPassSchema = z.object({
    email: z.string().email({ message: "Must enter a valid email." })
});

export const createAccountSchema = z.object({
    age: z.string(),
    firstName: z.string().min(1, { message: 'Enter a valid first name.' }).max(20, { message: "Max character is 20 for first name." }),
    middleName: z.string().min(1, { message: 'Enter a valid middle name.' }).max(20, { message: "Max character is 20 for middle name." }),
    lastName: z.string().min(1, { message: 'Enter a valid last name.' }).max(20, { message: "Max character is 20 for last name." }),
    birthDay: z.string().min(1, { message: "Enter a valid birthday." }),
    yearLvl: z.string().min(1, { message: "Must enter your year level." }).max(20, { message: "Max character is 20 for year level." }),
    section: z.string().min(1, { message: "Must enter your section." }).max(30, { message: "Max character is 30 for section." }),
    department: z.string().min(1, { message: "Must enter your department." }).max(30, { message: "Max character is 30 for department." }),
    email: z.string().email({ message: "Email is required." }).max(30, { message: "Max character is 30 for email." }),
    password: z.string().min(6, { message: "Must enter a strong password." }).max(30, { message: "Max character is 30 for password." }),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword, age }, ctx) => {

    if (password !== confirmPassword) {

        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmPassword"]
        });

    };

    if (Math.abs(Number(age)) < 18) {
        ctx.addIssue({
            code: "custom",
            message: "You must be in legal age.",
            path: ["birthDay"]
        });
    }

});


export const updateAccountSchema = z.object({
    userId: z.string(),
    age: z.string(),
    firstName: z.string().min(1, { message: 'Enter a valid first name.' }).max(20, { message: "Max character is 20 for first name." }),
    middleName: z.string().min(1, { message: 'Enter a valid middle name.' }).max(20, { message: "Max character is 20 for middle name." }),
    lastName: z.string().min(1, { message: 'Enter a valid last name.' }).max(20, { message: "Max character is 20 for last name." }),
    birthDay: z.string().min(1, { message: "Enter a valid birthday." }),
    yearLvl: z.string().min(1, { message: "Must enter your year level." }).max(20, { message: "Max character is 20 for year level." }),
    section: z.string().min(1, { message: "Must enter your section." }).max(30, { message: "Max character is 30 for section." }),
    department: z.string().min(1, { message: "Must enter your department." }).max(30, { message: "Max character is 30 for department." }),
    email: z.string().email({ message: "Email is required." }).max(30, { message: "Max character is 30 for email." }),
    password: z.string().min(6, { message: "Must enter a strong password." }).max(30, { message: "Max character is 30 for password." }),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword, age }, ctx) => {

    if (password !== confirmPassword) {

        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmPassword"]
        });

    };

    if (Math.abs(Number(age)) < 18) {
        ctx.addIssue({
            code: "custom",
            message: "You must be in legal age.",
            path: ["birthDay"]
        });
    }

});
