export const Header = ({ label }) => {
  return (
    <div className=" w-full flex flex-col gap-y-4 justify-between items-center">
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
