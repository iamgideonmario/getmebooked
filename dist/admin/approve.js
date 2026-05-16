"use strict";
approve(, id);
{
    await prisma.business.update({
        where: { id },
        data: { approved: true }
    });
}
``;
