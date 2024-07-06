import Container from "../ui/container";

export const Testimonials = () => {
  const data = [
    {
      text: '"lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis. Proin viverra risus vitae facilisis bibendum."',
      name: "abc,",
      resident: "Banglore, India",
    },
    {
      text: '"lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis. Proin viverra risus vitae facilisis bibendum."',
      name: "xyz,",
      resident: "Mangalore, India",
    },
  ];
  return (
    <div className="min-w-screen  flex items-center justify-center">
      <Container>
        <div className="w-full bg-white px-5 pt-16  text-gray-800">
          <div className="w-full mx-auto">
            <div className="text-center mx-auto">
              <h1 className="text-4xl md:text-7xl font-bold mb-5 text-gray-600">
                What people <br />
                are saying.
              </h1>

              <div className="text-center mb-10">
                <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1" />
                <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1" />
                <span className="inline-block w-40 h-1 rounded-full bg-indigo-500" />
                <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1" />
                <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1" />
              </div>
            </div>
            <div className="-mx-3 md:flex items-start">
              {data.map((d, i) => (
                <div className="px-3 md:w-1/3" key={`${d.name}-${i}`}>
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                          <svg
                            className="absolute w-12 h-12 text-gray-400 -left-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="flex-grow pl-3">
                        <div className="mt-3 text-lg font-semibold">
                          {d.name}
                        </div>
                        <div> {d.resident} </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="relative p-5">
                        <div className="overflow-hidden ">
                          <p className="mb-0 font-italic text-md">{d.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
