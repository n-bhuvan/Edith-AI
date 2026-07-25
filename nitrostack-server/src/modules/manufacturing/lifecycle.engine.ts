export class LifecycleEngine {

  static assess(machine: any) {

    let score = 0;
    const reasons: string[] = [];

    // Tool Wear
    if (machine.tool_wear >= 180) {
      score += 40;
      reasons.push("Very high tool wear detected.");
    } else if (machine.tool_wear >= 100) {
      score += 20;
      reasons.push("Moderate tool wear detected.");
    } else {
      reasons.push("Tool wear is within safe limits.");
    }

    // Torque
    if (machine.torque > 60) {
      score += 25;
      reasons.push("High torque indicates heavy machine load.");
    } else {
      reasons.push("Torque is within the normal operating range.");
    }

    // Rotational Speed
    if (machine.rotational_speed < 1200) {
      score += 20;
      reasons.push("Rotational speed is below the recommended range.");
    } else {
      reasons.push("Rotational speed is normal.");
    }

    // Temperature Difference
    const temperatureDifference =
      machine.process_temperature - machine.air_temperature;

    if (temperatureDifference > 15) {
      score += 15;
      reasons.push("Large temperature difference detected.");
    } else {
      reasons.push("Operating temperature is stable.");
    }

    let decision = "";
    let riskLevel = "";
    let actions: string[] = [];

    if (score < 25) {

      decision = "Continue";
      riskLevel = "Low";

      actions = [
        "Continue production",
        "Perform routine preventive maintenance"
      ];

    } else if (score < 60) {

      decision = "Retrofit";
      riskLevel = "Medium";

      actions = [
        "Install IoT monitoring sensors",
        "Increase maintenance frequency",
        "Monitor machine closely"
      ];

    } else {

      decision = "Replace";
      riskLevel = "High";

      actions = [
        "Plan machine replacement",
        "Avoid heavy production",
        "Replace worn components immediately"
      ];

    }

    return {
      decision,
      riskLevel,
      score,
      reasons,
      actions
    };
  }

}