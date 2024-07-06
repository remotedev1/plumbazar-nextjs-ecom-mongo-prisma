import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <Image id="logo" src="/light-logo.png" alt="" width={60} height={60} />
    </div>
  );
};

export default Loading;
