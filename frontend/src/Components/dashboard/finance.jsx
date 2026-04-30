import { useState } from 'react';
import { 
    Printer, 
    QrCode, 
    Banknote, 
    TrendingUp, 
    Receipt, 
    X, 
    ReceiptText,
    DollarSign
} from 'lucide-react';
import MetricCard from '../layouts/metric';

function Finance() {
  /* const { financeRecords } = useCafe();
  const [selectedRecord, setSelectedRecord] = useState<FinanceRecord | null>(null);
  const [filterPayment, setFilterPayment] = useState<'All' | 'Cash' | 'QR'>('All');

  const totalRevenue = financeRecords.reduce((sum, r) => sum + r.finalAmount, 0);
  const totalOrders = financeRecords.length;
  const avgOrder = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const cashRevenue = financeRecords.filter(r => r.paymentMethod === 'Cash').reduce((s, r) => s + r.finalAmount, 0);
  const qrRevenue = financeRecords.filter(r => r.paymentMethod === 'QR').reduce((s, r) => s + r.finalAmount, 0);

  const filtered = filterPayment === 'All' ? financeRecords : financeRecords.filter(r => r.paymentMethod === filterPayment); */

  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-50">

        {/* Header */}
        <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold">
                Finance View
            </h1>
            <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
                Records all completed and paid orders
            </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <MetricCard
            title="Total Revenue"
            value="Rs 945"
            icon={TrendingUp}
            color="red"
        />

        <MetricCard
            title="Cash Revenue"
            value="Rs 0"
            icon={Banknote}
            color="green"
        />

        <MetricCard
            title="QR Revenue"
            value="Rs 945"
            icon={QrCode}
            color="purple"
        />
        </div>

        {/* Filter*/}
        {/* <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
                <ReceiptText className="w-5 h-5 text-red-500" />
                <h3>Payment Records</h3>
            </div>
            <div className="flex gap-2">
                {(['All', 'Cash', 'QR'] as const).map((f) => (
                <button
                    key={f}
                    onClick={() => setFilterPayment(f)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filterPayment === f
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {f === 'QR' ? 'QR / UPI' : f}
                </button>
                ))}
            </div>
            </div>

            {filtered.length === 0 ? (
            <div className="py-16 text-center">
                <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No payment records yet.</p>
                <p className="text-gray-400 text-sm mt-1">Completed orders will appear here.</p>
            </div>
            ) : ( */}
            

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <ReceiptText className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
                    <h3  className="font-bold text-[17px] md:text-[19px]">
                        Payment Records
                    </h3>
                </div>

                {/* Payment Records */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="w-full overflow-x-auto">
                    <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                                Table
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm ">
                                Items
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                                Subtotal (Rs)
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                                Discount (%)
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                                Final (Rs)
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                                Payment
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm ">
                                Time
                            </th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                                Receipt
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-6 py-3 text-gray-600 text-sm">
                                1
                            </td>

                            <td className="px-6 py-3 text-gray-600 text-sm">
                                Table 1
                            </td>

                            <td className="px-6 py-3 text-gray-600 text-sm">
                                Name
                            </td>

                            <td className="px-6 py-3 text-gray-600 text-sm">
                                3
                            </td>

                            <td className="px-6 py-3 text-gray-600 text-sm">
                                1050
                            </td>

                            <td className="px-6 py-3 text-gray-600 text-sm">
                                10
                            </td>

                            <td className="px-6 py-3 text-gray-600 text-sm">
                                945
                            </td>

                            <td className="px-6 py-3 text-gray-600 text-sm">
                                QR
                            </td>

                            <td className="px-6 py-3 text-gray-600 text-sm">
                                2026-04-25
                            </td>

                            <td className="px-6 py-3">
                                <button className="bg-red-50 hover:bg-red-100 p-1 rounded text-red-400 hover:text-red-600">
                                <Printer className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>

            {/* <div className="overflow-x-auto">
                <table className="w-full">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-sm">
                    <th className="text-left py-3 px-6 text-gray-500">Order #</th>
                    <th className="text-left py-3 px-6 text-gray-500">Table</th>
                    <th className="text-left py-3 px-6 text-gray-500">Customer</th>
                    <th className="text-left py-3 px-6 text-gray-500">Items</th>
                    <th className="text-left py-3 px-6 text-gray-500">Subtotal</th>
                    <th className="text-left py-3 px-6 text-gray-500">Discount</th>
                    <th className="text-left py-3 px-6 text-gray-500">Final</th>
                    <th className="text-left py-3 px-6 text-gray-500">Payment</th>
                    <th className="text-left py-3 px-6 text-gray-500">Time</th>
                    <th className="text-left py-3 px-6 text-gray-500">Receipt</th>
                    </tr>
                </thead> */}
                {/* <tbody>
                    {filtered.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-6 text-gray-700">#{record.orderId}</td>
                        <td className="py-3 px-6 text-gray-700">Table {record.tableNumber}</td>
                        <td className="py-3 px-6 text-gray-700">{record.customerName}</td>
                        <td className="py-3 px-6 text-gray-500 text-sm">{record.items.length} item(s)</td>
                        <td className="py-3 px-6 text-gray-700">Rs {record.subtotal}</td>
                        <td className="py-3 px-6">
                        {record.discountPercent > 0 ? (
                            <span className="text-green-600 text-sm">{record.discountPercent}% (−Rs {record.discountAmount})</span>
                        ) : (
                            <span className="text-gray-400 text-sm">—</span>
                        )}
                        </td>
                        <td className="py-3 px-6 text-red-500">Rs {record.finalAmount}</td>
                        <td className="py-3 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-sm ${
                            record.paymentMethod === 'Cash'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                            {record.paymentMethod === 'Cash'
                            ? <Banknote className="w-3 h-3" />
                            : <QrCode className="w-3 h-3" />}
                            {record.paymentMethod}
                        </span>
                        </td>
                        <td className="py-3 px-6 text-gray-500 text-sm ">{record.paidAt}</td>
                        <td className="py-3 px-6">
                        <button
                            onClick={() => setSelectedRecord(record)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors text-sm"
                        >
                            <Printer className="w-4 h-4" />
                            Print
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody> */}
                {/* </table>
            </div> */}
            {/* )} */}

            {/* Footer summary */}
           {/*  {filtered.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-gray-500 text-sm">{filtered.length} record(s)</span>
                <span className="text-gray-700 text-sm">
                Total collected:{' '}
                <span className="text-red-500">
                    Rs {filtered.reduce((s, r) => s + r.finalAmount, 0).toLocaleString()}
                </span>
                </span>
            </div>
            )}
        </div> */}
        

        {/* Receipt modal */}
        {/* {selectedRecord && (
        <ReceiptModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
        )} */}
    </div>
  );
}

export default Finance