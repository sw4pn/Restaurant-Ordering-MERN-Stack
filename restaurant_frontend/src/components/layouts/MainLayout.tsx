import Header from "../commons/Header";
import Footer from "../commons/Footer";
import Container from "../commons/Container";
import { Link, Outlet } from "react-router-dom";
import { buttonVariants } from "../ui/Button";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="py-4 border-y flex justify-between items-center">
            <div className="flex justify-center items-center gap-4">
              <Link to="/" className={buttonVariants({ variant: "secondary" })}>
                Home
              </Link>
              <Link
                to="/orders"
                className={buttonVariants({ variant: "secondary" })}>
                Orders List
              </Link>
            </div>
            <div className="">
              Logged in as <b>DemoUser@example.com</b>
            </div>
          </div>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default MainLayout;
