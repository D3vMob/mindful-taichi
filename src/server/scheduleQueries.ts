import "server-only";
import { db } from "./db";
export async function getSchedule() {
  const schedule = db.query.schedule.findFirst();
  return schedule;
}
