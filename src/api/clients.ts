import type { ClientsResponse } from '@shared/types/clients'
import axios from 'axios'

type GetClientsOptions = {
    signal?: AbortSignal
    limit?: number
}

export async function getClients(
    page: number,
    options: GetClientsOptions = {},
): Promise<ClientsResponse> {
    const { signal, limit = 10 } = options

    const { data } = await axios.get<ClientsResponse>(`/api/clients`, {
        params: { page, limit },
        signal,
    })

    return data
}
