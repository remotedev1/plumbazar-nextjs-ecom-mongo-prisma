import Link from "next/link";

const Billboard = ({ data }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className=" bg-white rounded-xl overflow-hidden">
        <Link
          href={{
            pathname: "/products",
            query: { category: data?.category?.name },
          }}
        >
          <div className="p-2  rounded-xl overflow-hidden">
            <div
              style={{ backgroundImage: `url(${data?.imageUrl})` }}
              className="rounded-xl w-full h-[20vh] sm:h-[20vh]  md:h-[35vh] lg:h-[60vh]  overflow-hidden bg-cover    bg-center bg-no-repeat"
            >
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                <div className="font-bold text-black text-lg md:text-3xl  lg:text-6xl sm:max-w-xl max-w-xs">
                  {/* {data.label} */}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Billboard;
