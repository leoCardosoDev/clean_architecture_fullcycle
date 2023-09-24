import EventHandlerInterface from "../../../@shared/event/event_handler_interface";
import CustomerCreatedEvent from "../custumer_created_event";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o segundo console.log do evento: CustomerCreated ID: ${event.eventData.id} .....`);
  }
}
