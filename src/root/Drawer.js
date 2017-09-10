import React from "react";
import { DrawerNavigator } from "react-navigation";
import Routes from '../config/routes/routes.js'

import SideBar from "../components/Dummy/SideBar/component.js";

import Landing from "../components/Smart/Landing/component.js";
import Services from "../components/Smart/Services/component.js";

const Drawer = DrawerNavigator(
  {
    Landing: { screen: Landing },
    // Services: { screen: Services },
  },
  {
    initialRouteName: "Landing",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default Drawer;
