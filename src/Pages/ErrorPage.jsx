import { useLocation, useNavigate } from "react-router-dom";

const getErrorConfig = ({error}) => {
    const status = error?.status || error?.response?.status || 500;

    switch (status) {
        case 401:
            return {
                title: "Unauthorized",
                message: "You are not logged in or your session expired.",
                actionText: "Go to Login",
                actionPath: "/login",
            };

        case 403:
            return {
                title: "Forbidden",
                message: "You don’t have permission to access this resource.",
                actionText: "Go Home",
                actionPath: "/",
            };

        case 404:
            return {
                title: "Page Not Found",
                message: "The page you are looking for does not exist.",
                actionText: "Go Home",
                actionPath: "/",
            };

        case 500:
        default:
            return {
                title: "Something Went Wrong",
                message:
                    error?.message ||
                    "An unexpected error occurred. Please try again later.",
                actionText: "Retry",
                actionPath: null,
            };
    }
};

const ErrorPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const error = state?.error || {};
    const { title, message, actionText, actionPath } = getErrorConfig(error);

    const handleAction = () => {
        if (actionPath) navigate(actionPath);
        else window.location.reload();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">{title}</h1>
            <p className="text-gray-600 max-w-md mb-6">{message}</p>

            <button
                onClick={handleAction}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                {actionText}
            </button>
        </div>
    );
};

export default ErrorPage;
