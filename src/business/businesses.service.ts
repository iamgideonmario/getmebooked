@Injectable()
export class BusinessService {

  async findBySlug(slug: string) {
    return prisma.business.findUnique({ where: { slug } });
  }

}