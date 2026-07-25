import { LifecycleEngine } from "./lifecycle.engine";
import { ROIEngine } from "./roi.engine";

export class RecommendationEngine {

    static recommend(machine: any) {

        const lifecycle = LifecycleEngine.assess(machine);
        const roi = ROIEngine.calculate(machine);

        let action = "Continue";
        const reasons: string[] = [];

        // Decision priority
        if (
            lifecycle.decision === "Replace" ||
            roi.recommendation === "Replace"
        ) {
            action = "Replace";
        }
        else if (
            lifecycle.decision === "Retrofit" ||
            roi.recommendation === "Retrofit"
        ) {
            action = "Retrofit";
        }

        // Explain the decision
        reasons.push(`Machine health: ${machine.health}`);
        reasons.push(`Remaining useful life: ${machine.remaining_useful_life_years} years`);
        reasons.push(`Lifecycle decision: ${lifecycle.decision}`);
        reasons.push(`ROI recommendation: ${roi.recommendation}`);

        return {
            recommended_action: action,
            confidence: calculateConfidence(machine),
            reasons,
            lifecycle,
            roi
        };
    }
}

function calculateConfidence(machine: any): number {

    let score = 100;

    if (machine.health === "Medium")
        score -= 15;

    if (machine.health === "Critical")
        score -= 30;

    if (machine.remaining_useful_life_years <= 3)
        score -= 10;

    if (machine.total_downtime_hours > 20)
        score -= 10;

    // Keep score between 0 and 100
    return Math.max(0, Math.min(100, score));
}