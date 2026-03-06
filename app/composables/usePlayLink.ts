export const usePlayLink = () => {
    const { loggedIn } = useAuth()

    const playLink = computed(() => loggedIn.value ? '/profile' : '/login')
    const profileLabel = computed(() => loggedIn.value ? 'Mon profil' : 'Mon compte')

    const goToPlay = () => {
        navigateTo(playLink.value)
    }

    return {
        playLink,
        profileLabel,
        goToPlay,
    }
}