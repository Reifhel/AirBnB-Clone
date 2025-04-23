import React from "react";
import { Link } from "react-router-dom";

const Item = () => {
  return (
    <Link to="/" className="flex flex-col gap-2">
      <img
        className="aspect-square rounded-2xl object-cover"
        src="https://images.adsttc.com/media/images/5d4d/f834/284d/d1d5/e200/02dd/large_jpg/FEATURED_IMAGE.jpg?1565390873"
        alt="casa na praia"
      />
      <div>
        <h3 className="text-xl font-semibold">Manoel Ribas, Paraná</h3>
        <p className="truncate text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet,
          lectus sit amet interdum aliquet, felis urna tempor nunc, in fringilla
          eros sapien sed tortor. Duis fringilla condimentum dui, in commodo sem
          consectetur sed. Donec porta nunc lacus, eget iaculis felis mollis
          sed. Morbi laoreet purus non dolor aliquam blandit. Aenean massa
          dolor, pretium imperdiet massa ac, condimentum pretium est. Donec
          blandit eleifend velit. Nullam rhoncus faucibus tellus nec finibus.
          Nam scelerisque risus ut metus lobortis tincidunt. Nullam sapien
          ligula, blandit vitae massa sit amet, malesuada porttitor est. Morbi
          vel faucibus tellus, eget auctor ligula. In non erat risus.
        </p>
      </div>
      <p>
        <span className="font-semibold">R$ 550</span> por noite
      </p>
    </Link>
  );
};

export default Item;
