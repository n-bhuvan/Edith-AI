import os
import pandas as pd

# ==========================================================
# Configuration
# ==========================================================

RAW_DATA = "dataset/raw/ai4i2020.csv"
OUTPUT_DIR = "dataset/processed"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ==========================================================
# Load Dataset
# ==========================================================

df = pd.read_csv(RAW_DATA)

# Rename columns
df = df.rename(columns={
    "Product ID": "machine_id",
    "Type": "machine_type",
    "Air temperature [K]": "air_temperature",
    "Process temperature [K]": "process_temperature",
    "Rotational speed [rpm]": "rotational_speed",
    "Torque [Nm]": "torque",
    "Tool wear [min]": "tool_wear",
    "Machine failure": "machine_failure"
})

# ==========================================================
# Health Classification
# ==========================================================

def classify_health(row):
    if row["machine_failure"] == 1:
        return "Critical"
    elif row["tool_wear"] >= 180:
        return "Critical"
    elif row["tool_wear"] >= 80:
        return "Medium"
    else:
        return "Healthy"

df["health"] = df.apply(classify_health, axis=1)

# ==========================================================
# DATASET 1 : machines.csv
# ==========================================================

machines = df[
    [
        "machine_id",
        "machine_type",
        "air_temperature",
        "process_temperature",
        "rotational_speed",
        "torque",
        "tool_wear",
        "health"
    ]
]

machines.to_csv(
    f"{OUTPUT_DIR}/machines.csv",
    index=False
)

# ==========================================================
# DATASET 2 : maintenance.csv
# ==========================================================

maintenance = pd.DataFrame()

maintenance["machine_id"] = df["machine_id"]

maintenance["maintenance_count"] = (
    (df["tool_wear"] / 35).astype(int)
    + df["machine_failure"] * 2
    + 1
)

maintenance["last_service_days"] = (
    120 - df["tool_wear"] // 2
).clip(lower=5)

maintenance["next_service_days"] = (
    180 - df["tool_wear"] // 2
).clip(lower=10)

maintenance["maintenance_type"] = df.apply(
    lambda row:
        "Emergency"
        if row["machine_failure"] == 1
        else (
            "Corrective"
            if row["tool_wear"] >= 120
            else "Preventive"
        ),
    axis=1
)

maintenance["total_downtime_hours"] = (
    df["machine_failure"] * 24
    + df["tool_wear"] // 12
)

base_cost = {
    "L": 300,
    "M": 600,
    "H": 1000
}

maintenance["maintenance_cost"] = [
    base_cost[t] + count * 150
    for t, count in zip(
        df["machine_type"],
        maintenance["maintenance_count"]
    )
]

maintenance["last_failure"] = df["machine_failure"].map({
    0: "No",
    1: "Yes"
})

maintenance.to_csv(
    f"{OUTPUT_DIR}/maintenance.csv",
    index=False
)

# ==========================================================
# DATASET 3 : machine_history.csv
# ==========================================================

history = pd.DataFrame()

history["machine_id"] = df["machine_id"]

history["operating_hours"] = (
    df["tool_wear"] * 45
    + df["rotational_speed"] * 2
)

history["estimated_age_years"] = (
    history["operating_hours"] / 2500
).round(1)

history["remaining_useful_life_years"] = (
    10 - history["estimated_age_years"]
).clip(lower=0).round(1)

history["utilization_percent"] = (
    (df["rotational_speed"] / 3000) * 100
).round(1)

def health_trend(h):

    if h == "Healthy":
        return "Stable"

    elif h == "Medium":
        return "Declining"

    return "Critical"

history["health_trend"] = df["health"].apply(
    health_trend
)

history.to_csv(
    f"{OUTPUT_DIR}/machine_history.csv",
    index=False
)

# ==========================================================
# DATASET 4 : business_costs.csv
# ==========================================================

business = pd.DataFrame({

    "machine_type": [
        "L",
        "M",
        "H"
    ],

    "annual_maintenance": [
        2500,
        4500,
        7000
    ],

    "retrofit_cost": [
        8000,
        15000,
        25000
    ],

    "replacement_cost": [
        25000,
        45000,
        70000
    ],

    "expected_life_years": [
        5,
        7,
        10
    ],

    "energy_cost_per_year": [
        1500,
        2800,
        4200
    ],

    "resale_value": [
        5000,
        9000,
        15000
    ],

    "production_loss_per_day": [
        800,
        1500,
        2500
    ]

})

business.to_csv(
    f"{OUTPUT_DIR}/business_costs.csv",
    index=False
)

# ==========================================================
# DATASET 5 : machine_profile.csv
# ==========================================================

profile = (
    machines
    .merge(
        maintenance,
        on="machine_id"
    )
    .merge(
        history,
        on="machine_id"
    )
    .merge(
        business,
        on="machine_type"
    )
)

profile.to_csv(
    f"{OUTPUT_DIR}/machine_profile.csv",
    index=False
)

# ==========================================================
# Done
# ==========================================================

print("\n====================================")
print("Datasets Generated Successfully")
print("====================================")
print("✓ machines.csv")
print("✓ maintenance.csv")
print("✓ machine_history.csv")
print("✓ business_costs.csv")
print("✓ machine_profile.csv")
print("====================================")