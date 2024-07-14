interface ContainerHistoryProps {
  children: React.ReactNode;
}

export default function ContainerHistory(props: ContainerHistoryProps) {
  const { children } = props;
  return <div className="flex flex-col gap-y-2">{children}</div>;
}
