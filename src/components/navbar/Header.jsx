import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  NavbarBrand,
  Button,
} from "flowbite-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const handleSignOut = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const location = window.location.href.split("/")[3];

  return (
    <Navbar fluid rounded className="sticky top-0 z-50 shadow-md rounded-sm">
      <NavbarBrand as={Link} to={"/"}>
        <img
          src="https://d33wubrfki0l68.cloudfront.net/b891ad524a09a29d768b6ffdbf5f52bb0c6da7e1/47f53/img/vitspot-logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="VITSpot Logo"
        />
      </NavbarBrand>
      <div className="flex md:order-2">
        {token && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="Spot Store User"
                rounded
                bordered
                className="mr-3"
                placeholderInitials={
                  jwtDecode(token).firstName[0].toUpperCase() +
                  jwtDecode(token).lastName[0].toUpperCase()
                }
                color={"purple"}
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">
                {jwtDecode(token).firstName + " " + jwtDecode(token).lastName}
              </span>
              <span className="block truncate text-sm font-medium">
                {jwtDecode(token).email}
              </span>
            </DropdownHeader>
            <DropdownItem as={Link} to={"/user/profile"}>
              Profile
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem as={Link} to={"/user/products"}>
              My Products
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem as={Link} to={"/user/product/create"}>
              Create Product
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
          </Dropdown>
        )}
        {!token && (
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
        <NavbarLink as={Link} to="/" active={location === "" ? true : false}>
          Home
        </NavbarLink>
        <NavbarLink active={location === "category" ? true : false}>
          <Dropdown
            as={Button}
            arrowIcon={true}
            inline={true}
            label="Categories"
          >
            <DropdownItem as={Link} to="/category/electronics">
              Electronics
            </DropdownItem>
            <DropdownItem as={Link} to="/category/bicycles">
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
        <NavbarLink
          as={Link}
          to="/products"
          active={location === "products" ? true : false}
        >
          Products
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/support"
          active={location === "support" ? true : false}
        >
          Support
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
