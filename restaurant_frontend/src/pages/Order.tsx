import { useEffect, useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { buttonVariants } from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, selectOrder } from "../features/order/orderSlice";
import moment from "moment";
import { truncateTitle } from "../components/DishCard";

const Order = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const dispatch: any = useDispatch();

  const order = useSelector(selectOrder);

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id)).then(() => setLoading(false));
    }
  }, [id]);

  const orderTime = order
    ? moment(order.orderTime).format(" DD MMM YYYY - HH:mm")
    : "- - -";

  const dishList = order?.orderItems?.map((item, i) => {
    const dish = item.dish as Dish;
    if (!dish) return;
    const thumb = dish.image;

    return (
      <div
        key={i}
        className="flex justify-between px-2 sm:px-5 md:px-10 py-2 my-2 border-b">
        <div className="border border-teal-200 rounded-sm bg-neutral-50">
          <img src={thumb} alt="thumb" className="w-20 h-20 p-2" />
        </div>
        <div className="flex flex-col flex-1 px-2 ml-2 ">
          <span className="pb-1 text-lg font-semibold">{dish.name}</span>
          <span className="pb-1 max-w-sm text-sm text-neutral-500 hidden md:block">
            {truncateTitle(dish.description, 100)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="">₹ {item.price}</div>
          <div className="">Qty: {item.quantity}</div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="p-10">
        <Link to="/orders" className={buttonVariants({ variant: "outline" })}>
          <AiFillCaretLeft size={20} className="inline mx-2" /> Back To All
          Orders
        </Link>
      </div>

      <div className="px-4 md:px-10 ">
        {loading ? (
          "Loading...."
        ) : (
          <>
            <div className="flex flex-col justify-start gap-2 p-4 text-teal-600 bg-neutral-100">
              <div className="">
                Order ID:
                <span className="pl-4 font-semibold">{order?._id}</span>
              </div>
              <div className="">
                Delivery status:
                <span className="pl-4 font-semibold">
                  {order?.deliveryStatus}
                </span>
              </div>
              <div className="">
                Order date: <span className="pl-4">{orderTime}</span>
              </div>
            </div>

            {dishList}

            <div className="p-4 bg-neutral-50 text-neutral-500">
              <div className="py-2">
                Payment Status:
                <span className="pl-4 font-semibold text-teal-600">Paid</span>
              </div>
              <div className="py-2 text-teal-600">
                <div className="max-w-xs pb-2 text-teal-600 border-b ">
                  Delivery:
                </div>
                <div className="px-4 py-2">
                  {order?.shippingInfo?.address}
                  <br /> {order?.shippingInfo?.city}
                  <br /> {order?.shippingInfo?.pinCode}
                  <br /> {order?.shippingInfo?.state}
                  <br /> {order?.shippingInfo?.country}
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-100">
              <div className="font-semibold text-teal-500">Order Summary:</div>
              <div className="flex flex-col gap-2 p-4">
                <div className="max-w-xs pt-2 text-lg border-t">
                  Total:
                  <span className="px-4 py-2 font-semibold text-orange-600 font-rubik">
                    ₹ {order?.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
