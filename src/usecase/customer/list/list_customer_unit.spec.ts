import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value_object/address";
import ListCustomerUseCase from "./list_customer";

const customer1 = new Customer("1", "John Doe");
const address1 = new Address("Street 1", 1, "11111-111", "City 1");
customer1.changeAddress(address1);

const customer2 = new Customer("2", "Jane Doe");
const address2 = new Address("Street 2", 2, "22222-222", "City 2");
customer2.changeAddress(address2);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test for list customer use case", () => {
  it("Should list a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new ListCustomerUseCase(customerRepository);
    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.getId());
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);

    expect(output.customers[1].id).toBe(customer2.getId());
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address.street);

  });
});
