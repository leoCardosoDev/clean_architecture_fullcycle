import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/repository/sequilize/model/customer_model";
import CustomerRepository from "../../../infra/customer/repository/customer_repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value_object/address";
import FindCustomerUseCase from "./find_customer";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer",async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    const customer = new Customer("123", "Leo");
    const address = new Address("Street One", 23, "00000-000", "Baruaba");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const input = {
      id: "123",
    }

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
  })

});
