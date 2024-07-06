export const Header = ({ label }) => {
  return (
    <div className=" w-full flex flex-col gap-y-4 justify-between items-center">
      <h1 className="text-3xl font-semibold">🔒 Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
