interface ContainerHistoryProps {
  children: React.ReactNode;
}
export default function ContainerContent(props: ContainerHistoryProps) {
  const { children } = props;
  return (
    <div className="flex flex-col bg-white/85 rounded-[8px] shadow-md shadow-dark/15 py-2 px-1.5">
      {children}
    </div>
  );
}
