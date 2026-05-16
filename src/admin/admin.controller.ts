@UseGuards(AdminGuard)
@Get('admin')
async index(@Res() res) {
  const businesses = await prisma.business.findMany();
  res.render('admin/index', { businesses });
}