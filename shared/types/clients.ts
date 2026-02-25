export type Client = {
    id: string
    avatar: string
    birthday: string
    jobTitle: string
    email: string
    firstName: string
    lastName: string
    sex: string
}

export type ClientsResponse = {
    clients: Client[]
    page: number
    limit: number
    total: number
    totalPages: number
}
