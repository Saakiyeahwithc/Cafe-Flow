import {ArrowUp, ArrowDown, Minus} from 'lucide-react'

function MetricCard(props) {
  const { title, value, msg, change, icon: Icon, color } = props;


  const colors = {
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    teal: "bg-teal-100 text-teal-600",
    purple: "bg-purple-100 text-purple-600",
  };

  const status = change?.toLowerCase().trim();

  let StatusIcon = null;
  let statusColor = "";

  if (status === "positive") {
    StatusIcon = ArrowUp;
    statusColor = "text-green-600";
  } 
  else if (status === "negative") {
    StatusIcon = ArrowDown;
    statusColor = "text-red-600";
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <p className="text-[17px] font-medium mb-1">{title}</p>
      <p className="text-[17px] font-semibold mb-2">{value}</p>

      <div className="flex items-center gap-1">
        {StatusIcon && (
          <StatusIcon className={`w-4 h-4 ${statusColor}`} />
        )}
        <p className={`text-sm font-medium ${statusColor}`}>
          {msg}
        </p>
      </div>
    </div>
  );
}

export default MetricCard;