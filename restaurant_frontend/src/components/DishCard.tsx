import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";

export const truncateTitle = (str: string | undefined, n = 50) => {
  if (!str) return str;
  return str?.length > n ? str.slice(0, n - 1) + "..." : str;
};

const DishCard = ({ dish }: { dish: Dish }) => {
  const description = truncateTitle(dish.description);
  const navigate = useNavigate();

  const handleOrder = (id: string | undefined) => {
    navigate(`/process-order/${id}`);
  };

  return (
    <div className="border flex flex-col justify-center items-center max-w-xs p-2 overflow-hidden group">
      <div className="w-72">
        <img
          src={dish.image}
          alt="Dish"
          className="w-72 h-60 bg-contain object-cover hover:scale-110 transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="flex-1 p-3 pb-0 group-hover:bg-neutral-50">
        <h2 className="font-semibold text-lg py-1">{dish.name}</h2>
        <div className="text-slate-400">{description}</div>
        <div className="flex py-3 justify-between items-center">
          <p className="text-orange-600 font-bold text-xl">₹ {dish.price}</p>
          <Button variant="default" onClick={() => handleOrder(dish._id)}>
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
