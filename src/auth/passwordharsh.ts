import * as bcrypt from 'bcrypt';

const hash = await bcrypt.hash(password, 12);