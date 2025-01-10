import { FC, HTMLAttributes } from "react";

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  value: string | null;
}

const Block: FC<BlockProps> = ({value, ...rest }: BlockProps) => {
  return (
    <div
      {...rest}
    >
      <span
        className={`w-full h-full justify-center items-center text-6xl flex ${
          value === "O" ? "text-green-400" : "text-red-400"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default Block;
