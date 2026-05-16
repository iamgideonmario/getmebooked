export class AdminGuard implements CanActivate {
  canActivate(ctx) {
    return ctx.switchToHttp().getRequest().user.role === 'ADMIN';
  }
}