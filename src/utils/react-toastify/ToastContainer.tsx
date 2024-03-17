import { ToastContainer as Container } from "react-toastify";

interface ToastProps {
  autoClose?: boolean;
  duration?: number;
}

export const ToastContainer = ({
  autoClose = false,
  duration = 3000,
}: ToastProps) => {
  return (
    <Container
      closeButton={false}
      position="top-right"
      autoClose={autoClose && duration}
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
