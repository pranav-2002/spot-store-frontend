import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Navbar fluid rounded className="sticky top-0 z-50">
      <Link to={"/"}>
        <img
          src="https://d33wubrfki0l68.cloudfront.net/b891ad524a09a29d768b6ffdbf5f52bb0c6da7e1/47f53/img/vitspot-logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="VITSpot Logo"
        />
      </Link>
      <div className="flex md:order-2">
        {isLoggedIn && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
                className="mr-3"
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </DropdownHeader>
            <DropdownItem>Profile</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        )}
        {!isLoggedIn && (
          <Link to={"/login"}>
            <Button gradientDuoTone="purpleToBlue" pill="true" className="mr-3">
              Login
            </Button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">
          <Dropdown arrowIcon={true} inline={true} label="Categories">
            <DropdownItem>Electronics</DropdownItem>
            <DropdownItem>Bicycles</DropdownItem>
            <DropdownItem>Bed & Mattresses</DropdownItem>
            <DropdownItem>Books & Notes</DropdownItem>
            <DropdownItem>Fashion</DropdownItem>
            <DropdownItem>Gym & Fitness</DropdownItem>
          </Dropdown>
        </NavbarLink>
        <NavbarLink href="#">Products</NavbarLink>
        <NavbarLink href="#">Support</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
