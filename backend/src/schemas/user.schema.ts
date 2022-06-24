import {object, string, TypeOf} from 'zod'

export const userSchema = object({
    body: object({
        email: string({
            required_error: 'Email required'
        }).email('Invalid email'),
        password: string({
            required_error: 'Password required'
        }).min(6, 'Password should be at least 6 characters long')
    })
})

export type UserInputType = TypeOf<typeof userSchema>