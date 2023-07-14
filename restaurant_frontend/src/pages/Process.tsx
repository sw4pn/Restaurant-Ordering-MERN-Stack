import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getADish, selectADish } from "../features/dish/dishSlice";
import { truncateTitle } from "../components/DishCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useFormik } from "formik";
import { Label } from "../components/ui/Label";
import {
  createOrder,
  resetOrderState,
  selectOrderState,
} from "../features/order/orderSlice";
import toast from "react-hot-toast";

const Process = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  let { id } = useParams();

  const dish = useSelector(selectADish);

  const {
    orderError,
    orderSuccess,
    orderLoading,
    order,
    createdOrder,
    orderMessage,
  } = useSelector(selectOrderState);

  useEffect(() => {
    if (id) {
      dispatch(getADish(id)).then(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (!orderLoading && orderSuccess && createdOrder) {
      toast.success("Order placed successfully.");
      navigate(`/order/${createdOrder._id}`);
      dispatch(resetOrderState());
    }

    if (!orderLoading && orderError) {
      toast.error(orderMessage ?? "Error placing order...");
      dispatch(resetOrderState());
    }
  }, [orderError, orderSuccess, orderLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: 1,
      address: "HN 11/201, Xt.Saviour Road, Mumbai",
      pinCode: 411001,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
    },
    onSubmit: (values) => {
      //
      if (!dish) return;
      const dateNow = new Date().toISOString();
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);

      const data = {
        shippingInfo: {
          address: values.address,
          city: values.city,
          pinCode: values.pinCode,
          state: values.state,
          country: values.country,
        },
        orderItems: [
          {
            dish: id,
            price: dish.price,
            quantity: values.quantity,
          },
        ],
        estDelivery: deliveryDate.toISOString(),
        orderTime: dateNow,
        orderedBy: "64aff0bd622d7a4300cbda61",
      };

      dispatch(createOrder(data)).then(() => {
        formik.setSubmitting(false);
      });
    },
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value);
    formik.setFieldValue("quantity", quantity);
  };

  return (
    <div className="border p-5 flex flex-wrap gap-5 justify-between">
      {loading ? (
        <>Loading....</>
      ) : (
        <>
          <div className="">
            <h2 className="text-2xl font-semibold uppercase text-orange-800">
              Order Details:
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap gap-10 justify-between p-4 mt-10">
                <img
                  src={dish?.image}
                  alt="DISH"
                  className="h-32 w-32 sm:h-60 sm:w-60 object-contain"
                />
                <div className="flex flex-col gap-4 justify-start ">
                  <h4 className="text-xl font-semibold">{dish?.name}</h4>
                  <div className="max-w-sm text-zinc-500 py-2">
                    {truncateTitle(dish?.description, 100)}
                  </div>
                  <div className="p-2 text-2xl font-bold text-yellow-700">
                    ₹ {dish?.price}
                  </div>
                  <div className="flex justify-start items-center gap-8">
                    Quantity:
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-orange-200"
                        disabled={formik.values.quantity < 2}
                        onClick={() =>
                          formik.setFieldValue(
                            "quantity",
                            formik.values.quantity - 1
                          )
                        }>
                        -
                      </Button>
                      <Input
                        type="number"
                        min={1}
                        className="w-20 h-10 text-center"
                        value={formik.values.quantity}
                        onChange={(e) => handleQuantityChange(e)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-orange-200"
                        disabled={formik.values.quantity > 10}
                        onClick={() =>
                          formik.setFieldValue(
                            "quantity",
                            formik.values.quantity + 1
                          )
                        }>
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="mt-10" />
              <div className="p-10 flex justify-center flex-col ">
                <h2 className="text-2xl text-neutral-500 font-semibold">
                  Shipping Info:
                </h2>
                <div className="pl-5 py-10 flex flex-col gap-5">
                  <div className="">
                    <Label htmlFor="order_address">Address:</Label>
                    <Input
                      id="order_address"
                      type="text"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="order_city">City:</Label>
                    <Input
                      id="order_city"
                      type="text"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="order_pinCode">PinCode:</Label>
                    <Input
                      id="order_pinCode"
                      type="number"
                      value={formik.values.pinCode}
                      onChange={formik.handleChange("pinCode")}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="order_state">State:</Label>
                    <Input
                      id="order_state"
                      type="text"
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="order_country">Country:</Label>
                    <Input
                      id="order_country"
                      type="text"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                    />
                  </div>
                </div>
                <div className="py-5 text-end">
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-green-600 text-white text-lg h-12 hover:bg-green-700/80 hover:text-white"
                    size="lg"
                    disabled={formik.isSubmitting}>
                    Place Order
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Process;
