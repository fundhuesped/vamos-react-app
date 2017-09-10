import Landing from "../../components/Smart/Landing/component.js";
import Services from "../../components/Smart/Services/component.js";
import Map from "../../components/Smart/Map/component.js";
import Evaluations from "../../components/Smart/Evaluations/component.js";
import SearchForGeolocation from "../../components/Smart/SearchForGeolocation/component.js";
import BuscarCiudad from "../../layouts/BuscarCiudad/component.js";
import Establishment from "../../components/Smart/Establishment/component.js";
import Drawer from "../../root/Drawer.js";



const Routes = {
  Drawer: { screen: Drawer },
  Landing: { screen: Landing },
  Map: { screen: Map },
  Services: { screen: Services },
  SearchForGeolocation: { screen: SearchForGeolocation },
  BuscarCiudad: { screen: BuscarCiudad },
  Establishment: { screen: Establishment },
  Evaluations: { screen: Evaluations },
}

export default Routes
