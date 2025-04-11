# Session LLM1 – RPC/WPC Scoring & Name Match Engine

**Primary Repo**: NU-DATA-UI  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @devin, @wes

---

## 🎯 Objective
Design and implement the AI-driven Right Party Contact (RPC) and Wrong Party Contact (WPC) scoring engine. Use fuzzy name matching and number-based prioritization logic to enrich records and generate confidence scores per contact entry.

---

## 📦 Scope
- Name scoring model (match %, strong/med/low tiers)
- Reverse Number Lookup enrichment integration
- Scoring matrix between source and 3rd-party full names
- Phone number prioritization logic based on RPC score
- Output tagging: RPC / WPC / Partial / No Match
- Support for multiple phone numbers per contact
- Fuzzy logic layer using libraries (e.g. `fuzzywuzzy`, `rapidfuzz`)

---

## 🔢 Match Logic Workflow
1. Source file and reverse lookup results are paired by phone number
2. Extract `First`, `Middle`, `Last` from both source + 3rd-party
3. Score each subfield and compute weighted RPC score
4. Label confidence:
   - **High** (80–100%)
   - **Medium** (50–79%)
   - **Low** (0–49%)
5. Record result in `rpc_scores` table
6. Reprioritize phone numbers if WPC score is high and RPC is low

---

## 🧠 Output Schema (Table: `rpc_scores`)
| Column | Type | Description |
|--------|------|-------------|
| `entry_id` | UUID | Foreign key to list_entries |
| `match_type` | ENUM | high / medium / low / none |
| `rpc_score` | FLOAT | Total fuzzy match score (0.0 - 1.0) |
| `source_name` | TEXT | Original name from source list |
| `matched_name` | TEXT | Reverse lookup result name |
| `match_breakdown` | JSONB | Subfield matches: first, middle, last |
| `priority_change` | BOOL | Flag for number reprioritization |

---

## 🔗 Dependencies
- Output from enrichment engine (triggered via `/v1/enrichment`)
- Stored contact entries in `list_entries`
- Tables from `DA1` schema
- OpenAPI endpoints from `B1`

---

## 🧪 Testing & Validation
- Run test datasets through reverse lookup → score → label
- Edge cases: nicknames, swapped names, missing fields
- Validate reprioritization decisions
- Evaluate against ground truth (manual override support)

---

## 🚧 Next Steps
- Generate session: `session-T1-nu-data-ui-testsuite.md`
- Add RPC scoring rules to data export flow and reporting widgets
- Integrate as enrichment post-processing option in UI (M1/B1)

