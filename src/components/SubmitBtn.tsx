import { useGlobalContext } from "../context";

const SubmitBtn = () => {
  const { isLoading } = useGlobalContext();
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`inline-flex w-full text-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm cursor-pointer text-base font-medium text-white ${
        isLoading
          ? "bg-indigo-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      }`}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          loading...
        </div>
      ) : (
        <p className="text-center w-full">submit</p>
      )}
    </button>
  );
};

export default SubmitBtn;
