import { ToastContainer as Container } from "react-toastify";

interface ToastProps {
  duration?: number;
}

export const ToastContainer = ({ duration = 5000 }: ToastProps) => {
  return (
    <Container
      closeButton={false}
      position="top-right"
      autoClose={duration}
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
