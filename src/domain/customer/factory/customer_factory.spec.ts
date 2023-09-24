import Address from "../value_object/address";
import CustomerFactory from "./customer_factory";

describe("Customer factory unit test", () => {
  it("Should create a customer", () => {
    let customer = CustomerFactory.create("John");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  });

  it("Should create a customer with an Address", () => {
    const address = new Address("Street 1", 23, "00000-000", "City 1");
    let customer = CustomerFactory.createWithAddress("John", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address);
  });
});
