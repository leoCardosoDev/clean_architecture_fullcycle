
import ProductCreatedEvent from "../product_created_event";
import EventHandlerInterface from "../../../@shared/event/event_handler_interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent>{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to ${event.eventData.name} .....`);
  }
}
