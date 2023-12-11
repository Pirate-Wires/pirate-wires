import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class ToastableError extends Error {
    statusCode: number | null;

    constructor(message: string, statusCode?: number | null) {
        super(message);
        this.statusCode = statusCode ?? null;
    }
}

export class ToastUtil {
    static showLoadingToast() {
        return toast.loading('Loading', {
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
            var message = error.message;
            if (error.statusCode && error.statusCode === 500) {
                message = "Internal server error";
            } else if (error.statusCode && error.statusCode === 400) {
                message = "Error. Bad request";
            } else if (error.statusCode && error.statusCode === 404) {
                message = "Error. Not found";
            } else if (error.statusCode && error.statusCode === 401) {
                message = "Error. Unauthorized";
            } else if (error.statusCode && error.statusCode === 403) {
                message = "Error. Forbidden";
            } else if (error.statusCode && error.statusCode === 409) {
                message = "Error. Conflict";
            } else if (error.statusCode && error.statusCode === 503) {
                message = "Error. Service unavailable";
            } else if (error.statusCode && error.statusCode === 429) {
                message = "Error. Too many requests";
            } else if (error.statusCode && error.statusCode === 502) {
                message = "Error. Bad gateway";
            } else if (error.statusCode && error.statusCode === 408) {
                message = "Error. Request timeout";
            } else if (error.statusCode && error.statusCode === 504) {
                message = "Error. Gateway timeout";
            }
            return toast.error(message, {
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
