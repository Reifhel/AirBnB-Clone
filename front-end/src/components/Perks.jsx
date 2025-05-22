import { PERKS_DATA } from "../dummy-perks";
import PerkItem from "./PerkItem";

const Perks = ({ perks, setPerks }) => {
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
          checkedValue={perks.includes(perk.text)}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Perks;
