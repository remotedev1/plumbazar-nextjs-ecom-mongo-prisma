
const Billboard = ({ data }) => {
  return (
      <div
        className="relative overflow-hidden bg-cover bg-center h-[60vh] lg:min-h-screen flex items-center justify-center w-full"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1538474705339-e87de81450e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        {/* Hero content */}
        <div className="text-center text-white p-6">
         
          <a
            href="#cta"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Call to Action
          </a>
        </div>

        {/* SVG wave effect */}
        <div className="absolute -bottom-8 left-0 right-0">
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,160L80,170.7C160,181,320,203,480,208C640,213,800,203,960,181.3C1120,160,1280,128,1360,112L1440,96V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
            ></path>
          </svg>
        </div>
      </div>
  );
};

export default Billboard;
