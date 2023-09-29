import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository_interface";
import Address from "../../../domain/customer/value_object/address";
import CustomerModel from "./sequilize/model/customer_model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.getId(),
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
    }, {
      where: {
        id: entity.getId()
      }
    });
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
    } catch (error) {
      throw new Error("Customer not found");
    }
    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city,
    );
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    const customers = customerModels.map((customerModels) => {
      let customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.zipcode,
        customerModels.city,
      );
      customer.changeAddress(address);
      if(customerModels.active){
        customer.activate();
      }
      return customer;
    });
    return customers;
  }
}
