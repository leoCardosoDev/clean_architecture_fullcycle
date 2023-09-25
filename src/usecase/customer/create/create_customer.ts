import { v4 as uuid } from "uuid";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository_interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create_customer_dto";
import CustomerFactory from "../../../domain/customer/factory/customer_factory";
import Address from "../../../domain/customer/value_object/address";

export default class CustomerCreateUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }
  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customerId = uuid();
    const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city);
    const customer = CustomerFactory.createWithAddress(input.name, address);
    await this.customerRepository.create(customer);
    return {
      id: customerId,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      }
    }
  }
}
