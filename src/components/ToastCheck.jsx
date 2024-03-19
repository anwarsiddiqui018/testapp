import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Hello = () => {
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    setSuccess(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
      <ToastContainer />
      {success &&
        toast.success("Success!", {
          position: "top-center",
          autoClose: 5000,
        })}
    </div>
  );
};

export default Hello;
