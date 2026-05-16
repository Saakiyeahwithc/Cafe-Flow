import { prisma } from "../utils/prisma.js";

// ─── Create Inventory ─────────────────────────────────────────────────────────
export const createInventory = async (req, res, next) => {
  try {
    const {
      supplier_name,
      category,
      company,
      contact_number,
      email_address,
      address,
    } = req.body;

    if (
      !supplier_name ||
      !category ||
      !company ||
      !contact_number ||
      !email_address ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingContact = await prisma.inventory.findUnique({
      where: { contact_number },
    });
    if (existingContact) {
      return res.status(409).json({ message: "Contact number already exists" });
    }

    const existingEmail = await prisma.inventory.findUnique({
      where: { email_address },
    });
    if (existingEmail) {
      return res.status(409).json({ message: "Email address already exists" });
    }

    const inventory = await prisma.inventory.create({
      data: {
        supplier_name,
        category,
        company,
        contact_number,
        email_address,
        address,
      },
    });

    return res.status(201).json({
      message: "Inventory created successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get All Inventories ──────────────────────────────────────────────────────
export const getAllInventories = async (req, res, next) => {
  try {
    const { category, company } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (company) filters.company = company;

    const inventories = await prisma.inventory.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
    });

    if (inventories.length === 0) {
      return res.status(200).json({
        message: "No inventories found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Inventories fetched successfully",
      data: inventories,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get Inventory By ID ──────────────────────────────────────────────────────
export const getInventoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const inventory = await prisma.inventory.findUnique({
      where: { id: Number(id) },
    });

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    return res.status(200).json({
      message: "Inventory fetched successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Update Inventory ─────────────────────────────────────────────────────────
export const updateInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      supplier_name,
      category,
      company,
      contact_number,
      email_address,
      address,
    } = req.body;

    const existing = await prisma.inventory.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    if (contact_number && contact_number !== existing.contact_number) {
      const duplicate = await prisma.inventory.findUnique({
        where: { contact_number },
      });
      if (duplicate) {
        return res
          .status(409)
          .json({ message: "Contact number already in use" });
      }
    }

    if (email_address && email_address !== existing.email_address) {
      const duplicate = await prisma.inventory.findUnique({
        where: { email_address },
      });
      if (duplicate) {
        return res
          .status(409)
          .json({ message: "Email address already in use" });
      }
    }

    const inventory = await prisma.inventory.update({
      where: { id: Number(id) },
      data: {
        supplier_name: supplier_name ?? existing.supplier_name,
        category: category ?? existing.category,
        company: company ?? existing.company,
        contact_number: contact_number ?? existing.contact_number,
        email_address: email_address ?? existing.email_address,
        address: address ?? existing.address,
      },
    });

    return res.status(200).json({
      message: "Inventory updated successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Delete Inventory ─────────────────────────────────────────────────────────
export const deleteInventory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.inventory.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    await prisma.inventory.delete({ where: { id: Number(id) } });

    return res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    next(error);
  }
};
