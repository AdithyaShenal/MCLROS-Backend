import * as repository from "./analytics.repository.js";

export async function miniDashboardService() {
  const totalPendingProductionVolume =
    await repository.getTotalPendingProduction();
  const totalAvailableTruckCapacity = await repository.getTotalTruckCapacity();

  let autoResolvability = true;
  let routeWiseResolvability = true;

  if (totalPendingProductionVolume > totalAvailableTruckCapacity) {
    autoResolvability = false;
  }

  const productionSumByRoute = await repository.getProductionSumByRoute();
  const truckCapacityByRoute = await repository.getTruckCapacityByRoute();

  const capacityMap = {};
  truckCapacityByRoute.forEach((t) => {
    capacityMap[t.route] = t.totalCapacity;
  });

  productionSumByRoute.forEach((p) => {
    const route = p.route;
    const productionVolume = p.totalVolume;
    const capacity = capacityMap[route] || 0;

    if (productionVolume > capacity) {
      routeWiseResolvability = false;
    }
  });

  return {
    totalVolume: totalPendingProductionVolume,
    availableCapacity: totalAvailableTruckCapacity,
    autoResolvability,
    routeWiseResolvability,
  };
}
