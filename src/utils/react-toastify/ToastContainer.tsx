import { ToastContainer as Container } from "react-toastify";

export const ToastContainer = () => {
  return (
    <Container
      closeButton={false}
      position="top-right"
      autoClose={5000}
      // hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
    />
  );
};
