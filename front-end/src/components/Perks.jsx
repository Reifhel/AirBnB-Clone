import React from "react";
import RadioIcon from "./Icons/RadioIcon";
import ShieldCheckIcon from "./Icons/ShieldCheckIcon";
import SmileIcon from "./Icons/SmileIcon";
import TruckIcon from "./Icons/TruckIcon";
import TvIcon from "./Icons/TvIcon";
import WifiIcon from "./Icons/WifiIcon";
import PerkItem from "./PerkItem";

const Perks = ({ perks, setPerks }) => {
  const PERKS_DATA = [
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

  const handleClick = (target) => {
    const newPerks = target.checked
      ? [...perks, target.value]
      : [...perks].filter((perk) => perk !== target.value);

    setPerks(newPerks);
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {PERKS_DATA.map((perk) => (
        <PerkItem
          key={perk.name}
          name={perk.name}
          icon={perk.icon}
          text={perk.text}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Perks;
