import * as routingService from "./routing.service.js";

export async function generateRoutesAuto(req, res) {
  const routes = await routingService.generateRoutesAuto();

  return res.status(200).json(routes);
}
