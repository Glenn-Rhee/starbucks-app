interface TitleAuthProps {
  children: React.ReactNode;
}
export default function TitleAuth(props: TitleAuthProps) {
  const { children } = props;
  return (
    <h1 className="text-dark text-3xl mb-4 mt-4 font-bold text-center">
      {children}
    </h1>
  );
}
