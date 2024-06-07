import React, { useState } from "react";
import Navbar from "./Navbar";
import MenuButton from "./MenuButton";
import { AppRegistry } from 'react-native';

AppRegistry.registerComponent('CarnetUnillanos', () => App);
function Header() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <HeaderWrapper>
      <MenuButton open={open} handleClick={handleClick} />
      <Navbar open={open} />
      
    </HeaderWrapper>
  );
}

export default Header;