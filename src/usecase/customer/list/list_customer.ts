import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository_interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list_customer_dto";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }
  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => ({
        id: customer.getId(),
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city,
        }
      })),
    }
  }
}
