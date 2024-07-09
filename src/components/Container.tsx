interface ContainerProps {
  children: React.ReactNode;
}
export default function Container(props: ContainerProps) {
  const { children } = props;

  return <div className="w-screen px-4">{children}</div>;
}
