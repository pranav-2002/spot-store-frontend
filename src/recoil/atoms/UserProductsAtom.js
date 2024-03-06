import { atom, selector } from "recoil";

const UserProductsAtom = atom({
  key: "userProducts",
  default: [],
});

export default UserProductsAtom;
