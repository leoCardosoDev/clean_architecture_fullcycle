import OrderRepositoryInterface from "../../../domain/checkout/repository/order_repository_interface";
import OrderItemModel from "./sequilize/model/order_item_model";
import OrderModel from "./sequilize/model/order_model";
import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    entity.items.map((item) => {
      let orderItem = OrderItemModel.findOne({ where: { id: item.id } });
      if (orderItem) {
        OrderItemModel.update(
          {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
          },
          {
            where: { id: item.id },
          }
        );
      }
    });
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    const orderItemModels = await OrderItemModel.findAll();
    const items: OrderItem[] = [];
    orderItemModels.map((item) =>
      items.push(
        new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity
        )
      )
    );
    const orderModel = await OrderModel.findOne({ where: { id } });
    return new Order(orderModel.id, orderModel.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    const orderItemModels = await OrderItemModel.findAll();
    const orders: Order[] = [];
    orderModels.map((order) => {
      const items: OrderItem[] = [];
      orderItemModels.map((item) => {
        if (item.order_id === order.id)
          items.push(
            new OrderItem(
              item.id,
              item.product_id,
              item.name,
              item.price,
              item.quantity
            )
          );
      });
      orders.push(new Order(order.id, order.customer_id, items));
    });
    return orders;
  }
}
