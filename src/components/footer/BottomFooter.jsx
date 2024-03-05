import React from "react";
import {
  Footer,
  FooterBrand,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const BottomFooter = () => {
  return (
    <Footer container className="bg-slate-100">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="/"
              src="https://d33wubrfki0l68.cloudfront.net/b891ad524a09a29d768b6ffdbf5f52bb0c6da7e1/47f53/img/vitspot-logo.png"
              alt="VITSpot Logo"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="other links" />
              <FooterLinkGroup col>
                <FooterLink href="https://vitspot.com/" target="_blank">
                  VITSpot Website
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://www.instagram.com/vitspot/?hl=en"
                  target="_blank"
                >
                  Instagram
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://vitspot.com/privacy-policy"
                  target="_blank"
                >
                  Privacy Policy
                </FooterLink>
                <FooterLink href="https://vitspot.com/dmca" target="_blank">
                  Terms &amp; Conditions
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <div className="flex">
            Made with
            <span className="ml-2 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-red-600"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </span>
            by Pranav KSK
          </div>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon
              href="https://github.com/pranav-2002"
              target="_blank"
              icon={BsGithub}
            />
            <FooterIcon
              href="https://www.linkedin.com/in/pranav-ksk-1b51b220b/"
              target="_blank"
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default BottomFooter;
