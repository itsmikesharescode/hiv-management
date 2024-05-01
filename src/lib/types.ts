

export type ResultModel<T> = {
    status: number
    type: string
    data: T
};

export type Question = {
    title: string
    description: string
}