import Config from "./config.model";

export async function findAll() {
 return await Config.find();
}

export async function create(data) {
 const config = new Config(data);
 return await config.save();
}

export async function updateTemplate(deport_location,notification_template) {
 return await Config.findOneAndUpdate({"deport_location.lat":deport_location.lat, "deport_location.lon":deport_location.lon}, {$set:{notification_template}}, 
 {new: true},
 );
}

export async function updateTemplate(deport_location, lat_fat_table) {
  return await Config.findOneAndUpdate(
    { "deport_location.lat": deport_location.lat, "deport_location.lon": deport_location.lon },
    { $set: { lat_fat_table } },
    {
      new: true,
    }
  )
}

export async function getByDeportLocation(deport_location) {
 return await Config.findOne({ "deport_location.lat": deport_location.lat, "deport_location.lon": deport_location.lon });
}