import Entity from "../../@shared/entity/entity_abstract";
import NotificationError from "../../@shared/notification/notification_error";
import CustomerValidatorFactory from "../factory/customer_validator_factory";
import Address from "../value_object/address";

export default class Customer extends Entity{
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this._name = name;
    this.validate();

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  getId(): string {
    return this.id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate(){
    CustomerValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }
  
  changeAddress(address: Address) {
    this._address = address;
    this.validate();
  }
  
  isActive() {
    return this._active;
  }

  activate(){
    if(this._address === undefined) {
      this.notification.addError({
        message: "Address is mandatory to activate as customer",
        context: "customer"
      });
      throw new NotificationError(this.notification.getErrors());
    }
    
    this._active = true;
  }

  set Address(address: Address) {
    this._address = address;
  }
  
  deactivate(){
    this._active = false;
  }

  addRewardPoints(points:number) {
    this._rewardPoints += points;
  }
}
