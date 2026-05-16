"use strict";
loginForm(, req, , res);
{
    res.render('auth/login', {
        csrfToken: req.csrfToken(),
        title: 'Login',
    });
}
login(, body, , req, , res);
{
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
        return res.redirect('/login');
    }
    req.session.userId = user.id;
    res.redirect('/dashboard');
}
