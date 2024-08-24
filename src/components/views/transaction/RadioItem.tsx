import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { UseTransaction, useTransaction } from "@/store/useTransaction";
import { FormEventHandler } from "react";

interface RadioItemProps {
  value: UseTransaction["day"] | "Newest" | "Oldest";
  id: string;
  children?: React.ReactNode;
}
export default function RadioItem(props: RadioItemProps) {
  const { value, id, children } = props;

  return (
    <div className="flex items-center space-x-2">
      {children}
      <Label htmlFor={id} className="text-darkGrey font-normal">
        {value}
      </Label>
    </div>
  );
}
