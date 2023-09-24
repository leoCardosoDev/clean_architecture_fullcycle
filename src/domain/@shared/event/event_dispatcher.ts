import EventDispatcherInterface from "./event_dispatcher_interface";
import EventHandlerInterface from "./event_handler_interface";
import EventInterface from "./event_interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  register(eventName: string, eventHadler: EventHandlerInterface<EventInterface>): void {
    if(!this.eventHandlers[eventName]){
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHadler);
  }

  unregister(eventName: string, eventHadler: EventHandlerInterface<EventInterface>): void {
    if(this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHadler);
      if(index !== -1){
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if(this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(eventHandler => {
        eventHandler.handle(event);
      });
    }
  }
}
