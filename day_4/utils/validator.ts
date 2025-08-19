export class Validator {
    static email(email: string): string | null {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) return 'Email is required'
        if (!regex.test(email)) return 'Invalid email address'
        return null
    }

    static password(password: string): string | null {
        if (!password) return 'Password is required'
        if (password.length < 6) return 'Password must be at least 6 characters'
        return null
    }

    static defaultValidator(label: string, value: string): string | null {
        if (!value) return `${label} field is required`
        return null
    }
}