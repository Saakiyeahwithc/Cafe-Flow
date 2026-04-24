function MetricCard(props) {
  const { title, value, icon: Icon, color } = props;

  const colors = {
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    teal: "bg-teal-100 text-teal-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
      <p className="mb-2 font-medium text-[15px]">{value}</p>
    </div>
  );
}

export default MetricCard;