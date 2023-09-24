import EventHandlerInterface from "../../../@shared/event/event_handler_interface";
import CustomerCreatedEvent from "../custumer_created_event";

export default class CustomerChangedAddressHandler implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Endereço do cliente: ID: ${event.eventData.id}, Nome: ${event.eventData.name} alterado para: ${event.eventData.address.street}, ${event.eventData.address.number} CEP: ${event.eventData.address.zipcode}`);
  }
}
