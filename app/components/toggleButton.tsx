import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import type { StuffItem } from "~/help/db";
import { db } from "~/help/db";
import type { ToggleItem } from "~/help/typeHelps";

const ToggleStyle = tv({
  base: "flex h-8 items-center gap-2 my-1 px-2 rounded-md font-medium text-lg",
  variants: {
    active: {
      true: "",
      false: "",
    },
    colors: {
      green: [
        "border border-green-200 bg-green-300/20",
        "text-green-800",
        "shadow-md",
      ],
      red: ["border border-red-200 bg-red-300/20", "text-red-800", "shadow-md"],
      yellow: [
        "border border-yellow-200 bg-yellow-300/20",
        "text-yellow-800",
        "shadow-md",
      ],
    },
  },
  compoundVariants: [
    {
      active: true,
      colors: "green",
      class: [
        "border-green-200 bg-green-600/90",
        " text-green-100",
        " shadow-md",
      ],
    },
    {
      active: true,
      colors: "red",
      class: ["border-red-200 bg-red-600/90", " text-red-100", " shadow-md"],
    },
    {
      active: true,
      colors: "yellow",
      class: [
        "border-yellow-200 bg-yellow-600/90",
        " text-yellow-100",
        " shadow-md",
      ],
    },
  ],
});

interface ToggleButtonProps {
  data: ToggleItem;
  value: ToggleItem[];
  onSelect: (selectedItems: ToggleItem) => void;
  colors: string;
}

interface ToggleButtonGroupProps {
  type: string;
  color: string;
  onSelect: (selectedItems: ToggleItem[]) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const { data, value, onSelect, colors } = props;

  const toggle = value.some((item) => item.label === data.label);

  return (
    <button
      className={ToggleStyle({ active: toggle, colors: colors as any })}
      onClick={() => onSelect(data)}
    >
      <Icon icon={data.icon} className=" max-h-full h-fit" />
      <span>{data.label}</span>
    </button>
  );
};

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = (props) => {
  const { type, color, onSelect } = props;

  const [value, setValue] = useState<ToggleItem[]>([]);
  const [data, setData] = useState<ToggleItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      db.Stuff.where("type")
        .equals(type)
        .toArray()
        .then((res: unknown) => {
          const stuffItem: StuffItem[] = res as unknown as StuffItem[];
          const toggleItem: ToggleItem[] = stuffItem.map((item) => ({
            label: item.name,
            icon: item.icon,
          }));
          setData(toggleItem);
        });
    }
  }, [type]);

  const handleSelect = (selectedItems: ToggleItem) => {
    setValue((prevValue) => {
      const newValue = prevValue.some(
        (item) => item.label === selectedItems.label
      )
        ? prevValue.filter((item) => item.label !== selectedItems.label)
        : [...prevValue, selectedItems];
      onSelect(newValue);
      return newValue;
    });
  };

  return (
    <div className="flex flex-wrap justify-center items-center space-x-2">
      {data.map((item, index) => (
        <ToggleButton
          key={index}
          data={item}
          value={value}
          onSelect={handleSelect}
          colors={color}
        />
      ))}
    </div>
  );
};

export { ToggleButton, ToggleButtonGroup };
