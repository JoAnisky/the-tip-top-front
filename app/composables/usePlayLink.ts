export const usePlayLink = () => {
    const { loggedIn } = useAuth()

    const playLink : string = computed(() => loggedIn.value ? '/profile' : '/login')
    const profileLabel : string = computed(() => loggedIn.value ? 'Mon profil' : 'Mon compte')

    const goToPlay = () : void => {
        navigateTo(playLink.value)
    }

    return {
        playLink,
        profileLabel,
        goToPlay,
    }
}