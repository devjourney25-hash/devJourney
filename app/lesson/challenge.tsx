import { challengeOptions, challenges } from "@/db/schema";
import { Card } from "./card";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  return (
    <div className="grid gap-2 sm:gap-3 lg:gap-4 w-full grid-cols-1">
      {options.map((option, i) => (
        <Card 
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
};