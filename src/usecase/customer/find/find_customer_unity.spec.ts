import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value_object/address";
import FindCustomerUseCase from "./find_customer";

const customer = new Customer("123", "Leo");
const address = new Address("Street One", 23, "00000-000", "Baruaba");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(customer),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test find Customer", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    const input = {id: "123"}
    const output = {
      id: "123",
      name: "Leo",
      address: {
        street: "Street One",
        number: 23,
        zip: "00000-000",
        city: "Baruaba",
      }
    }
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);
    const input = {id: "123"}
    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });

});
