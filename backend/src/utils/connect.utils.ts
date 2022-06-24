import mongoose from 'mongoose';
import config from 'config';
import log from './logger.utils';

export async function connect() {
    const dbURL = config.get<string>('dbUrl')

    try {
        await mongoose.connect(dbURL)
        console.log('Connected to Mongo')
    } catch {
        log.error('Could not to connect to Mongo')
        process.exit(1)
    }

}