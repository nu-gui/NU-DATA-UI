# 🧠 Devin AI Session – Phase 1 Continuation

## 🧱 Repository Context

```yaml
metadata:
  repo_primary: NU-DATA-UI (https://github.com/nu-gui/NU-DATA-UI)
  repo_secondary: nu-data-design (https://github.com/nu-gui/nu-data-design)
  purpose: Full-stack SaaS platform for contact data enrichment, segmentation, and analytics
  tech_stack:
    - React.js (Frontend)
    - Node.js / Python (Backend services)
    - PostgreSQL (Database)
    - OpenAPI 3.1 (API Spec)
    - FTP / Webhooks (Integration Layer)
    - CI/CD: GitHub Actions
```

## 🏁 Objectives

Continue Phase 1 of NU-DATA-UI by executing the remaining sessions in order:

1. **Session D1** - CI/CD GitHub Actions Setup
2. **Session T1** - Test Suite & Coverage Strategy

## 🔧 Execution Instructions

1. Start by syncing with the main branch:
   ```bash
   cd NU-DATA-UI
   git checkout main
   git pull origin main
   ```
   - Check repository for dependencies files and install all dependencies before continuing with your task.
   - Create a new working branch from the GitHub remote 'main' branch before continuing with your session planning

2. Read all documentation to understand the current state:
   - Review all files in `docs/` directory
   - Check GitHub issues at https://github.com/nu-gui/NU-DATA-UI/issues
   - Review previous work in `devin/` directory
   - Examine the roadmap status in `devin/logs/roadmap_status.md`
   - Review completed sessions in `docs/session-series/phase-1/archive/`
   - Start implementing the next session-ID tasks detailed in the roadmap documents
   - Fix all known issues, code quality issues before ending session 
   - Access the Design Repo when needed to ensure that the design and development are in sync with each other
   - Figma Design Access: 
       - Figma File URL: https://www.figma.com/design/KNF6khJCFlopk2BYGz7YZB/NU-Data?node-id=67-296&m=dev
       - Use environment variables for authentication

3. For each session:
   - Create a new branch following the format: `devin/$(date +%s)-session-{ID}`
   - Implement the session tasks
   - Create a PR and wait for user to merge
   - After the user merges the PR, make sure to sync with remote 'main' branch before starting the next session
   - Update GitHub issues and milestones after each session has completed

4. After completing each session:
   - Archive completed session files to `docs/session-series/phase-1/archive/`
   - Update `docs/session-series/phase-1/session-r1-nu-data-ui-roadmap.md`
   - Update task tracking files in `devin/` directory
   - Update and maintain dependencies files for the project

## 📌 Finalize Each Session

- Update GitHub 'issues' with appropriate labels and milestones
- Commit all changes including updated task tracking files
- Wait for user instructions before proceeding to the next session
- If the user tells you to prepare for the next session, please prepare the next session prompt and share the message in the chat, no need to create a new file for the next session prompt

## 📋 Session D1 - CI/CD GitHub Actions Setup

Focus on implementing a comprehensive CI/CD pipeline using GitHub Actions:
- Set up workflows for linting, testing, and building
- Configure deployment pipelines for staging and production
- Implement automated testing for both frontend and backend
- Set up Docker image building and publishing
- Configure environment-specific variables and secrets

## 📋 Session T1 - Test Suite & Coverage Strategy

After completing Session D1, implement a comprehensive testing strategy:
- Set up unit testing for frontend and backend components
- Implement integration tests for API endpoints
- Create end-to-end tests for critical user flows
- Configure code coverage reporting
- Set up test fixtures and mocks
- Integrate testing with the CI/CD pipeline

You only need to look in the following repos: nu-gui/NU-DATA-UI, nu-gui/nu-data-design
