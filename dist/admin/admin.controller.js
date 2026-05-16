"use strict";
index(, res);
{
    const businesses = await prisma.business.findMany();
    res.render('admin/index', { businesses });
}
