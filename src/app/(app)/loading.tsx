export default function Loading() {
  return (
    <div className="max-w-[1060px] flex flex-col gap-5 animate-pulse">
      <div className="h-24 bg-border rounded-2xl" />
      <div className="grid md:grid-cols-2 gap-5">
        <div className="h-36 bg-border rounded-xl" />
        <div className="h-36 bg-border rounded-xl" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="h-48 bg-border rounded-xl" />
        <div className="h-48 bg-border rounded-xl" />
        <div className="h-48 bg-border rounded-xl" />
      </div>
    </div>
  );
}
