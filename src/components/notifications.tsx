import { Slide, toast, ToastContent, ToastOptions } from "react-toastify";

const defaultOptions = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  closeButton: true,
  transition: Slide,
};

export const notificationSuccess = (
  message: ToastContent,
  options?: ToastOptions
): void => {
  toast.success(message, {
    ...defaultOptions,
    ...options,
    theme: "colored",
  });
};

export const notificationError = (
  message: ToastContent,
  options?: ToastOptions
): void => {
  toast.error(message, {
    ...defaultOptions,
    ...options,
    theme: "colored",
  });
};

export const notificationWarning = (
  message: ToastContent,
  options?: ToastOptions
): void => {
  toast.warning(message, {
    ...defaultOptions,
    ...options,
    theme: "colored",
  });
};
