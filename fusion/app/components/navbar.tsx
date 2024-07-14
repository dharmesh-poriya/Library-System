const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a href="/">Home 🏠</a></li>
          <li>
            <a>Services 🔨</a>
            <ul className="p-2">
              <li><a>Website 🌐</a></li>
              <li><a>Design 💪🏻</a></li>
            </ul>
          </li>
          <li><a href="/about">About us ⚙️</a></li>
        </ul>
      </div>
      <a className="btn btn-ghost text-xl" href="/">Vashishth Patel 🚀</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><a href="/">Home 🏠</a></li>
        <li>
          <details>
            <summary>Services 🔨</summary>
            <ul className="p-2">
            <li><a>Website 🌐</a></li>
            <li><a>Design 💪🏻</a></li>
            </ul>
          </details>
        </li>
        <li><a href="/about">About us ⚙️</a></li>
      </ul>
    </div>
    <div className="navbar-end">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://api.dicebear.com/9.x/lorelei/svg?seed=10" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile 🖼️
            <span className="badge badge-primary">New</span>
          </a>
        </li>
        <li><a>Settings ⚙️</a></li>
        <li><a>Logout 🚀</a></li>
      </ul>
    </div>
    </div>

  </div>
  );
};

export default Navbar;
