import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex p-3 flex-col sm:flex-row border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Next.js?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 Next.js Projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none "
        >
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Learn more
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230202143636/NEXT-js-tutorial-1.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default CallToAction;
