const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary/20 overflow-y-scroll p-5">
      {children}
    </div>
  );
};

export default AuthLayout;
