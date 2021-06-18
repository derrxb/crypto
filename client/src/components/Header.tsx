import CryptoIcon from "./icons/Logo";

const Header = () => {
  return (
    <nav className="flex flex-col m-5 lg:m-20 lg:my-5 border-b-2 border-gray-100 py-6">
      <div className="flex items-center">
        <CryptoIcon />

        <span className="text-2xl font-bold text-purple-900 ml-2">
          Cryptoland
        </span>
      </div>
    </nav>
  );
};

export default Header;
