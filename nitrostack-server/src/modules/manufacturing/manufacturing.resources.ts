import { ResourceDecorator as Resource } from "@nitrostack/core";

export class ManufacturingResources {

  @Resource({
    uri: "manufacturing://guide",
    name: "Manufacturing Guide",
    description: "Overview of Edith AI manufacturing capabilities.",
    mimeType: "text/markdown"
  })
  manufacturingGuide() {
    return `
# Edith AI Manufacturing Guide

Edith AI helps factory managers analyze industrial machines.

Available capabilities:

- Search machines
- View machine details
- Assess machine lifecycle
- View maintenance history
- Calculate ROI
- Recommend whether to Continue, Retrofit, or Replace

Use a valid machine ID (e.g. M14860) for machine-specific analysis.
`;
  }

  @Resource({
    uri: "manufacturing://decision-framework",
    name: "Decision Framework",
    description: "Business rules used for lifecycle recommendations.",
    mimeType: "text/markdown"
  })
  decisionFramework() {
    return `
# Decision Framework

## Continue
- Machine health is Healthy
- Low risk
- Good ROI
- Routine maintenance only

## Retrofit
- Medium health
- Moderate risk
- Upgrade sensors or components
- Extend useful life

## Replace
- Critical health
- High failure risk
- Poor ROI
- End of useful life
`;
  }

  @Resource({
    uri: "manufacturing://dataset",
    name: "Dataset Information",
    description: "Information about the manufacturing dataset.",
    mimeType: "text/markdown"
  })
  datasetInformation() {
    return `
# Dataset

Source:
AI4I 2020 Predictive Maintenance Dataset

Processed datasets:

- machines.csv
- maintenance.csv
- machine_history.csv
- business_costs.csv
- machine_profile.csv

Machine Types:

- L = Low Capacity
- M = Medium Capacity
- H = High Capacity

Health Labels:

- Healthy
- Medium
- Critical
`;
  }
}