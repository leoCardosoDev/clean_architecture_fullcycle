import CustomerFactory from "../../../domain/customer/factory/customer_factory"
import Address from "../../../domain/customer/value_object/address"
import UpdateCustomerUseCase from "./update_customer";

const customer = CustomerFactory.createWithAddress("Leo", new Address("Street 1", 23, "Zip", "City"));
const input = {
  id: customer.getId(),
  name: "Leo Updated",
  address: {
    street: "Street Updated",
    number: 2,
    zip: "Zip Updated",
    city: "City Updated"
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test for customer update use case", () => {
  it("Should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
    const output = await customerUpdateUseCase.execute(input);
    expect(output).toEqual(input)
  });
});

