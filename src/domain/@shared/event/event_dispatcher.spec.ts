import CustomerCreatedEvent from "../../customer/event/custumer_created_event";
import CustomerChangedAddressHandler from "../../customer/event/handler/customer_changed_address_handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia_console_log2_handler";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia_console_log_handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send_email_when_product_is_created";
import ProductCreatedEvent from "../../product/event/product_created_event";
import EventDispatcher from "./event_dispatcher";

describe("Domain events test", () => {
  it("Should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("Should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("Should unregister all event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("Should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toBeCalled();
  });

  it("Should notify a CustomerCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 23,
        zipcode: "99999-999" 
      }
    });
    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler).toBeCalled();
    expect(spyEventHandler2).toBeCalled();
  });

  it("Should notify a ChangedAddress", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangedAddressHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
    const customerChangedAddressEvent = new CustomerCreatedEvent({
      id: "123",
      name: "Customer 1",
      address: {
        street: "Street 2",
        number: 26,
        zipcode: "00000-000" 
      }
    });
    eventDispatcher.notify(customerChangedAddressEvent);
    expect(spyEventHandler).toBeCalled();
  });

});
