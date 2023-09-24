import EventHandlerInterface from "./event_handler_interface";
import EventInterface from "./event_interface";

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, eventHadler: EventHandlerInterface): void;
  unregister(eventName: string, eventHadler: EventHandlerInterface): void;
  unregisterAll(): void;
}
