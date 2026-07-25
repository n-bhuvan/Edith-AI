import { ToolDecorator as Tool, ExecutionContext, z } from "@nitrostack/core";
import { LifecycleEngine } from "./lifecycle.engine";
import { ROIEngine } from "./roi.engine";
import { RecommendationEngine } from "./recommendation.engine";
import { MachineProfileLoader } from "./machine_profile.loader";

export class ManufacturingTools {

    @Tool({
        name: "search_machines",
        description: "Search manufacturing machines by health status, machine type, or result limit. Returns a filtered list of machines for analysis.",
        inputSchema: z.object({
            health: z.string().optional(),
            machine_type: z.string().optional(),
            limit: z.number().optional()
        })
    })
    async searchMachines(
        params: {
            health?: string;
            machine_type?: string;
            limit?: number;
        },
        ctx: ExecutionContext
    ) {

        const machines = await MachineProfileLoader.searchMachines(params);

        return {
            success: true,
            count: machines.length,
            machines: machines.map(machine => ({
                machine_id: machine.machine_id,
                machine_type: machine.machine_type,
                health: machine.health,
                remaining_life: machine.remaining_useful_life_years,
                maintenance_count: machine.maintenance_count
            }))
        };
    }
    @Tool({
        name: "recommend_machine_action",
        description: "Generate the final business recommendation by combining lifecycle analysis and ROI evaluation to recommend Continue, Retrofit, or Replace.",
        inputSchema: z.object({
            machine_id: z.string()
        })
    })
    
    async recommendMachineAction(
        params: { machine_id: string },
        ctx: ExecutionContext
    ) {

        const machine = await MachineProfileLoader.getMachine(params.machine_id);

        if (!machine) {
            return {
                success: false,
                message: "Machine not found"
            };
        }

        const result = RecommendationEngine.recommend(machine);

        return {
            success: true,
            machine_id: machine.machine_id,
            ...result
        };
    }
    @Tool({
        name: "calculate_machine_roi",
        description: "Calculate ROI and recommend whether to continue, retrofit or replace a machine.",
        inputSchema: z.object({
            machine_id: z.string()
        })
    })
    async calculateMachineROI(
        params: { machine_id: string },
        ctx: ExecutionContext
    ) {

        const machine = await MachineProfileLoader.getMachine(params.machine_id);

        if (!machine) {
            return {
                success: false,
                message: "Machine not found"
            };
        }

        const roi = ROIEngine.calculate(machine);

        return {
            success: true,
            machine_id: machine.machine_id,
            ...roi
        };
    }
  @Tool({
    name: "get_machine_details",
    description: "Retrieve the complete profile of a manufacturing machine, including temperatures, rotational speed, torque, tool wear, health status, maintenance information, and remaining useful life.",
    inputSchema: z.object({
      machine_id: z.string().describe("Unique Machine ID")
    }),
    examples: {
      request: {
        machine_id: "M14860"
      },
      response: {
        machine_id: "M14860",
        machine_type: "M",
        air_temperature: 298.1,
        process_temperature: 308.6,
        rotational_speed: 1551,
        torque: 42.8,
        tool_wear: 0,
        health: "Healthy"
      }
    }
  })
  async getMachineDetails(input: any, ctx: ExecutionContext) {

    ctx.logger.info("Fetching machine details", {
      machine_id: input.machine_id
    });

    const machine = await MachineProfileLoader.getMachine(input.machine_id);

    if (!machine) {
      throw new Error(`Machine '${input.machine_id}' not found.`);
    }

    return machine;
  }

    @Tool({
        name: "get_maintenance_history",
        description: "Retrieve the maintenance history of a machine, including maintenance count, maintenance type, service intervals, downtime, maintenance cost, and failure history.",
        inputSchema: z.object({
            machine_id: z.string()
        })
    })
    async getMaintenanceHistory(
        params: { machine_id: string },
        ctx: ExecutionContext
    ) {

        const machine = await MachineProfileLoader.getMachine(params.machine_id);

        if (!machine) {
            return {
                success: false,
                message: "Machine not found"
            };
        }

        return {
            success: true,
            machine_id: machine.machine_id,
            maintenance_count: machine.maintenance_count,
            maintenance_type: machine.maintenance_type,
            last_service_days: machine.last_service_days,
            next_service_days: machine.next_service_days,
            total_downtime_hours: machine.total_downtime_hours,
            maintenance_cost: machine.maintenance_cost,
            last_failure: machine.last_failure
        };
    }

  @Tool({
    name: "assess_machine_lifecycle",
    description: "Analyze the machine's operational health and determine whether it should Continue, Retrofit, or Replace based on lifecycle analysis and risk assessment.",
    inputSchema: z.object({
      machine_id: z.string().describe("Unique Machine ID")
    }),
    examples: {
      request: {
        machine_id: "M14860"
      },
      response: {
        machine_id: "M14860",
        machine_type: "M",
        health: "Healthy",
        decision: "Continue",
        risk_level: "Low",
        risk_score: 5,
        reasons: [
          "Tool wear is within safe limits.",
          "Torque is within the normal operating range.",
          "Rotational speed is normal.",
          "Operating temperature is stable."
        ],
        recommended_actions: [
          "Continue production",
          "Perform routine preventive maintenance"
        ]
      }
    }
  })
  async assessMachineLifecycle(input: any, ctx: ExecutionContext) {

    ctx.logger.info("Assessing machine lifecycle", {
      machine_id: input.machine_id
    });

    const machine = await MachineProfileLoader.getMachine(input.machine_id);

    if (!machine) {
      throw new Error(`Machine '${input.machine_id}' not found.`);
    }

    const assessment = LifecycleEngine.assess(machine);

    return {
      machine_id: machine.machine_id,
      machine_type: machine.machine_type,
      health: machine.health,

      decision: assessment.decision,
      risk_level: assessment.riskLevel,
      risk_score: assessment.score,

      reasons: assessment.reasons,

      recommended_actions: assessment.actions
    };
  }
}
