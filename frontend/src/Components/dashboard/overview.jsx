import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  KeySquare,
  ShoppingCart,
} from "lucide-react";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell } from 'recharts';

import MetricCard from "../layouts/metric.jsx";
import { revenueData, orderData, COLORS } from "../../data/cafeData.jsx";
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

        {/* Today's status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          <MetricCard
            title="Total Revenue"
            value="Rs 0"
            msg="x% from yesterday"
            change="positive"
            icon={TrendingUp}
            color="purple"
          />
          <MetricCard
            title="Net Earnings"
            value="Rs 0"
            msg="Profit"
            change="positive"
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Expenses"
            value="Rs 0"
            msg="Less expenses"
            change="positive"
            icon={TrendingDown}
            color="red"
          />
          <MetricCard
            title="Total Orders"
            value="0"
            msg="x pending orders"
            change="negative"
            icon={ShoppingCart}
            color="orange"
          />
          <MetricCard
            title="Total Check-ins"
            value="0"
            msg="x rooms reserved"
            change=""
            icon={KeySquare}
            color="teal"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
          {/* graph */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex items-start justify-between mb-6 gap-1">
              <div>
                <h3 className="text-[15px] md:text-lg font-semibold text-slate-900">
                  Weekly Revenue
                </h3>
                <p className="mb-4 text-sm md:text-[15px] text-gray-500">
                  Track daily revenue throughout the week
                </p>
              </div>
              <div className="flex items-center gap-1 pt-1 md:gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <p className="text-slate-600 text-xs md:text-sm">Revenue per day</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  {/* <linearGradient id="colorRestaurant" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient> */}
                  <linearGradient id="colorHotel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#ffffff",
                    color: "#111827",
                    fontWeight: 500,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                  }}
                  labelFormatter={(value, payload) => {
                    const date = payload?.[0]?.payload?.date;

                    if (!date) return value;

                    return new Date(date).toISOString().split("T")[0];
                  }}
                />
              {/*  <Area type="monotone" dataKey="restaurant" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRestaurant)" /> */}
                <Area type="monotone" dataKey="Revenue" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorHotel)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie-chart */}
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="text-[14px] md:text-lg font-semibold text-slate-900">
                  Menu Category Popularity
                </h3>
                <p className="mb-6 text-sm md:text-[15px] text-gray-500">
                  Identify the categories customers prefer most
                </p>
              </div>
              <div className="flex gap-2 md:gap-4 pt-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#D97706]"></div>
                  <span className="text-slate-600 text-xs md:text-sm">Food</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#FF6B6B]"></div>
                  <span className="text-slate-600 text-xs md:text-sm">Dessert</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#C68642]"></div>
                  <span className="text-slate-600 text-xs md:text-sm">Coffee</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="90%"
                  innerRadius="40%"
                  paddingAngle={3}
                  dataKey="value"
                  //for positioning the label
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const RADIAN = Math.PI / 180;

                    // reduce this gap to move label closer inward
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#1F2937" //text color
                        fontWeight="bold"   
                        fontSize={14}
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        {(percent * 100).toFixed(1)}%
                      </text>
                    );
                  }}
                >
                  {orderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#2D3748",
                    fontWeight: 500,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>

  );
}

export default Overview;
