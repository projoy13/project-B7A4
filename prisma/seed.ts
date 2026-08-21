import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";
import { Role, GearStatus } from "./generated/prisma/enums";

async function main() {
  console.log("Seeding database...");

  const password = await bcrypt.hash("password123", 10);

  //  USERS 

  const [
    admin1,
    admin2,
    customer1,
    customer2,
    provider1,
    provider2,
  ] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Spider Man",
        email: "spiderman@gmail.com",
        password,
        role: Role.ADMIN,
      },
    }),

    prisma.user.create({
      data: {
        name: "Superman",
        email: "superman@gmail.com",
        password,
        role: Role.ADMIN,
      },
    }),

    prisma.user.create({
      data: {
        name: "Batman",
        email: "batman@gmail.com",
        password,
        role: Role.CUSTOMER,
      },
    }),

    prisma.user.create({
      data: {
        name: "Thor",
        email: "thor@gmail.com",
        password,
        role: Role.CUSTOMER,
      },
    }),

    prisma.user.create({
      data: {
        name: "Iron Man",
        email: "ironman@gmail.com",
        password,
        role: Role.PROVIDER,
      },
    }),

    prisma.user.create({
      data: {
        name: "Captain America",
        email: "captainamerica@gmail.com",
        password,
        role: Role.PROVIDER,
      },
    }),
  ]);

  console.log("Users created");

  // CATEGORIES 

  const [cycling, camping, fitness] = await Promise.all([
    prisma.category.create({
      data: {
        name: "Cycling",
        // description: "Bikes and cycling equipment",
      },
    }),

    prisma.category.create({
      data: {
        name: "Camping",
        // description: "Camping and outdoor equipment",
      },
    }),

    prisma.category.create({
      data: {
        name: "Fitness",
        // description: "Fitness and gym equipment",
      },
    }),
  ]);

  console.log("Categories created");

  // GEAR ITEMS 

  await Promise.all([
    prisma.gearItem.create({
      data: {
        name: "Mountain Bike",
        description: "Professional mountain bike",
        brand: "Trek",
        pricePerDay: 25,
        stock: 5,
        status: GearStatus.AVAILABLE,
        providerId: provider1.id,
        categoryId: cycling.id,
      },
    }),

    prisma.gearItem.create({
      data: {
        name: "Camping Tent",
        description: "4 person camping tent",
        brand: "Coleman",
        pricePerDay: 20,
        stock: 10,
        status: GearStatus.AVAILABLE,
        providerId: provider1.id,
        categoryId: camping.id,
      },
    }),

    prisma.gearItem.create({
      data: {
        name: "Dumbbell Set",
        description: "Adjustable dumbbell set",
        brand: "Nike",
        pricePerDay: 15,
        stock: 8,
        status: GearStatus.AVAILABLE,
        providerId: provider2.id,
        categoryId: fitness.id,
      },
    }),

    prisma.gearItem.create({
      data: {
        name: "Road Bicycle",
        description: "Lightweight bicycle for road cycling",
        brand: "Giant",
        pricePerDay: 30,
        stock: 4,
        status: GearStatus.AVAILABLE,
        providerId: provider2.id,
        categoryId: cycling.id,
      },
    }),
  ]);

  console.log("Gear items created");

  console.log("Seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("Seeding error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
//    ata amara kori karon initial kicu data ,database a put korar jonno