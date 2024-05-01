import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Email is required." }),
    password: z.string().min(1, { message: "Must enter a password." })
});

export const registerSchema = z.object({
    age: z.string(),
    firstName: z.string().min(1, { message: 'Enter a valid first name.' }).max(10, { message: "Max character is 10 for first name." }),
    middleName: z.string().min(1, { message: 'Enter a valid middle name.' }).max(10, { message: "Max character is 10 for middle name." }),
    lastName: z.string().min(1, { message: 'Enter a valid last name.' }).max(10, { message: "Max character is 10 for last name." }),
    birthDay: z.string().min(1, { message: "Must choose a birthday." }).max(12, { message: "This is not in normal procedure." }),
    yearLvl: z.string().min(1, { message: "Must enter your year level." }).max(10, { message: "Max character is 10 for year level." }),
    section: z.string().min(1, { message: "Must enter your section." }).max(10, { message: "Max character is 10 for section." }),
    department: z.string().min(1, { message: "Must enter your department." }).max(10, { message: "Max character is 10 for department." }),
    email: z.string().email({ message: "Email is required." }).max(20, { message: "Max character is 20 for email." }),
    password: z.string().min(6, { message: "Must enter a strong password." }).max(20, { message: "Max character is 10 for password." })
});