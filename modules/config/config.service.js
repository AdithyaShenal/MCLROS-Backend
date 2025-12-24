import configRepository from "./config.repository.js";
import * as errors from "../../errors/errors.js";

export async function getConfig() {
 const config = await configRepository.findAll();
 if (!config) throw new  errors.NotFoundError("Data not found");
 return config;
}

export async function createConfig(data) {
 const config = await configRepository.getByDeportLocation(data.deport_location);
 if (config) throw new errors.BadRequestError("Deport location already exists");
 return await configRepository.create(data);
}

export async function updateConfigVolume(data) {
 const config = await configRepository.getByDeportLocation(data.deport_location);
 if (!config) throw new errors.NotFoundError("Deport not found");
 return await configRepository.updateTemplate(data.deport_location, data.volume);
}

export async function updateConfigTemplate(data) {
 const config = await configRepository.getByDeportLocation(data.deport_location);
 if (!config) throw new errors.NotFoundError("Deport not found");
 return await configRepository.updateTemplate(data.deport_location, data.template);
}