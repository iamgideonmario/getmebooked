@Get('dashboard')
dashboard(@Req() req, @Res() res) {
  res.render('dashboard/index', { user: req.session.user });
}