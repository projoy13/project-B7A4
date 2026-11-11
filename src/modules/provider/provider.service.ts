import prisma from "../../lib/prisma"

const getDashboardStatus = async (providerId: string) => {
  const [totalGear, pendingOrders, activeRentals] = await Promise.all([
    prisma.gearItem.count({
      where: { providerId },
    }),
    prisma.rentalOrder.count({
      where: {
        status: "PLACED",
        items: {
          some: {
            gearItem: { is: { providerId } },
          },
        },
      },
    }),
    prisma.rentalOrder.count({
      where: {
        status: { in: ["CONFIRMED", "PICKED_UP"] },
        items: {
          some: {
            gearItem: { is: { providerId } },
          },
        },
      },
    }),
  ])

  return {
    totalGear,
    pendingOrders,
    activeRentals,
  }
}

export const providerService = {
  getDashboardStatus,
}