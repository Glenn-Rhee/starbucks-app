import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface RadioItemProps {
  value: string;
  id: string;
}
export default function RadioItem(props: RadioItemProps) {
  const { value, id } = props;
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={id} className="border-darkGreen" />
      <Label htmlFor={id} className="text-darkGrey font-normal">
        {value}
      </Label>
    </div>
  );
}
