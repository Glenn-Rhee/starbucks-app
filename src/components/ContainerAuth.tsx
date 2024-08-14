interface ContainerAuthProps {
  children: React.ReactNode;
}
export default function ContainerAuth(props: ContainerAuthProps) {
  const { children } = props;
  return (
    <div className="w-screen bg-white px-4 py-2 flex flex-col h-screen">
      <div className="w-full my-auto">{children}</div>
    </div>
  );
}
