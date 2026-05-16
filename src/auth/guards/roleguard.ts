@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    return req.user.role === 'OWNER';
  }
}