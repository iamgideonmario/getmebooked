@Controller('business')
export class BusinessesController {

  @Get(':slug')
  async viewBusiness(@Param('slug') slug: string, @Res() res) {
    const business = await this.businessService.findBySlug(slug);
    return res.render('business/profile', { business });
  }

}