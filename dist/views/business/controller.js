"use strict";
dashboard(, req, , res);
{
    res.render('dashboard/index', { user: req.session.user });
}
