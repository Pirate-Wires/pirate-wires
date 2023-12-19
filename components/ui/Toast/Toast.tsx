import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class ToastableError extends Error {
  statusCode: number | null;

  constructor(message: string, statusCode?: number | null) {
    super(message);
    this.statusCode = statusCode ?? null;
  }
}

export class ToastUtil {
  static showLoadingToast() {
    return toast.loading("Loading", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  }

  static showErrorToast(error: ToastableError) {
    this.dismissToast();
    if (error) {
      return toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
      });
    }
  }

  static showSuccessToast(message: string) {
    return toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "dark",
    });
  }

  static dismissToast() {
    return toast.dismiss();
  }
}

export default function Toast() {
    return (
        <div>
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
            />
        </div>
    );
}
