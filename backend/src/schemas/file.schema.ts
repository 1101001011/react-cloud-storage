import {object, string, TypeOf} from 'zod'

export const fileSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        type: string({
            required_error: 'Type is required'
        })
    })
})

export type FileInputType = TypeOf<typeof fileSchema>