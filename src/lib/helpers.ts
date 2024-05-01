import type { DateValue } from "@internationalized/date";

export const calculateAge = (dateObj: DateValue | undefined) => {
    if (dateObj) {
        const { day, month, year } = dateObj;
        const today: Date = new Date();
        const birthDate: Date = new Date(year, month - 1, day);

        let age: number = today.getFullYear() - birthDate.getFullYear();
        const monthDiff: number = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    return undefined;
};