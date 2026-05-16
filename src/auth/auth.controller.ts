@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  loginForm(@Req() req, @Res() res) {
    res.render('auth/login', {
      csrfToken: req.csrfToken(),
      flash: req.session.flash,
    });
    req.session.flash = null;
  }

  @Post('login')
  async login(@Body() body, @Req() req, @Res() res) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      req.session.flash = { error: 'Invalid email or password' };
      return res.redirect('/login');
    }

    req.session.userId = user.id;
    res.redirect('/dashboard');
  }

  @Get('register')
  registerForm(@Req() req, @Res() res) {
    res.render('auth/register', {
      csrfToken: req.csrfToken(),
      flash: req.session.flash,
    });
    req.session.flash = null;
  }

  @Post('register')
  async register(@Body() body, @Req() req, @Res() res) {
    await this.authService.register(body.email, body.password);
    req.session.flash = { success: 'Account created. Please login.' };
    res.redirect('/login');
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.session.destroy(() => res.redirect('/login'));
  }
}