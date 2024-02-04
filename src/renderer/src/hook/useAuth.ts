function useAuth() {
    const del = (): void => {
        if ( isAuth() ) {
            window.electron.auth.delToken()
            localStorage.removeItem("token")
        }
    }

    const set = (token: string): void => {
        localStorage.setItem("token", token)
        window.electron.auth.setToken(token)
    }

    const isAuth = (): boolean => {
        return localStorage.getItem("token") ? true : false
    }

    return { set, del, isAuth }
}

export default useAuth