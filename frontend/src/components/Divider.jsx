export default function Divider({ title }) {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 bg-gray-100 text-2xl font-medium text-yellow-400">
          {title}
        </span>
      </div>
    </div>
  );
}
