import { useState } from "react";
import { Coffee, UtensilsCrossed, Plus, Minus, Trash2, X } from "lucide-react";
import { useCafe } from "../../context/cafeContext";

function MenuView() {
  const {
    menuItems,
    addMenuItem,
    removeMenuItem,
    toggleMenuItemAvailability,
    addOrder,
  } = useCafe();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Coffee",
    price: 0,
  });

  const categories = ["All", "Coffee", "Food", "Dessert"];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart([
        ...cart,
        { id: item.id, name: item.name, price: item.price, quantity: 1 },
      ]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return { ...item, quantity: Math.max(0, newQuantity) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleFinalizeOrder = () => {
    if (cart.length === 0) {
      alert("Please add items to the cart");
      return;
    }
    if (!tableNumber) {
      alert("Please enter table number");
      return;
    }
    if (!customerName) {
      alert("Please enter customer name");
      return;
    }

    const result = addOrder({
      tableNumber,
      customerName,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: calculateTotal(),
    });

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(result.message);
    setCart([]);
    setTableNumber("");
    setCustomerName("");
  };

  const handleAddNewItem = () => {
    if (!newItem.name || newItem.price <= 0) {
      alert("Please enter valid item details");
      return;
    }

    addMenuItem({
      name: newItem.name,
      category: newItem.category,
      price: newItem.price,
      available: true,
    });

    setNewItem({ name: "", category: "Coffee", price: 0 });
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1>Menu Management</h1>
            <p className="text-gray-500">Add items to create new orders</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Item
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === category
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between mb-3">
                    <div className="flex gap-3">
                      <div className="bg-red-50 p-2 rounded-lg">
                        {item.category === "Coffee" ? (
                          <Coffee className="w-5 h-5 text-red-500" />
                        ) : (
                          <UtensilsCrossed className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <h3>{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>

                    <button onClick={() => removeMenuItem(item.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  <div className="flex justify-between mb-3">
                    <span>Rs {item.price}</span>
                    <button onClick={() => toggleMenuItemAvailability(item.id)}>
                      {item.available ? "Available" : "Unavailable"}
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.available}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      item.available
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <h3 className="mb-4">Current Order</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Table Number
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter table number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter customer name"
                  />
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>No items added yet</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-900">{item.name}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-white p-1 rounded hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="text-gray-700 px-2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-white p-1 rounded hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <span className="text-gray-700">
                            Rs {item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Total Amount</span>
                      <span className="text-red-500">
                        Rs {calculateTotal()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleFinalizeOrder}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors"
                  >
                    Finalize Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuView;
