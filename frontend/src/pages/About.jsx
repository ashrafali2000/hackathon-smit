import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            About Ashra's Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              I'm a passionate and dedicated MERN stack developer with a deep
              love for crafting elegant and efficient web applications. With
              several years of experience in the field, I've honed my skills in
              creating dynamic and responsive websites that not only meet client
              expectations but also push the boundaries of innovation.
            </p>
            <p>
              My journey into the world of web development began with a
              curiosity for how websites functioned behind the scenes. This
              curiosity quickly turned into a passion, leading me to dive deep
              into learning HTML, CSS, and JavaScript. Over time, I discovered
              the power of full-stack development and specialized in the MERN
              stack, which includes MongoDB, Express.js, React.js, and Node.js.
            </p>
            <p>
              I believe in continuous learning and staying updated with the
              latest trends and technologies in web development. My approach is
              centered around understanding the unique needs of each project and
              delivering solutions that are not only functional but also
              intuitive and visually appealing. Collaboration and communication
              are key to my work ethic, ensuring that every project I undertake
              is a success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
