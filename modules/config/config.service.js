import configRepository from "./config.repository.js";
import * as errors from "../../errors/errors.js";

export async function getConfig() {
 const config = await configRepository.findAll();
 if (!config || config.length === 0) throw new  errors.NotFoundError("Data not found");
 return config;
}

export async function updateNotification(deport_location,notification_template) {
 const config = await configRepository.getByDeportLocation(deport_location);
 if (!config) throw new errors.BadRequestError("deport not found");
 return await configRepository.updateTemplate(deport_location,notification_template);
}

export async function updateLat_Fat_Table(deport_location,lat_fat_table) {
 const config = await configRepository.getByDeportLocation(deport_location);
 if (!config) throw new errors.NotFoundError("Deport not found");
 return await configRepository.updateTemplate(data.deport_location, data.volume);
}

export async function updateConfigTemplate(data) {
 const config = await configRepository.getByDeportLocation(data.deport_location);
 if (!config) throw new errors.NotFoundError("Deport not found");
 return await configRepository.updateTemplate(data.deport_location, data.template);
}