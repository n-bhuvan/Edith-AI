import fs from "fs";
import path from "path";
import csv from "csv-parser";

export interface MachineProfile {
  machine_id: string;
  machine_type: string;

  air_temperature: number;
  process_temperature: number;
  rotational_speed: number;
  torque: number;
  tool_wear: number;
  health: string;

  maintenance_count: number;
  last_service_days: number;
  next_service_days: number;
  maintenance_type: string;
  total_downtime_hours: number;
  maintenance_cost: number;
  last_failure: string;

  operating_hours: number;
  estimated_age_years: number;
  remaining_useful_life_years: number;
  utilization_percent: number;
  health_trend: string;

  annual_maintenance: number;
  retrofit_cost: number;
  replacement_cost: number;
  expected_life_years: number;
  energy_cost_per_year: number;
  resale_value: number;
  production_loss_per_day: number;
}

export class MachineProfileLoader {
    
  private static machines: MachineProfile[] = [];

  static async loadProfiles(): Promise<void> {

    if (this.machines.length > 0) return;

    const filePath = path.join(
      process.cwd(),
      "../dataset/processed/machine_profile.csv"
    );

    return new Promise((resolve, reject) => {

      fs.createReadStream(filePath)

        .pipe(csv())

        .on("data", (row) => {

          this.machines.push({

            ...row,

            air_temperature: Number(row.air_temperature),
            process_temperature: Number(row.process_temperature),
            rotational_speed: Number(row.rotational_speed),
            torque: Number(row.torque),
            tool_wear: Number(row.tool_wear),

            maintenance_count: Number(row.maintenance_count),
            last_service_days: Number(row.last_service_days),
            next_service_days: Number(row.next_service_days),
            total_downtime_hours: Number(row.total_downtime_hours),
            maintenance_cost: Number(row.maintenance_cost),

            operating_hours: Number(row.operating_hours),
            estimated_age_years: Number(row.estimated_age_years),
            remaining_useful_life_years: Number(row.remaining_useful_life_years),
            utilization_percent: Number(row.utilization_percent),

            annual_maintenance: Number(row.annual_maintenance),
            retrofit_cost: Number(row.retrofit_cost),
            replacement_cost: Number(row.replacement_cost),
            expected_life_years: Number(row.expected_life_years),
            energy_cost_per_year: Number(row.energy_cost_per_year),
            resale_value: Number(row.resale_value),
            production_loss_per_day: Number(row.production_loss_per_day)

          });

        })

        .on("end", () => resolve())

        .on("error", reject);

    });

  }

  static async getMachine(machineId: string) {

    await this.loadProfiles();

    return this.machines.find(
      m => m.machine_id === machineId
    );

  }

  static async getAllMachines() {

    await this.loadProfiles();

    return this.machines;

  }

  static async searchMachines(filters: {
    health?: string;
    machine_type?: string;
    limit?: number;
}): Promise<MachineProfile[]> {

    await this.loadProfiles();

    let results = this.machines;

    if (filters.health) {
        results = results.filter(machine =>
            machine.health.toLowerCase() === filters.health!.toLowerCase()
        );
    }

    if (filters.machine_type) {
        results = results.filter(machine =>
            machine.machine_type.toLowerCase() === filters.machine_type!.toLowerCase()
        );
    }

    return results.slice(0, filters.limit ?? 10);
}

}