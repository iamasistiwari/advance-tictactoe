import { FC, HTMLAttributes } from 'react';

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  value: string | null;
}

const Block: FC<BlockProps> = ({ value, ...rest }: BlockProps) => {
  return (
    <div {...rest}>
      <span
        className={`flex h-full w-full items-center justify-center text-6xl ${
          value === 'O' ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default Block;
