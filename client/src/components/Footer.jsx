const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-10 shadow-inner">
      <div className="text-center text-gray-700 text-sm">
        © {new Date().getFullYear()} Notes App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
