import { X } from "lucide-react";
import React from "react";

const Modalbox = (props: any) => {
  const { children, isOpen, onClose } = props;

  if (!isOpen) return false;
  return (
    <>
      <div
        className={`w-screen h-screen fixed left-0 top-0 flex overflow-auto p-10 justify-center items-center`}
      >
        <div className="fixed inset-0 bg-black z-1 opacity-50" />
        <div
          className={`bg-white p-6 xs:w-3/4 md:w-2/4 xl:w-1/4 relative rounded-none w-full top-0 h-max flex flex-col gap-2 z-20`}
        >
          <X
            onClick={() => onClose(false)}
            className="w-5 h-5 self-end cursor-pointer text-black"
          />
          <div className={"bg-white"}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modalbox;
