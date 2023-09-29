import ValidatorInterface from "../../@shared/validator/validator_interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer_yup_validator";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}
