import { useState } from "react";
import {
  Coffee,
  Plus,
  Minus,
  Trash2,
  CircleX,
  CircleCheck,
} from "lucide-react";
import { useCafe } from "../../context/cafeContext";
import { MdRoomService } from "react-icons/md";
import { FaUtensilSpoon } from "react-icons/fa";

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
    <div className="flex-1 bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Menu View</h1>

          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
            Create your perfect order
          </p>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center
            gap-1 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            <p className="font-medium text-sm md:text-[16px]">Add New Item</p>
          </button>
        </div>
      </div>

      {/* Menu items */}
      <div className="flex flex-col mb-6">
        <div className="mb-6 flex gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 rounded-lg font-medium text-[16px] ${
                selectedCategory === category
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-150 overflow-y-auto p-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl h-fit p-4 shadow-sm"
            >
              <div className="flex justify-between mb-3">
                <div className="flex gap-3">
                  <div className="bg-red-50 p-2 rounded-lg flex items-center justify-center">
                    {item.category === "Coffee" ? (
                      <Coffee className="w-5 h-5 text-red-500" />
                    ) : item.category === "Food" ? (
                      <MdRoomService className="w-5 h-5 text-red-500" />
                    ) : (
                      <FaUtensilSpoon className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>

                <button onClick={() => removeMenuItem(item.id)}>
                  <Trash2 className="w-5 h-5 text-red-400 hover:text-red-600" />
                </button>
              </div>

              <div className="flex justify-between mb-3">
                <span>Rs {item.price}</span>

                <button
                  onClick={() => toggleMenuItemAvailability(item.id)}
                  className={`flex items-center gap-2 shadow-sm shadow-slate-300 rounded-2xl px-2.5 py-1.5
                  hover:bg-gray-50
                    ${item.available ? "text-green-500" : "text-red-500"}`}
                >
                  <div>
                    {item.available ? (
                      <CircleCheck className="w-5 h-5 text-green-500" />
                    ) : (
                      <CircleX className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {item.available ? "Available" : "Unavailable"}
                </button>
              </div>

              <button
                onClick={() => addToCart(item)}
                disabled={!item.available}
                className="bg-red-500 flex items-center justify-center gap-1 
                rounded-lg px-3 py-1 text-slate-50 font-medium hover:bg-red-600"
              >
                Add to Order
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Order Placing */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col ">
            <h3 className="font-semibold text-xl mb-3">Current Order</h3>

            <p className="mb-1 text-lg">Table Number</p>
            <input
              type="text"
              placeholder="Enter Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="border rounded-lg p-2 mb-2"
            />

            <p className="mb-1 text-lg">Customer Name</p>
            <input
              type="text"
              placeholder="Enter Customer's Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border rounded-lg p-2 mb-2 w-full"
            />

            {cart.map((item) => (
              <div
                key={item.id}
                className="mt-2 mb-2 flex items-center gap-8 text-lg text-slate-800"
              >
                {item.name} x {item.quantity}
                <div className="flex items-center gap-4">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <Minus className="w-5 h-5" />
                  </button>
                  <button onClick={() => updateQuantity(item.id, 1)}>
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <p className="mt-2 mb-2">Total: Rs {calculateTotal()}</p>

            <div className="flex items-center justify-center">
              <button
                onClick={handleFinalizeOrder}
                className="bg-green-400 font-medium rounded-lg text-white w-fit px-4 py-1.5
              hover:bg-green-500 text-lg"
              >
                Finalize
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuView;
