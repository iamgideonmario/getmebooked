import * as bcrypt from 'bcrypt';
import { prisma } from '../prisma/prisma.service';

export class AuthService {

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hash, // ✅ FIXED
      },
    });

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const match = await bcrypt.compare(password, user.passwordHash); // ✅ FIXED
    if (!match) return null;

    return user;
  }
}