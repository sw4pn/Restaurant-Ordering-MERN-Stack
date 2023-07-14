import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-6xl p-4 lg:p-6 xl:p-10 mx-auto">{children}</div>;
};

export default Container;
