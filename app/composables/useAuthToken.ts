export const useAuthToken = (): void => {
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