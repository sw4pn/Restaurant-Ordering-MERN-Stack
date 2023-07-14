import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
import Process from "./pages/Process";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="/process-order/:id" element={<Process />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
