// src/controllers/foodOrder.controller.js
import { prisma } from "../utils/prisma.js";

const VALID_STATUSES = ["preparing", "prepared", "cancelled"];

// ─── Create Food Order (with items) ──────────────────────────────────────────
export const createFoodOrder = async (req, res, next) => {
  try {
    const { table_id, guest_id, items } = req.body;

    if (!table_id || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "table_id and at least one item are required" });
    }

    // Validate table
    const table = await prisma.table.findUnique({
      where: { table_id: Number(table_id) },
    });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Validate guest if provided
    if (guest_id) {
      const guest = await prisma.guest.findUnique({
        where: { guest_id: Number(guest_id) },
      });
      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }
    }

    // Validate all menu items and fetch their prices
    const menuItemIds = items.map((i) => Number(i.menu_item_id));
    const menuItems = await prisma.menuItem.findMany({
      where: { menu_item_id: { in: menuItemIds } },
    });

    if (menuItems.length !== menuItemIds.length) {
      return res
        .status(404)
        .json({ message: "One or more menu items not found" });
    }

    const menuItemMap = Object.fromEntries(
      menuItems.map((m) => [m.menu_item_id, m]),
    );

    // Create order + items in a transaction
    const foodOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.foodOrder.create({
        data: {
          table_id: Number(table_id),
          guest_id: guest_id ? Number(guest_id) : null,
          status: "preparing",
          items: {
            create: items.map((item) => ({
              menu_item_id: Number(item.menu_item_id),
              quantity: Number(item.quantity),
              unit_price: menuItemMap[Number(item.menu_item_id)].price,
            })),
          },
        },
        include: {
          table: true,
          guest: true,
          items: { include: { menu_item: true } },
        },
      });

      // Mark table as occupied
      await tx.table.update({
        where: { table_id: Number(table_id) },
        data: { status: "Occupied" },
      });

      return order;
    });

    return res.status(201).json({
      message: "Food order created successfully",
      data: foodOrder,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get All Food Orders ──────────────────────────────────────────────────────
export const getAllFoodOrders = async (req, res, next) => {
  try {
    const { status, table_id, guest_id } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (table_id) filters.table_id = Number(table_id);
    if (guest_id) filters.guest_id = Number(guest_id);

    const foodOrders = await prisma.foodOrder.findMany({
      where: filters,
      orderBy: { created_at: "desc" },
      include: {
        table: true,
        guest: true,
        items: { include: { menu_item: true } },
      },
    });

    if (foodOrders.length === 0) {
      return res.status(200).json({
        message: "No food orders found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Food orders fetched successfully",
      data: foodOrders,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get Food Order By ID ─────────────────────────────────────────────────────
export const getFoodOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foodOrder = await prisma.foodOrder.findUnique({
      where: { food_order_id: Number(id) },
      include: {
        table: true,
        guest: true,
        items: { include: { menu_item: true } },
      },
    });

    if (!foodOrder) {
      return res.status(404).json({ message: "Food order not found" });
    }

    return res.status(200).json({
      message: "Food order fetched successfully",
      data: foodOrder,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Update Food Order Status ─────────────────────────────────────────────────
export const updateFoodOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const existing = await prisma.foodOrder.findUnique({
      where: { food_order_id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Food order not found" });
    }

    const foodOrder = await prisma.foodOrder.update({
      where: { food_order_id: Number(id) },
      data: { status },
      include: {
        table: true,
        guest: true,
        items: { include: { menu_item: true } },
      },
    });

    return res.status(200).json({
      message: "Food order status updated successfully",
      data: foodOrder,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Add Items to Existing Order ──────────────────────────────────────────────
export const addItemsToOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "At least one item is required" });
    }

    const existing = await prisma.foodOrder.findUnique({
      where: { food_order_id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Food order not found" });
    }

    if (["served", "cancelled"].includes(existing.status)) {
      return res
        .status(400)
        .json({ message: `Cannot add items to a ${existing.status} order` });
    }

    // Validate and fetch menu items
    const menuItemIds = items.map((i) => Number(i.menu_item_id));
    const menuItems = await prisma.menuItem.findMany({
      where: { menu_item_id: { in: menuItemIds } },
    });

    if (menuItems.length !== menuItemIds.length) {
      return res
        .status(404)
        .json({ message: "One or more menu items not found" });
    }

    const menuItemMap = Object.fromEntries(
      menuItems.map((m) => [m.menu_item_id, m]),
    );

    await prisma.foodOrderItem.createMany({
      data: items.map((item) => ({
        food_order_id: Number(id),
        menu_item_id: Number(item.menu_item_id),
        quantity: Number(item.quantity),
        unit_price: menuItemMap[Number(item.menu_item_id)].price,
      })),
    });

    const foodOrder = await prisma.foodOrder.findUnique({
      where: { food_order_id: Number(id) },
      include: {
        table: true,
        guest: true,
        items: { include: { menu_item: true } },
      },
    });

    return res.status(200).json({
      message: "Items added to order successfully",
      data: foodOrder,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Remove Item from Order ───────────────────────────────────────────────────
export const removeItemFromOrder = async (req, res, next) => {
  try {
    const { id, itemId } = req.params;

    const existing = await prisma.foodOrder.findUnique({
      where: { food_order_id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Food order not found" });
    }

    if (["served", "cancelled"].includes(existing.status)) {
      return res.status(400).json({
        message: `Cannot remove items from a ${existing.status} order`,
      });
    }

    const orderItem = await prisma.foodOrderItem.findUnique({
      where: { id: Number(itemId) },
    });
    if (!orderItem || orderItem.food_order_id !== Number(id)) {
      return res.status(404).json({ message: "Order item not found" });
    }

    await prisma.foodOrderItem.delete({ where: { id: Number(itemId) } });

    return res
      .status(200)
      .json({ message: "Item removed from order successfully" });
  } catch (error) {
    next(error);
  }
};

// ─── Delete Food Order ────────────────────────────────────────────────────────
export const deleteFoodOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.foodOrder.findUnique({
      where: { food_order_id: Number(id) },
      include: { billings: true },
    });
    if (!existing) {
      return res.status(404).json({ message: "Food order not found" });
    }

    if (existing.billings.length > 0) {
      return res.status(400).json({
        message: "Cannot delete food order linked to existing billings.",
      });
    }

    await prisma.$transaction(async (tx) => {
      await tx.foodOrderItem.deleteMany({
        where: { food_order_id: Number(id) },
      });
      await tx.foodOrder.delete({ where: { food_order_id: Number(id) } });
    });

    return res.status(200).json({ message: "Food order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
