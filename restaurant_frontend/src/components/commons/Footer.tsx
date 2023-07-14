const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-4 border-y bg-neutral-100 text-neutral-600 border-slate-300">
      <div className="font-medium">Assignment for Fleksa.</div>
      <div className="text-sm text-center uppercase text-neutral-500">
        --- Developed With ---
      </div>
      <div className="text-sm text-neutral-500">
        Frontend: ReactJS, TailwindCSS & Redux State Management
      </div>
      <div className="text-sm text-neutral-500">
        Backend: ExpressJS, MongoDB, Mongoose
      </div>
    </footer>
  );
};

export default Footer;
