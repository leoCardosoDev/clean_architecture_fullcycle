import EventHandlerInterface from "../../../@shared/event/event_handler_interface";
import CustomerCreatedEvent from "../custumer_created_event";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o primeiro console.log do evento: CustomerCreated ${event.eventData.id} .....`);
  }
}
