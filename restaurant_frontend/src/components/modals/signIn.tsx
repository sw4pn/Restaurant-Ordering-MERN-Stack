"use client";

import { ReactNode, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
// import { FloatInput } from "../ui/FloatInput";
import { Button } from "../ui/Button";
// import SocialIcons from "./SocialIcons";
// import Spacer from "./ui/Spacer";
import { AiOutlineClose } from "react-icons/ai";

import { ScrollArea } from "../ui/ScrollArea";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
// import { DialogClose } from "@radix-ui/react-dialog";
import { object, string } from "yup";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAuthState,
  selectAuthUser,
  selectIsAuthenticated,
} from "../../features/auth/authSlice";

const emailSchema = object({
  email: string()
    .email("Please enter valid email id")
    .required("Email id is required."),
  password: string().required("Password is required."),
});

const SignInModal = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const dispatch: any = useDispatch();

  const { authSuccess, authError, authLoading, user } =
    useSelector(selectAuthState);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!authLoading && authSuccess && user) {
      toast.success("Logged in successfully.");
    }
    if (!authLoading && authError) {
      toast.error("Authentication failed.");
    }
  }, [user, isAuthenticated]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "demouser@example.com",
      password: "123456",
    },
    validationSchema: emailSchema,

    onSubmit: async (values) => {
      //
      dispatch(
        loginUser({ email: values.email, password: values.password })
      ).then(() => {
        formik.setSubmitting(false);
      });
    },
  });

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className={className}>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent
          //   className="h-[95%]"
          className=" rounded-xl bg-neutral-100 relative"
          //   className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:max-w-[480px] md:max-w-[980px] p-0 rounded-xl  max-h-[680px] overflow-hidden"
        >
          <ScrollArea className="h-[calc(100vh_-_200px)] flex justify-between items-center  ">
            <AlertDialogTitle className="flex  items-center justify-center py-4 border-b border-gray-300">
              <h2 className="text-lg font-medium">Restaurant</h2>
            </AlertDialogTitle>
            <form onSubmit={formik.handleSubmit} className=" pt-16">
              <div className="max-w-[290px] mx-auto text-primary font-inter">
                <div className="flex flex-col justify-center items-center gap-10 ">
                  <div className="relative">
                    <Label
                      htmlFor="login_email"
                      className="absolute -top-3 z-10 px-2 py-0 text-sm font-normal text-indigo-600 left-2 font-poppins bg-background">
                      Email
                    </Label>
                    <Input
                      type="text"
                      id="login_email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      className="border-indigo-400 w-72 focus:ring-1"
                    />
                    {formik.touched.email && (
                      <span className="block text-sm text-red-400">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Label
                      htmlFor="login_password"
                      className="absolute -top-3 z-10 px-2 py-0 text-sm font-normal text-indigo-600 left-2 font-poppins bg-background">
                      Password
                    </Label>
                    <Input
                      type="text"
                      id="login_email"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      className="border-indigo-400 w-72 focus:ring-1"
                    />
                    {formik.touched.password && (
                      <span className="block text-sm text-red-400">
                        {formik.errors.password}
                      </span>
                    )}
                  </div>
                  {/* <AlertDialogAction> */}
                  <Button
                    type="submit"
                    variant="default"
                    className="w-full tracking-[0.11rem] font-medium text-base font-poppins"
                    disabled={formik.isSubmitting}>
                    Sign In
                  </Button>
                  {/* </AlertDialogAction> */}

                  <AlertDialogCancel>Close</AlertDialogCancel>
                </div>
              </div>
            </form>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SignInModal;
