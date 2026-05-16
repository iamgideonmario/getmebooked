@Get('login')
loginForm(@Req() req, @Res() res) {
  res.render('auth/login', {
    csrfToken: req.csrfToken(),
    title: 'Login',
  });
}

@Post('login')
async login(@Body() body, @Req() req, @Res() res) {
  const user = await this.authService.validateUser(
    body.email,
    body.password,
  );

  if (!user) {
    return res.redirect('/login');
  }

  req.session.userId = user.id;
  res.redirect('/dashboard');
}