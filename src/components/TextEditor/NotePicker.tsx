"use client";

import React, { useState } from "react";
import Tiptap from "./Tiptap";

const Todo = () => {
  const [content, setContent] = useState<string>("");
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      content: content,
    };
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full grid place-items-center mx-auto pt-10 mb-10"
    >
      <div className="text-3xl text-center text-black-500 mb-10">
        Notes Picker
      </div>
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default Todo;