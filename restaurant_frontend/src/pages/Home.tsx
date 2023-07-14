import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDishes, selectAllDishes } from "../features/dish/dishSlice";
import DishCard from "../components/DishCard";
import DishSkeleton from "../components/DishSkeleton";

const Home = () => {
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true);

  const allDishes = useSelector(selectAllDishes);

  useEffect(() => {
    dispatch(getAllDishes()).then(() => setLoading(false));
  }, []);

  return (
    <div className="p-10">
      {loading ? (
        <div className="flex flex-wrap justify-center items-center gap-8">
          <DishSkeleton />
          <DishSkeleton />
          <DishSkeleton />
          <DishSkeleton />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center  gap-2 lg:gap-4">
          {allDishes?.map((item, i) => (
            <DishCard dish={item} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
