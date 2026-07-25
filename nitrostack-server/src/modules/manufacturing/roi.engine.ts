export interface ROIResult {
    annualMaintenance: number;
    retrofitCost: number;
    replacementCost: number;
    annualEnergyCost: number;
    productionLoss: number;

    continueCost: number;
    retrofitROI: number;
    replacementROI: number;

    recommendation: string;
}

export class ROIEngine {

    static calculate(machine: any): ROIResult {

    const continueCost =
        machine.annual_maintenance +
        machine.energy_cost_per_year +
        (machine.production_loss_per_day * machine.total_downtime_hours);

    const retrofitROI =
        continueCost - machine.retrofit_cost;

    const replacementROI =
        continueCost - machine.replacement_cost;

    let recommendation = "Continue";

    if (
        machine.health === "Critical" ||
        machine.remaining_useful_life_years <= 1
    ) {

        recommendation = "Replace";

    }
    else if (
        machine.health === "Medium" ||
        machine.remaining_useful_life_years <= 3
    ) {

        recommendation = "Retrofit";

    }

    return {

        annualMaintenance: machine.annual_maintenance,

        retrofitCost: machine.retrofit_cost,

        replacementCost: machine.replacement_cost,

        annualEnergyCost: machine.energy_cost_per_year,

        productionLoss: machine.production_loss_per_day,

        continueCost,

        retrofitROI,

        replacementROI,

        recommendation

    };

}
}