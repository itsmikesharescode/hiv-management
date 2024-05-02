

export type ResultModel<T> = {
    status: number
    type: string
    data: T
};

export type Question = {
    title: string
    description: string
    photo_link: string
};

export type StudentInput = {
    userId: string
    age: string
    birthDay: string
    department: string
    email: string
    fullName: string
    section: string
    yearLvl: string
    percentage: number
}