interface ContainerDetailProps {
  children: React.ReactNode;
}

export default function ContainerDetail(props: ContainerDetailProps) {
  const { children } = props;
  return (
    <div className="w-full">
      <div className="w-full min-h-[15vh] bg-mainGreen" />
      {children}
    </div>
  );
}
