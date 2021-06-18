type Props = {
  label: string;
  onClick: () => void;
};

const Button = (props: Props) => {
  return (
    <button
      className="bg-red-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200 fit-content inline-block"
      onClick={props.onClick}
    >
      Clear All
    </button>
  );
};

export default Button;
