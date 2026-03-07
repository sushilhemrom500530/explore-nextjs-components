"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import PaymentPage from "../stripe-pay/payment";

const Editor = dynamic(() => import("../text-editor"));

export default function ViewAllContent() {
  const editorInstanceRef = useRef<any>(null);

  const handleSubmit = () => {
    const content = editorInstanceRef.current?.getValue();
    console.log(content);
  };

  return (
    <div>
      {/* <Editor
        ref={editorInstanceRef}
        onSave={(contents: string) => console.log(contents)}
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded cursor-pointer"
      >
        Submit
      </button> */}
      <PaymentPage />
    </div>
  );
}
