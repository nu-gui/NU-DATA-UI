# Task Backlog - Placeholder Functions & Future Work

This file tracks identified placeholder code, mock implementations, and TODO comments that require future development work.

## Identified Placeholders (Session: 2025-04-13)

1.  **Replace Mock User Service:**
    *   **File:** <ref_file file="/home/ubuntu/repos/NU-DATA-UI/src/auth/controllers/auth.controller.ts" />
    *   **Context:** The `mockUserService` object provides hardcoded user data and simple logging for functions like `findUserByEmail`, `updateUserPassword`, and `storeResetToken`.
    *   **Task:** Replace this mock implementation with integration to a real user database or authentication service.

2.  **Use Theme Colors in Animations:**
    *   **File:** <ref_file file="/home/ubuntu/repos/NU-DATA-UI/src/animations/animations.ts" />
    *   **Context:** The `successState` and `errorState` animation variants use hardcoded hex color values (`#d1fae5`, `#fee2e2`). The comments `// TODO: Use theme colors later if possible` indicate this.
    *   **Task:** Refactor these animation definitions to use color variables or tokens from the design system/theme configuration once available.

## Potential Dependency Issues (Session: 2025-04-13)

*   Missing type definitions (`@types/node`) and dependencies (`crypto`, `jsonwebtoken`, `bcrypt`, `express`, `framer-motion`) were detected. These likely stem from earlier installation issues and need to be resolved for full build/type checking.
