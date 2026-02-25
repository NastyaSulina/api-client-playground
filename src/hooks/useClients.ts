import { useEffect, useReducer, useRef } from 'react'
import { getClients } from '../api/clients'
import type { Client } from '@shared/types/clients'

type State = {
    clients: Client[]
    totalPages: number
    isLoading: boolean
    error: string | null
}

type Action =
    | { type: 'loading' }
    | { type: 'success'; clients: Client[]; totalPages: number }
    | { type: 'error'; error: string }

const initialState: State = {
    clients: [],
    totalPages: 1,
    isLoading: false,
    error: null,
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true, error: null }
        case 'success':
            return {
                ...state,
                isLoading: false,
                clients: action.clients,
                totalPages: action.totalPages,
            }
        case 'error':
            return { ...state, isLoading: false, error: action.error, clients: [] }
        default:
            return state
    }
}

export function useClients(page: number) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        dispatch({ type: 'loading' })

        if (timerId?.current) {
            clearTimeout(timerId.current)
        }

        timerId.current = setTimeout(() => {
            getClients(page, { signal: controller.signal, limit: 10 })
                .then((data) => {
                    dispatch({
                        type: 'success',
                        clients: data.clients,
                        totalPages: data.totalPages,
                    })
                })
                .catch((e: Error) => {
                    if (e?.name === 'AbortError') return

                    dispatch({
                        type: 'error',
                        error: e instanceof Error ? e.message : 'Something went wrong',
                    })
                })
        }, 200)

        return () => {
            controller.abort()

            if (timerId?.current) {
                clearTimeout(timerId.current)
            }
        }
    }, [page])

    return state
}
