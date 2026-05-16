export class BusinessService {
  private businesses = [];

  createBusiness(userId: string, name: string) {
    const business = {
      id: Date.now().toString(),
      name,
      ownerId: userId,
    };

    this.businesses.push(business);

    return business;
  }

  getAll() {
    return this.businesses;
  }
}