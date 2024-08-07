interface TitleProps {
  children: React.ReactNode;
}
export default function Title(props: TitleProps) {
  const { children } = props;
  return <span className="text-mainGreen text-sm">{children}</span>;
}

