interface UseAuthTokenReturn {
    accessToken: Readonly<Ref<string | null>>
    setAccessToken: (token: string) => void
    clearAccessToken: () => void
}

export const useAuthToken = (): UseAuthTokenReturn => {
    const accessToken = useState<string | null>('accessToken', () => null);

    const setAccessToken = (token: string) => {
        accessToken.value = token;
    }

    const clearAccessToken = () => {
        accessToken.value = null;
    }

    return {
        accessToken: readonly(accessToken),
        setAccessToken,
        clearAccessToken
    }
}