export const StatCard = ({ title, value, Icon }) => (
  <div className="p-5 shadow-md rounded-lg min-w-[200px]">
    <div className="flex items-center justify-between">
      <p className="font-semibold">{title}</p>
      {Icon && <Icon className="w-6 h-6 text-blue-600" />}
    </div>
    <h2 className="grid grid-cols-1 gap-1 mt-3 text-2xl font-bold text-gray-950 place-items-center">
      {Array.isArray(value)
        ? value.map((v, i) => <span key={i}>{v}</span>)
        : value}
    </h2>
  </div>
);

export const ActionButton = ({ Icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
    {Icon && <Icon className="w-5 h-5" />}
    {label}
  </button>
);
