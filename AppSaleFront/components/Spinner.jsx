export function Spinner() {
    return (
        <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 24 24">
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                ></path>
            </svg>
        </div>
    );
}
