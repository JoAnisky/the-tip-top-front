export function extractSetCookieHeaders(response: Response): string[] {
    const cookies: string[] = []

    // Méthode 1 : getSetCookie() (Node.js >= 19.7)
    if (typeof response.headers.getSetCookie === 'function') {
        return response.headers.getSetCookie()
    }

    // Méthode 2 : Itérer sur tous les headers
    response.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') {
            cookies.push(value)
        }
    })

    return cookies
}