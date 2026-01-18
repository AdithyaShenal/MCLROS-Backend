import Production from "../production/production.model.js";
import mongoose from "mongoose";

export async function compileDashboardData(today) {
  const startofDay = new Date(today.setHours(0, 0, 0, 0));
  const startofMonths = new Date(today.getFullYear(), today.getMonth(), 1);

  const [
    todayCollection,
    monthCollection,
    weeklyData,
    productionStats,
    vehicleStats,
    completedFailedRatio,
    dailyProductionCount,
  ] = await Promise.all([
    getTodayCollection(startofDay),
    getMonthCollection(startofMonths),
    getWeeklChartData(today),
    getProductionStats(startofDay),
    getVehiclePickupStats(startofDay),
    getCompletedFialedRatio(startofDay),
    getDailyProductionCount(today),
  ]);

  return {
    summaryCards: {
      totalLitersToday: todayCollection.totalVolume,
      totalLitersThisMonth: monthCollection.totalVolume,
      avgPickupsPerVehicle: vehicleStats.avgPickups,
      totalProductionPending: productionStats.pendingCount,
    },

    weeklyCharts: {
      litersPerDay: weeklyData.litersData,
      distancePerDay: weeklyData.distanceData,
      productionStatusRatio: {
        completed: completedFailedRatio.completed,
        failed: completedFailedRatio.failed,
      },
    },

    additionalCharts: {
      productionsPerDay: dailyProductionCount,
      qualityTrends: await getQualityTrends(today),
      routeEfficiency: await getRouteEfficiency(today),
    },

    rawData: {
      todayDate: today.toISOString().split("T")[0],
      weekStart: getWeekStartDate(today).toISOString().split("T")[0],
      dataPoints: weeklyData.totalDataPoints,
    },
  };
}

async function getTodayCollection(startOfDay) {
  const result = await Production.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfDay },
        status: "collected",
      },
    },
    {
      $group: {
        _id: null,
        totalVolume: { $sum: "$collectedVolume" },
        count: { $sum: 1 },
      },
    },
  ]);

  return {
    totalVolume: result[0]?.totalVolume || 0,
    totalCollections: result[0]?.count || 0,
  };
}

async function getMonthCollection(startOfMonth) {
  const result = await Production.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth },
        status: "collected",
      },
    },
    {
      $group: {
        _id: null,
        totalVolume: { $sum: "$collectedVolume" },
      },
    },
  ]);

  return {
    totalVolume: result[0]?.totalVolume || 0,
  };
}
