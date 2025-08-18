
const LOGIN_ACCOUNT = "admin"
const LOGIN_PASSWORD = "123456"

const login = (account: string, password: string) => {
    if (account.toLowerCase() === LOGIN_ACCOUNT && password === LOGIN_PASSWORD) {
        return true
    }
    return false
}

export default login