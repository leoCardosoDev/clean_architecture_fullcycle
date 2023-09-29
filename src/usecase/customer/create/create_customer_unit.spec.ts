import CustomerCreateUseCase from "./create_customer";

const input = {
  name: "Leo",
  address: {
    street: "Street One",
    number: 23,
    zip: "00000-000",
    city: "Baruaba",
  }
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test create Customer", () => {
  it("Should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
    const output = await customerCreateUseCase.execute(input)
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })
  });

  it("Should throw error when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
    input.name = "";
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow();
  });

  it("Should throw error when street is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
    input.address.street = "";
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
  });
});
