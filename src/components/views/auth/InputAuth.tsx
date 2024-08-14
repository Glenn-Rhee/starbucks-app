import { Input } from "@/components/ui/input";

interface InputAuthProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string;
}

export default function InputAuth(props: InputAuthProps) {
  const { errorMsg, ...rest } = props;

  return (
    <div className="w-full flex flex-col gap-y-1">
      <Input
        {...rest}
        className="rounded-[6px] py-5 outline-none border-darkGrey/70 placeholder:text-darkGrey text-darkGrey focus:border-mainGreen"
      />
      <p className="text-xs ms-1 font-semibold text-red-500">{errorMsg}</p>
    </div>
  );
}
