import type { ClientEntity } from './clients.entity'
import type { Client } from '../../../shared/types/clients'

export function toClientDto(entity: ClientEntity): Client {
    return {
        ...entity,
        birthday: entity.birthday.toISOString(),
    }
}
