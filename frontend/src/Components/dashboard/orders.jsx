import { useState } from "react";
import { ChefHat, XCircle, X, Percent, QrCode, Banknote } from "lucide-react";
import { useCafe } from "../../context/cafeContext";

function OrdersView() {
  const { orders, completeOrder, cancelOrder } = useCafe();
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const activeOrders = orders.filter((o) => o.status === "preparing");
  const cancelledOrders = orders.filter((o) => o.status === "cancelled");

  const handleCompleteOrder = (order) => {
    setSelectedOrder(order);
    setPaymentMethod(null);
    setDiscount(0);
    setShowBillModal(true);
  };

  const handleGenerateBill = () => {
    if (!selectedOrder || !paymentMethod) return;
    completeOrder(selectedOrder.id, discount, paymentMethod);
    setShowBillModal(false);
    setSelectedOrder(null);
    setDiscount(0);
    setPaymentMethod(null);
  };

  const closeBillModal = () => {
    setShowBillModal(false);
    setSelectedOrder(null);
    setDiscount(0);
    setPaymentMethod(null);
  };

  const calculateFinalAmount = (total, discountPercent) => {
    const discountAmount = Math.round((total * discountPercent) / 100);
    return total - discountAmount;
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 overflow-auto p-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Orders Management
        </h1>
        
        <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
          View and Manage all orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg font-medium shadow-sm">
          <p className="text-blue-700 text-[17px] mb-1">Preparing</p>
          <p className="text-blue-900 text-[17px]">{activeOrders.length}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg font-medium shadow-sm">
          <p className="text-red-700 text-[17px] mb-1">Cancelled</p>
          <p className="text-red-900 text-[17px]">{cancelledOrders.length}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg font-medium shadow-sm">
          <p className="text-green-700 text-[17px] mb-1">Completed</p>
          <p className="text-green-900 text-[17px]">{orders.filter(o => o.status === "completed").length}</p>
        </div>
      </div>

      {/* Active orders */}
      {activeOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-14 text-center">
          <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No active orders right now</p>
          <p className="text-gray-400 text-sm mt-1">
            New order will appear here when a customer places an order
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Card header */}
              <div className="bg-red-500 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white opacity-90 text-sm">
                      Order #{order.id}
                    </p>
                    <p className="text-white">Table {order.tableNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white opacity-90 text-sm">
                      {order.time}
                    </p>
                    <p className="text-white text-sm">{order.customerName}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* Items */}
                <p className="text-gray-600 text-sm mb-2">Order Items:</p>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm">
                          x{item.quantity}
                        </span>
                        <span className="text-gray-700">Rs {item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Total Amount</span>
                    <span className="text-red-500">Rs {order.total}</span>
                  </div>
                </div>

                {/* Status badge + actions */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 flex items-center gap-1">
                    <ChefHat className="w-4 h-4" />
                    Preparing
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCompleteOrder(order)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm transition-colors"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="text-red-500 hover:text-red-600 border border-red-500 hover:bg-red-50 px-4 py-1 rounded text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-3 border-t border-orange-100">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-700 text-sm">
                    Kitchen View Enabled
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancelled orders section */}
      {cancelledOrders.length > 0 && (
        <div className="mt-8">
          <h3 className="text-gray-500 mb-3">Cancelled Orders</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {cancelledOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden opacity-60"
              >
                <div className="bg-gray-400 text-white p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white opacity-90 text-xs">
                        Order #{order.id}
                      </p>
                      <p className="text-white text-sm">
                        Table {order.tableNumber}
                      </p>
                    </div>
                    <XCircle className="w-5 h-5 text-white opacity-80" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-gray-600 text-sm">
                    {order.customerName}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {order.items.length} item(s) · Rs {order.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Bill & Payment Modal ── */}
      {showBillModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3>Generate Bill</h3>
              <button
                onClick={closeBillModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Order summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500 text-sm">
                  Order #{selectedOrder.id}
                </p>
                <p className="text-gray-900 mb-3">
                  Table {selectedOrder.tableNumber} —{" "}
                  {selectedOrder.customerName}
                </p>

                <div className="space-y-2 mb-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-gray-700">
                        Rs {item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Subtotal</span>
                    <span className="text-gray-900">
                      Rs {selectedOrder.total}
                    </span>
                  </div>

                  {/* Discount */}
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="number"
                      value={discount || ""}
                      onChange={(e) =>
                        setDiscount(
                          Math.min(100, Math.max(0, Number(e.target.value))),
                        )
                      }
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      placeholder="Discount %"
                      min="0"
                      max="100"
                    />
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>
                        − Rs{" "}
                        {Math.round((selectedOrder.total * discount) / 100)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                    <span className="text-gray-900">Final Amount</span>
                    <span className="text-red-500">
                      Rs {calculateFinalAmount(selectedOrder.total, discount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <p className="text-gray-700 text-sm mb-3">
                  Select Payment Method:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("Cash")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "Cash"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Banknote
                      className={`w-7 h-7 ${paymentMethod === "Cash" ? "text-green-600" : "text-gray-500"}`}
                    />
                    <span
                      className={`text-sm ${paymentMethod === "Cash" ? "text-green-700" : "text-gray-600"}`}
                    >
                      Cash
                    </span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("QR")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "QR"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <QrCode
                      className={`w-7 h-7 ${paymentMethod === "QR" ? "text-purple-600" : "text-gray-500"}`}
                    />
                    <span
                      className={`text-sm ${paymentMethod === "QR" ? "text-purple-700" : "text-gray-600"}`}
                    >
                      QR / UPI
                    </span>
                  </button>
                </div>
              </div>

              {/* QR Code display */}
              {paymentMethod === "QR" && (
                <div className="border border-purple-100 rounded-xl bg-purple-50">
                  {/* put img for qr here */}
                  <div className="px-4 pb-4 text-center">
                    <p className="text-purple-700 text-sm">
                      Amount to collect:{" "}
                      <span className="text-purple-900">
                        Rs {calculateFinalAmount(selectedOrder.total, discount)}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Confirm payment button */}
              <button
                onClick={handleGenerateBill}
                disabled={!paymentMethod}
                className={`w-full py-3 rounded-lg transition-colors text-white ${
                  paymentMethod
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {paymentMethod
                  ? `Confirm Payment — Rs ${calculateFinalAmount(selectedOrder.total, discount)}`
                  : "Choose a payment method"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersView