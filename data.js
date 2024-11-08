import { PencilRuler, PersonStanding } from "lucide-react";
import { FaHotTub } from "react-icons/fa";

const iconSize = 60;

export const data = [
  {
    name: "size",
    heading: "Select the size",
    content: [
      {
        label: "2000 x 1650 x 850 MM",
        value: "2000x1650x850",
        icon: <PencilRuler size={iconSize} />,
      },
      {
        label: "2000 x 2000 x 800 MM",
        value: "2000x2000x800",
        icon: <PencilRuler size={iconSize} />,
      },
      {
        label: "2000 x 2000 x 920 MM",
        value: "2000x2000x920",
        icon: <PencilRuler size={iconSize} />,
      },
      {
        label: "2130 x 2130 x 920 MM",
        value: "2130x2130x920",
        icon: <PencilRuler size={iconSize} />,
      },
      {
        label: "2180 x 1750 x 850 MM",
        value: "2180x1750x850",
        icon: <PencilRuler size={iconSize} />,
      },
    ],
  },
  {
    name: "person",
    heading: "Select the person count",
    content: [
      {
        label: "3 Person Spa",
        value: "3",
        icon: <PersonStanding size={iconSize} />,
        size: ["2000x1650x850"],
      },
      {
        label: "2-3 Persons Spa",
        value: "2-3",
        icon: <PersonStanding size={iconSize} />,
        size: ["2180x1750x850"],
      },
      {
        label: "5 Person Spa",
        value: "5",
        icon: <PersonStanding size={iconSize} />,
        size: ["2000x2000x920"],
      },
      {
        label: "6 Person Spa",
        value: "6",
        icon: <PersonStanding size={iconSize} />,
        size: ["2000x2000x800"],
      },
      {
        label: "5-6 Persons Spa",
        value: "5-6",
        icon: <PersonStanding size={iconSize} />,
        size: ["2130x2130x920"],
      },
    ],
  },
  {
    name: "lounger",
    heading: "Select lounger",
    content: [
      {
        label: "single",
        value: "single",
        icon: <FaHotTub size={iconSize} />,
        person: ["3", "6", "5-6", "2-3"],
      },
      {
        label: "double",
        value: "double",
        icon: <FaHotTub size={iconSize} />,
        person: ["5"],
      },
    ],
  },
  {
    name: "products",
    heading: "Products",
    data: [
      {
        title: "THE Cairn",
        description: "Sterling Silver shell with 3 piece Chestnut cabinet",
        persons: "3",
        size: "2000x1650x850",
        lounger: "single",
        litre: "875",
        weight: "1195",
        jets: "43",
        images: [
          "/images/products/the-cairn-1.jpg",
          "/images/products/the-cairn-2.jpg",
          "/images/products/the-cairn-3.jpg",
          "/images/products/the-cairn-4.jpg",
        ],
      },
      {
        title: "THE Pinnacle",
        description: "Sterling Silver shell with 3 panel Synwood cabinet",
        persons: "6",
        size: "2000x2000x800",
        lounger: "single",
        litre: "1039",
        weight: "1437",
        jets: "18",
        images: [
          "/images/products/pinacle-1.jpg",
          "/images/products/pinacle-2.jpg",
          "/images/products/pinacle-3.jpg",
          "/images/products/pinacle-4.jpg",
        ],
      },
      {
        title: "THE Tarn",
        description: "Sterling silver shell with 3 panel Synwood cabinet",
        persons: "5",
        size: "2000x2000x920",
        lounger: "double",
        litre: "1035",
        weight: "1440",
        jets: "30",
        images: [
          "/images/products/tarn-1.jpg",
          "/images/products/tarn-2.jpg",
          "/images/products/tarn-3.jpg",
          "/images/products/tarn-4.jpg",
        ],
      },
      {
        title: "THE Vista",
        description: "Sterling silver shell with 3 panel Synwood cabinet",
        persons: "5-6",
        size: "2130x2130x920",
        lounger: "single",
        litre: "1136",
        weight: "1516",
        jets: "26",
        images: [
          "/images/products/vista-1.jpg",
          "/images/products/vista-2.jpg",
          "/images/products/vista-3.jpg",
          "/images/products/vista-4.jpg",
        ],
      },
      {
        title: "THE Tussock",
        description: "Stormcloud shell with Aluminium cabinet",
        persons: "2-3",
        size: "2180x1750x850",
        lounger: "single",
        litre: "786",
        weight: "1125",
        jets: "24",
        images: [
          "/images/products/tussock-1.jpg",
          "/images/products/tussock-2.jpg",
          "/images/products/tussock-3.jpg",
          "/images/products/tussock-4.jpg",
        ],
      },
    ],
  },
];
