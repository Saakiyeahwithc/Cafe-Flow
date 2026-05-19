import { prisma } from "../src/utils/prisma.js";
import bcrypt from "bcryptjs";

export const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;
    const adminPhone = process.env.ADMIN_PHONE;
    const adminSalary = process.env.ADMIN_SALARY;
    const adminAddress = process.env.ADMIN_ADDRESS;

    if (!adminEmail || !adminPassword || !adminName) {
      console.log(
        "⚠ Admin credentials missing in .env - skipping admin creation",
      );
      return;
    }

    // ← seed all 5 roles
    const roles = [
      { role_name: "admin", description: "Full system access and management" },
      { role_name: "waiter", description: "Takes and manages food orders" },
      {
        role_name: "kitchen",
        description: "Prepares and manages kitchen orders",
      },
      {
        role_name: "reception",
        description: "Manages guest check-ins and reservations",
      },
      {
        role_name: "manager",
        description: "Oversees daily operations and staff",
      },
    ];

    for (const role of roles) {
      await prisma.role.upsert({
        where: { role_name: role.role_name },
        update: {},
        create: role,
      });
    }

    console.log("✓ All roles seeded successfully");

    // ← create admin user
    const existingAdmin = await prisma.user.findFirst({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      return;
    }

    const hashedPass = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
      data: {
        full_name: adminName,
        email: adminEmail,
        password: hashedPass,
        phone: adminPhone,
        status: "active",
        salary: Number(adminSalary),
        address: adminAddress,
        role: {
          connect: { role_name: "admin" },
        },
      },
    });

    console.log(
      `✓ Admin '${admin.full_name}' created successfully with role ADMIN`,
    );
  } catch (error) {
    console.error("Error in seed:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};
