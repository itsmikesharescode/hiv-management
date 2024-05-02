import type { DateValue } from "@internationalized/date";
import type { Question } from "./types";

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

export const formatDateToString = (date: Date) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
};

const calculatePercentage = (ArrayOfYes: Question[], ArrayOfNo: Question[]) => {
    const totalResponses = ArrayOfYes.length + ArrayOfNo.length;
    const yesCount = ArrayOfYes.length;
    const percentage = (yesCount / totalResponses) * 100;
    return percentage;
}