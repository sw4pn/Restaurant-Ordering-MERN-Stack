import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllOrders, selectAllOrders } from "../features/order/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";

const OrderList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const orders = useSelector(selectAllOrders);

  const ordersList = Object.values(orders) ?? [];

  useEffect(() => {
    dispatch(getAllOrders()).then(() => setLoading(false));
  }, []);

  return (
    <div className="p-10">
      <h1 className=" text-center text-xl font-semibold">OrderList</h1>
      <div className="">
        {loading ? (
          <div className="flex flex-col p-4 my-2 border-2 rounded-md gap-4">
            <Skeleton className="h-12 w-20" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : orders && ordersList.length > 0 ? (
          ordersList.map((order, i) => (
            <div
              key={i}
              className="flex flex-col p-4 my-2 border-2 rounded-md ">
              <div className="max-w-sm py-2 mb-2 border-b text-neutral-500">
                Order ID:
                <span className="ml-4 font-semibold text-teal-600">
                  {order._id}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 py-2 text-neutral-400 ">
                <div className="flex flex-col gap-2">
                  Order placed:
                  <span className="text-teal-600">
                    {moment(order.orderTime).format("DD MMM YYYY, HH:MM")}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  Delivery Status
                  <span className="font-semibold text-teal-600 py-1 px-2 border border-orange-300">
                    {order.deliveryStatus}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  Amount:
                  <span className="text-teal-600 ">₹ {order.totalPrice}</span>
                </div>
                <div className="flex flex-col gap-2">
                  Payment Status
                  <span className="p-1 font-semibold text-center text-teal-600 border border-orange-400">
                    Paid
                  </span>
                </div>
                <div className="text-teal-600">
                  {order.orderItems?.length} items
                </div>
                <Button
                  variant="outline"
                  className="bg-neutral-700 text-white hover:border-neutral-600"
                  onClick={() => navigate(`/order/${order._id}`)}>
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="font-semibold text-gray-400 text-center py-10">
            No orders,
            <Link to="/" className="px-2 mx-0 text-blue-400 hover:underline">
              Order your first dish now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
