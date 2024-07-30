import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <Image id="logo" src="/light-logo.png" alt="" width={100} height={100} />
    </div>
  );
};

export default Loading;
