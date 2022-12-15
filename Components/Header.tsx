import React from "react";
import {BsList } from "react-icons/bs";
import Link from 'next/link'
 function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-5 text-black">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
            <div
              className="inline-block py-2 mr-4 font-serif text-2xl font-bold leading-relaxed uppercase whitespace-nowrap cursor-pointer"
            >
              Mailer Daemon
            </div>
            </Link>
            <button
              className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <BsList />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 text-sm font-bold leading-snug uppercase hover:opacity-75"
                  href="https://placementor-iit-dhanbad.onrender.com" target="_blank"
                >
                  <i className="text-lg opacity-75 fab fa-facebook-square leading-lg"></i><span className="ml-2">Placementor</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 text-sm font-bold leading-snug uppercase hover:opacity-75"
                  href="https://www.iitism.ac.in/iitismnew/" target="_blank"
                >
                  <i className="text-lg opacity-75 fab fa-twitter leading-lg"></i><span className="ml-2">IIT ISM </span>
                </a>
              </li>
              {/* <li className="nav-item">
                <a
                  className="flex items-center px-3 py-2 font-bold leading-snug uppercase text-smrdeszdsz hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg opacity-75 fab fa-pinterest leading-lg"></i><span className="ml-2">Signing Off</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
  

    export default Header;
