import { auth } from "@/auth";
import React from "react";

const Profile = async () => {
  const { user } = await auth();
  return (
    <div className="max-w-72 px-4 mx-auto ">
      <div className="relative flex flex-col min-w-0 break-words border-2 w-full mb-6 shadow-xl rounded-lg mt-16 bg-white">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="absolute w-[4.5rem] h-[4.5rem] -top-5  overflow-hidden  rounded-full bg-slate-200">
                <svg
                  className=" text-gray-400 w-[4rem] h-[4rem] mx-auto"
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
            {/* <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    22
                  </span>
                  <span className="text-sm text-blueGray-400">Friends</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                  <span className="text-sm text-blueGray-400">Photos</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    89
                  </span>
                  <span className="text-sm text-blueGray-400">Comments</span>
                </div>
              </div>
            </div> */}
          </div>
          <div className="text-center mt-20">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              {user.name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
              {user.email}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              {user?.address && Object.keys(user.address).map((key) => (
                <div key={key} className="text-sm leading-normal  ">
                  <strong className="capitalize">{key} : &nbsp; </strong>
                  {user.address[key]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
