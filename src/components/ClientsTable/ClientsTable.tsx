import { useState } from 'react'
import { useClients } from '@/hooks/useClients'
import styles from './ClientsTable.module.css'

export const ClientsTable = () => {
    const [page, setPage] = useState(1)
    const { clients, totalPages, isLoading, error } = useClients(page)

    const canPrev = page > 1
    const canNext = page < totalPages

    const handleBack = () => {
        if (canPrev) {
            setPage((p) => p - 1)
        }
    }

    const handleForward = () => {
        if (canNext) {
            setPage((p) => p + 1)
        }
    }

    return (
        <div className={styles.root}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Sex</th>
                        <th>Job Title</th>
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>
                                {client.firstName} {client.lastName}
                            </td>
                            <td>{client.email}</td>
                            <td>{client.sex}</td>
                            <td>{client.jobTitle}</td>
                            <td>{new Date(client.birthday).toLocaleDateString('ru-RU')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.controls}>
                <button disabled={!canPrev || isLoading} onClick={handleBack}>
                    Назад
                </button>

                <span>
                    Страница {page} / {totalPages}
                </span>

                <button disabled={!canNext || isLoading} onClick={handleForward}>
                    Вперед
                </button>
            </div>

            <div className={styles.information}>
                {error && <div>{error}</div>}
                {isLoading && <div>Загрузка...</div>}
            </div>
        </div>
    )
}
