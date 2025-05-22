import RadioIcon from "./components/Icons/RadioIcon";
import ShieldCheckIcon from "./components/Icons/ShieldCheckIcon";
import SmileIcon from "./components/Icons/SmileIcon";
import TruckIcon from "./components/Icons/TruckIcon";
import TvIcon from "./components/Icons/TvIcon";
import WifiIcon from "./components/Icons/WifiIcon";

export const PERKS_DATA = [
  {
    name: "wifi",
    icon: <WifiIcon className={"size-6"} />,
    text: "Wifi",
  },
  {
    name: "parking",
    icon: <TruckIcon className={"size-6"} />,
    text: "Estacionamento Gratuito",
  },
  {
    name: "tv",
    icon: <TvIcon className={"size-6"} />,
    text: "TV",
  },
  {
    name: "radio",
    icon: <RadioIcon className={"size-6"} />,
    text: "Radio",
  },
  {
    name: "Pets",
    icon: <SmileIcon className={"size-6"} />,
    text: "Pets",
  },
  {
    name: "entrance",
    icon: <ShieldCheckIcon className={"size-6"} />,
    text: "Entrada Privada",
  },
];

export const getPerkIcon = (text) => {
  const filteredData = PERKS_DATA.filter((item) => item.text === text)[0];

  return filteredData.icon;
};
