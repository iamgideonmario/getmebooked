@Post('admin/approve/:id')
@UseGuards(AdminGuard)
async approve(@Param('id') id) {
  await prisma.business.update({
    where: { id },
    data: { approved: true }
  });
}
``