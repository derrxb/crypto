import CryptoIcon from "./icons/Logo";

const Header = () => {
  return (
    <nav className="flex flex-col py-2 mx-5 lg:mx-10">
      <div className="flex align-middle">
        <CryptoIcon />

        <span className="text-lg font-bold text-purple-900 ml-2">
          Cryptoland
        </span>
      </div>
    </nav>
  );
};

export default Header;
