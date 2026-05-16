"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
class AdminGuard {
    canActivate(ctx) {
        return ctx.switchToHttp().getRequest().user.role === 'ADMIN';
    }
}
exports.AdminGuard = AdminGuard;
