import ItemRecomendation from "./ItemRecomendation";

export default function Recomendation() {
  return (
    <div className="px-2 py-5 border-y-lightGrey/35 border-y overflow-x-auto flex gap-x-3">
      <ItemRecomendation />
      <ItemRecomendation />
      <ItemRecomendation />
    </div>
  );
}
