import * as bcrypt from 'bcrypt';

export class AuthService {
  private users: any[] = [];

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      email,
      password: hash,
    };

    this.users.push(user);

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
  }
}