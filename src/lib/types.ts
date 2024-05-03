

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
};

export type UserList = {
    created_at: string
    had_submit: boolean
    id: number
    user_age: string
    user_birthday: string
    user_department: string
    user_email: string
    user_fullname: string
    user_id: string
    user_section: string
    user_year_lvl: string
}

export type Respondent = {
    created_at: string
    id: number
    percentage: string | null
    user_id: string
}

export type UserListWithRespondent = {
    created_at: string
    had_submit: boolean
    id: number
    user_age: string
    user_birthday: string
    user_department: string
    user_email: string
    user_fullname: string
    user_id: string
    user_section: string
    user_year_lvl: string
    hiv_results_tb: Respondent
}