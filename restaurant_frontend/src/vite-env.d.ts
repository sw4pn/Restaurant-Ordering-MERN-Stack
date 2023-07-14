/// <reference types="vite/client" />

enum DeliveryStatus {
  "Not Processed",
  "Cash on Delivery",
  "Processing",
  "Dispatched",
  "Cancelled",
  "Delivered",
  "Processing Return",
  "Return Complete",
  "Refund Complete",
}

type Dish = {
  _id?: string;
  name: string;
  image: string;
  description: string;
  price: number;
};

type OrderItem = {
  dish: Dish | string | undefined;
  price: number;
  quantity: number;
};

type Order = {
  _id?: string;
  shippingInfo: {
    address: string;
    city: string;
    pinCode: number;
    state: string;
    country: string;
  };
  orderedBy?: User._id | undefined;
  orderItems: OrderItem[];
  totalPrice?: number;
  deliveryStatus?: DeliveryStatus;
  estDelivery: string;
  orderTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type User = {
  _id?: string;
  email: string;
  password?: string;
  refreshToken?: string;
};
