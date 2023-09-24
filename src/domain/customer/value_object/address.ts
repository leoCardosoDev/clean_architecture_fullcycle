export default class Address {
  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.validate();
  }

  get street(){
    return this._street
  }
  get number(){
    return this._number
  }
  get zip(){
    return this._zip
  }
  get city(){
    return this._city
  }

  validate() {
    if(this._street.length === 0) {
      throw new Error("Street is required")
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._city} ${this._zip}`
  }

}
