import express, { Request, Response } from "express";
import CustomerCreateUseCase from "../../../usecase/customer/create/create_customer"
import CustomerRepository from "../../customer/repository/customer_repository"
import ListCustomerUseCase from "../../../usecase/customer/list/list_customer";
import CustomerPresenter from "../presenter/customer_presenter";

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CustomerCreateUseCase( new CustomerRepository());
  try {
    const custumerDto = {
      name: req.body.name,
      address:{ 
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city
      }
    }
    const output = await usecase.execute(custumerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase( new CustomerRepository());
  const output = await usecase.execute({});
  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.toXML(output))
  });
});
