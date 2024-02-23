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
            <DropdownItem as={Link} to={"/user/profile"}>
              Profile
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem as={Link} to={"/user/product/create"}>
              Create Product
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem as={Link} to={"/user/products"}>
              Your Products
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        )}
        {!isLoggedIn && (
          <Button
            as={Link}
            to={"/login"}
            gradientDuoTone="purpleToBlue"
            pill="true"
            className="mr-3"
          >
            Login
          </Button>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active>
          Home
        </NavbarLink>
        <NavbarLink>
          <Dropdown arrowIcon={true} inline={true} label="Categories">
            <DropdownItem as={Link} to="/category/electronics">
              Electronics
            </DropdownItem>
            <DropdownItem as={Link} to="/category/cycles">
              Bicycles
            </DropdownItem>
            <DropdownItem as={Link} to="/category/mattresses">
              Mattresses
            </DropdownItem>
            <DropdownItem as={Link} to="/category/books">
              Books & Notes
            </DropdownItem>
            <DropdownItem as={Link} to="/category/fashion">
              Fashion
            </DropdownItem>
            <DropdownItem as={Link} to="/category/fitness">
              Gym & Fitness
            </DropdownItem>
          </Dropdown>
        </NavbarLink>
        <NavbarLink as={Link} to="/products">
          Products
        </NavbarLink>
        <NavbarLink href="#">Support</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
