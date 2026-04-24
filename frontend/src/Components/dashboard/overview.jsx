import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Users,
  Home,
  BedSingle,
  UserRoundCheck,
  UsersRound,
  NotepadText,
  KeySquare,
} from "lucide-react";
import MetricCard from "../layouts/metric.jsx";
import ServiceItem from "../layouts/serviceItem.jsx";
import { MdTableRestaurant } from "react-icons/md";

function Overview() {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold whitespace-nowrap"> 
            Dashboard Overview
          </h1>
          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1 whitespace-nowrap">
            Monitor your cafe performance
          </p>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <MetricCard
            title="Total Revenue"
            value="Rs 0"
            icon={TrendingUp}
            color="purple"
          />
          <MetricCard
            title="Net Earnings"
            value="Rs 0"
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Expenses"
            value="Rs 0"
            icon={CreditCard}
            color="red"
          />
          <MetricCard
            title="Total Orders"
            value="0"
            icon={NotepadText}
            color="orange"
          />
          <MetricCard
            title="Total Check-ins"
            value="0"
            icon={KeySquare}
            color="teal"
          />
        </div>
    </div>

  );
}

export default Overview;
