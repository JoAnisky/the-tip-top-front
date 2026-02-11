export default defineEventHandler(async (event) => {

    const userDataCookie = getCookie(event, 'user_data')
    const accessTokenCookie = getCookie(event, 'access_token')

    if (!userDataCookie || !accessTokenCookie) {
        return { loggedIn: false, user: null }
    }

    try {
        const user = JSON.parse(userDataCookie)
        return { loggedIn: true, user: user }
    } catch (error) {
        console.error('Erreur parsing:', error)
        return { loggedIn: false, user: null }
    }
})