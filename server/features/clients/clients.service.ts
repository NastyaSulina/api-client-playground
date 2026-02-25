import { faker } from '@faker-js/faker'
import { ClientEntity } from './clients.entity'

function createRandomClient(): ClientEntity {
    const sex = faker.person.sexType()
    const firstName = faker.person.firstName(sex)
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })

    return {
        id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        jobTitle: faker.person.jobTitle(),
        email,
        firstName,
        lastName,
        sex,
    }
}

const TOTAL_CLIENTS = 137
export const CLIENTS_DB: ClientEntity[] = Array.from({ length: TOTAL_CLIENTS }, () =>
    createRandomClient(),
)
