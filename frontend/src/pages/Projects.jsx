import React from "react";
import CallToAction from "../components/CallToAction";

export default function Projects() {
  return (
    <div className="min-h-screen mx-auto max-w-2xl flex items-center justify-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md text-gray-500 text-center">
        Thank you for visiting my blog! I hope you find the content here
        insightful and inspiring as you embark on your own web development
        journey.
      </p>
      <CallToAction />
    </div>
  );
}
