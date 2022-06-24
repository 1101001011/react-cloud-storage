import {UserInput} from '../models/user.model';
import User from '../models/user.model';
import {omit} from 'lodash';

class UserService {
    async createUser(input: UserInput) {
        const user = await User.create(input)
        return omit(user.toJSON(), 'password')
    }

    async comparePassword({email, password}: {email: string, password: string}) {
        const user = await User.findOne({email})
        if (!user) return false

        const isValid = await user.comparePassword(password)
        if (!isValid) return false

        return omit(user.toJSON(), 'password')
    }
}

export default new UserService()