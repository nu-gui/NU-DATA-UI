# NU-DATA-UI Project Documentation

This directory contains comprehensive documentation for the NU-DATA-UI project, organized into specific sections for different aspects of the project.

## Documentation Structure

### API Documentation
- **Location**: `docs/api/`
- **Purpose**: Contains OpenAPI 3.1 schema and API reference documentation
- **Key Files**: 
  - `openapi-schema.yaml`: The complete API specification

### Figma Design Documentation
- **Location**: `docs/figma/`
- **Purpose**: Guidelines for exporting Figma designs to code
- **Key Files**:
  - `figma-to-code-export-playbook.md`: Step-by-step guide for the Figma-to-React pipeline

### Issues and Tasks
- **Location**: `docs/issues/`
- **Purpose**: Detailed descriptions of development tasks and issues
- **Key Files**:
  - `nu-data-ui-phase1-issues.md`: Comprehensive list of Phase 1 issues
  - `phase-1-issues-md/`: Individual issue descriptions for Phase 1

### Project Overview
- **Location**: `docs/project-overview/`
- **Purpose**: High-level descriptions of the project's purpose and features
- **Key Files**:
  - `project-overview-nu-data-ui--platform.md`: Detailed overview of platform features
  - Meeting records and requirement documents

### Session Series
- **Location**: `docs/session-series/`
- **Purpose**: Documentation for development sessions organized by phase
- **Key Files**:
  - `series-id-groupings-and-execution-priorities.md`: Series ID layout and execution order
  - `phase-1/`: Session documents for Phase 1
  - `phase-1/phase-1-execution-index.md`: Index of all Phase 1 sessions

## Documentation Conventions
- Session files follow the naming convention: `session-{SERIES_ID}-nu-data-ui-{short-task-slug}.md`
- Series IDs map to functional domains (e.g., 'B' for Backend, 'M' for Frontend, etc.)
- Each session document includes objectives, scope, implementation notes, and dependencies
- Completed sessions are archived in `docs/session-series/phase-X/archive/`

## Updating Documentation
When contributing to the documentation:
1. Follow the established file naming conventions
2. Maintain the existing markdown formatting style
3. Update related documentation when implementing changes
4. Ensure cross-references between documents remain valid
