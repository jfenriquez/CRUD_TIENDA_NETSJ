import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import { FaArrowDownWideShort } from "react-icons/fa6";
const Search = () => {
  return (
    <center>
      <div className="join text-center">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
            />
          </div>
        </div>

        {/* FILTRO CATEGORY */}
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn join-item">
            <IoFilterSharp className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="luxury"
                value="luxury"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="osc"
                value="dim"
              />
            </li>
          </ul>
        </div>
        {/* FILTRO ORDER */}    
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn join-item ">
            <FaArrowDownWideShort className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="luxury"
                value="luxury"
              />
            </li>
          </ul>
        </div>
      </div>
    </center>
  );
};

export default Search;
