import * as repository from "./analytics.repository.js";

export async function miniDashboardService() {
  await repository.getTotalPendingProduction();

  await repository.getTotalTruckCapacity();
}
