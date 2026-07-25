# Edith-AI Agentic AI Architecture

## Overview

Edith-AI is an Agentic AI platform that helps manufacturing companies decide whether a machine should be:

- Continue Using
- Retrofit
- Replace

The system uses multiple AI agents coordinated through an Orchestrator Agent and NitroStack MCP tools.

---

# High-Level Workflow

User
↓
Frontend (React)
↓
Backend (FastAPI)
↓
Orchestrator Agent
↓
Machine Assessment Agent
↓
Maintenance Intelligence Agent
↓
ROI Analysis Agent
↓
Decision Engine
↓
NitroStack MCP Tools
↓
Final Recommendation
↓
Frontend Dashboard

---

# Agent Responsibilities

## 1. Orchestrator Agent

Responsibilities:

- Receive the user request
- Coordinate all AI agents
- Combine responses
- Handle failures
- Return the final structured response

---

## 2. Machine Assessment Agent

Inputs:

- Machine age
- Running hours
- Vibration
- Temperature
- Power consumption

Outputs:

- Machine Health Score
- Failure Probability
- Remaining Useful Life

---

## 3. Maintenance Intelligence Agent

Inputs:

- Maintenance history
- Downtime
- Repair frequency
- Spare part usage

Outputs:

- Maintenance Risk
- Maintenance Recommendation

---

## 4. ROI Analysis Agent

Inputs:

- Retrofit cost
- Replacement cost
- Energy savings
- Productivity improvement

Outputs:

- ROI
- Payback Period
- Financial Recommendation

---

## 5. Decision Engine

Receives outputs from all agents.

Returns one recommendation:

- Continue
- Retrofit
- Replace

with reasoning and confidence score.

---

# MCP Tools

Machine DB Tool

- Fetch machine information

Maintenance Tool

- Fetch maintenance records

ROI Tool

- Calculate financial metrics

Report Tool

- Generate PDF report

---

# Future Improvements

- Predictive Maintenance
- IoT Sensor Integration
- Live Dashboard
- ERP Integration
- SAP Integration