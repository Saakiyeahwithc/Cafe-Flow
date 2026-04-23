import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Users,
  Home,
  BedSingle,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import MetricCard from "../layouts/metric.jsx";
import ServiceItem from "../layouts/serviceItem.jsx";
import { MdTableRestaurant } from "react-icons/md";

function Overview() {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        <div className="mb-6">
          <h1>Dashboard Overview</h1>
          <p className="text-gray-500">Monitor your cafe performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <MetricCard
            title="Sales"
            value="Rs 0"
            change="No change"
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="Purchase"
            value="Rs 0"
            change="No change"
            icon={ShoppingCart}
            color="orange"
          />
          <MetricCard
            title="Income"
            value="Rs 0"
            change="No change"
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Expenses"
            value="Rs 0"
            change="No change"
            icon={CreditCard}
            color="red"
          />
          <MetricCard
            title="Payment In"
            value="Rs 0"
            change="No change"
            icon={TrendingUp}
            color="teal"
          />
          <MetricCard
            title="Payment Out"
            value="Rs 0"
            change="No change"
            icon={TrendingDown}
            color="purple"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="mb-4">Sales Overview</h3>
            <p className="text-gray-500 text-sm mb-4">
              Track your sales throughout the day
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="mb-4">Summary</h3>
            <div className="space-y-4">
              <ServiceItem
                label="Rooms available"
                value=" 0"
                icon={<BedSingle />}
              />
              <ServiceItem
                label="Reservations made"
                value=" 0"
                icon={<UserRoundCheck />}
              />
              <ServiceItem
                label="Tables available"
                value=" 0"
                icon={<MdTableRestaurant />}
              />
              <ServiceItem
                label="Active Staffs"
                value=" 0"
                icon={<UsersRound />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Overview;
