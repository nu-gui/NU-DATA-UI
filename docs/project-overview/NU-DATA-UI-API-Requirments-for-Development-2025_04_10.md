Apr 10, 2025

## NU DATA Apr 10, 2025

Meeting records [Transcript](?tab=t.87uyrpv4g6ka) 

### Summary

The document details NU DATA UI application's features, including login, user dashboard, list management, data enrichment, data groups, connections, and data import/export functionalities, as detailed by Wesley Burgess.  Key discussion points encompassed data handling (import/export methods, connection types, enrichment plan management), UI elements (search functionality, user accessibility features, admin controls), and database schema design.  Next steps involve creating database schema mapping, designing a multi-tenant architecture, providing API instructions, designing the database architecture for data grouping, and planning for pre-processing of various raw data file types.

### Details

* **Login Page:** The login page features a header logo, email address and password fields, a "remember me" checkbox, and a "forgot password" link ([00:00:00](?tab=t.87uyrpv4g6ka#heading=h.mu853bwmnmm)).  Upon selecting "forgot password," the user enters their email address and receives a password reset link via email ([00:01:34](?tab=t.87uyrpv4g6ka#heading=h.ymcmemt6esfl)).

* **User Dashboard:** The dashboard includes a left-side menu, a right-side user toolbar for profile management and other actions, and a central container displaying application functionality ([00:02:54](?tab=t.87uyrpv4g6ka#heading=h.jo0nst9pw9b)).  Widgets show recent activity, data health checks, and campaign success rates ([00:04:48](?tab=t.87uyrpv4g6ka#heading=h.bdnkmp1oh978)).  A table displays recent activities, including API calls and batch file processing details ([00:07:41](?tab=t.87uyrpv4g6ka#heading=h.7ph185ymlr3b)).

* **List Management:** The List Management section has three subpages: "Controlled Data Lists," "Enriched Data Lists," and "Outcomes".  Each subpage offers tables with columns detailing list information, including import method and enrichment status ([00:09:26](?tab=t.87uyrpv4g6ka#heading=h.gju6jhbdz3k2)) ([00:13:53](?tab=t.87uyrpv4g6ka#heading=h.kyj4pr3n0qws)).  Users can edit, delete, and expand rows to view additional data like list metadata and import connections ([00:17:32](?tab=t.87uyrpv4g6ka#heading=h.fuhs0046iukd)) ([00:22:38](?tab=t.87uyrpv4g6ka#heading=h.80y0k68doean)).

* **Data Enrichment:**  The Data Enrichment page focuses on creating and managing enrichment plans. A wizard-like setup guides users through plan creation, including pre-processing, processing, and post-processing tasks ([00:25:48](?tab=t.87uyrpv4g6ka#heading=h.3j0fw5ihtp7w)) ([00:34:12](?tab=t.87uyrpv4g6ka#heading=h.i9jxd2byivpn)).  Users can customize data enrichment with options like duplicate removal and reverse number lookup ([00:27:14](?tab=t.87uyrpv4g6ka#heading=h.edl2keotv0nf)). They can choose to export processed data via API webhook or FTP ([00:34:12](?tab=t.87uyrpv4g6ka#heading=h.i9jxd2byivpn)).

* **Data Groups:** This section presents three subpages: "Data Groups," "D Code Grouping (auto)," and "RPC/WPC (auto)" ([00:39:39](?tab=t.87uyrpv4g6ka#heading=h.hjd4pt1qwkt6)).  "Data Groups" allows users to create custom groups based on various filters and column selections ([00:41:37](?tab=t.87uyrpv4g6ka#heading=h.vtmnt4x60gf9)).  "D Code Grouping (auto)" automatically groups data by country and network operator, providing download options for detailed information ([00:47:36](?tab=t.87uyrpv4g6ka#heading=h.jmgx08cxmhuo)). "RPC/WPC (auto)" displays right and wrong party contact scores resulting from data enrichment, allowing users to split lists and create new lists based on these scores ([00:51:12](?tab=t.87uyrpv4g6ka#heading=h.pg66yl12zofc)).

* **Connections:** The Connections page manages API webhooks and FTP server integrations ([00:56:04](?tab=t.87uyrpv4g6ka#heading=h.en51o6uf5xrc)). Users can create import or export connections, configuring settings for data transfer.  The system supports importing data into controlled data lists or outcome data lists via API webhooks or FTP ([00:57:33](?tab=t.87uyrpv4g6ka#heading=h.523sprz1zcb9)).

* **Data Import and Connection Types:** Wesley Burgess described two data import methods: importing to a control data list (creating a new list or adding to an existing one), and importing via an output data connection (updating outcome data based on control data).  They detailed connection types, including webhooks (specifying URL, method, etc.) ([00:58:58](?tab=t.87uyrpv4g6ka#heading=h.j51duju07bej)) and secure FTP servers (requiring server details, username, password, and import method selection) ([01:00:32](?tab=t.87uyrpv4g6ka#heading=h.34xfk7jptwdr)).  A run test feature simulates API integration success or failure ([00:58:58](?tab=t.87uyrpv4g6ka#heading=h.j51duju07bej)).

* **List Management and Data Enrichment:**  Burgess explained that list management allows importing connections to control lists, updating lists based on external sources, or assigning connections to lists ([01:00:32](?tab=t.87uyrpv4g6ka#heading=h.34xfk7jptwdr)).  Data enrichment, conversely, enables managing enrichment plans and assigning export connection types (webhook or FTP server) to send enriched data back to an external source ([01:02:05](?tab=t.87uyrpv4g6ka#heading=h.yvolve35v4zn)).

* **Data Export Functionality:** The data export page allows users to filter data based on control lists, enriched lists, dates, tags, country codes, network carriers, and enrichment plans ([01:04:13](?tab=t.87uyrpv4g6ka#heading=h.1ilj55drc5l8)). Users select specific data fields to export (e.g., phone numbers, names, addresses) ([01:07:11](?tab=t.87uyrpv4g6ka#heading=h.j6fftgdd0dtf)), and can choose between downloading to their device or exporting to a webhook or secure FTP location via pre-defined connections ([01:08:26](?tab=t.87uyrpv4g6ka#heading=h.45eoon9p28qt)).  The system merges data from individual lists for export, enabling various filtering options ([01:09:34](?tab=t.87uyrpv4g6ka#heading=h.vt4m5r6vqqpv)).

* **User Interface (UI) and User Accessibility:** The UI includes a right-hand toolbar with a profile section (including activity log and subscription/billing information for admins) ([01:11:11](?tab=t.87uyrpv4g6ka#heading=h.y2q9zgdaxgbh)), account settings (managing list settings, privacy, security, and API settings) ([01:13:55](?tab=t.87uyrpv4g6ka#heading=h.78imb5gapypx)), and a notification icon showing enrichment progress and other system events. An expandable action pad provides more detailed information and credit management options ([01:15:23](?tab=t.87uyrpv4g6ka#heading=h.pjkkfzfo0wqu)).

* **He-Man Search Functionality:**  The "He-Man Search" allows users to search across all system data (lists, tags, enrichment plans, etc.), providing categorized results and granular selection options by menu page ([01:18:14](?tab=t.87uyrpv4g6ka#heading=h.mtl3lbvs9h6o)).  For admins, it can also search by phone number to find associated lists, enrichments, and data groups ([01:19:35](?tab=t.87uyrpv4g6ka#heading=h.1pbothd95yx6)).

* **Meeting Goals and Feature Enhancements:** The meeting aimed to create a database schema mapping UI elements, design a multi-tenant structure for user accessibility and admin management, provide API instructions for webhooks and FTP integrations, and design a database architecture to manage data grouping and relational information from multiple data sources ([01:20:50](?tab=t.87uyrpv4g6ka#heading=h.oi0hmhvzltgi)).  Future enhancements include pre-processing of raw data from various file types (text, zip, PDF, etc.) for seamless import and data standardization ([01:22:58](?tab=t.87uyrpv4g6ka#heading=h.94m97oqqxho0)).

### Suggested next steps

*To ensure the successful development and deployment of the NU DATA UI application, the following steps should be prioritized and addressed by the development team:*

***1\. Backend Development & API Implementation:***

* ***Finalize API Specifications:***  
  * *Complete the OpenAPI 3.1.0 schema with all endpoints, request/response bodies, and security definitions.*  
  * *Prioritize the API specifications for the Blacklist/Whitelist feature, ensuring clarity and completeness.*  
  * *Bring all existing APIs into the Swagger Hub environment and integrate them with the main schema.*  
  * *Correct any extraneous API references currently present in the Swagger Hub schema.*  
* ***Develop API Endpoints:***  
  * *Implement all API endpoints as outlined in the finalized OpenAPI schema, covering all application functionalities (login, dashboard, list management, data enrichment, data groups, connections, data import/export, search, etc.).*  
  * *Develop specific API endpoints for data import and export via API webhooks and FTP.*  
  * *Ensure all API endpoints align with the OpenAPI schema and follow RESTful principles.*  
* ***Database Schema Design & Implementation (PostgreSQL):***  
  * *Finalize and document the database schema mapping based on the application's features and the provided breakdown.*  
  * *Implement the multi-tenant architecture in the PostgreSQL database, ensuring proper data isolation and security.*  
  * *Design and implement the database architecture for data grouping and relational information from multiple data sources.*  
  * *Update the database schema to include the \`source\` field (manual, dynamic, or empty) for list entries.*  
  * *Ensure the main and expanded call section tables contain all relevant metrics as required.*  
  * *Modify the list schema to enable a many-to-many relationship with routing plans.*  
  * *Design and implement database schemas for call logs, dynamic rules, and blacklist/whitelist management.*  
* ***Backend Logic & Services (Node.js):***  
  * *Develop Node.js backend services to handle API requests and database interactions.*  
  * *Implement the business logic for all application functionalities, ensuring accuracy and efficiency.*  
  * *Integrate with the Kamailio SIP server for call-related functionalities.*  
  * *Implement robust data validation and sanitization to prevent security vulnerabilities.*  
  * *Optimize backend performance and scalability to handle expected loads.*  
  * *Implement server-side session-based authentication and authorization.*  
* ***Data Handling & Processing:***  
  * *Implement data import/export methods, including API webhooks and FTP, with appropriate error handling and logging.*  
  * *Develop and test various connection types (webhooks and secure FTP servers) with different configurations.*  
  * *Plan and implement pre-processing of raw data from various file types (text, zip, PDF, etc.) for seamless import and data standardization.*  
  * *Develop the logic for data enrichment plan management, ensuring flexibility and configurability.*  
  * *Implement efficient data grouping and filtering mechanisms.*  
  * *Develop and test CSV import functionality for the Blacklist/Whitelist feature, including error handling and data validation.*

***2\. Frontend Development & UI Implementation:***

* ***UI/UX Design Finalization:***  
  * *Finalize all UI/UX designs for the application features, including the login page, user dashboard, list management, data enrichment, data groups, connections, and data import/export functionalities.*  
  * *Ensure UI designs cater to user accessibility and provide a seamless user experience.*  
* ***Frontend Development (React.js):***  
  * *Develop React.js components for all UI elements and functionalities, ensuring reusability and maintainability.*  
  * *Implement robust state management for the application using a suitable library (e.g., Redux, Context API).*  
  * *Integrate with the API endpoints using \`fetch\` or Axios, handling API requests and responses efficiently.*  
  * *Ensure UI responsiveness and cross-browser compatibility across all supported devices and browsers.*  
  * *Implement client-side form validation to provide immediate feedback to users.*  
* ***UI Implementation:***  
  * *Implement the UI design for all application features, adhering to the finalized designs and specifications.*  
  * *Develop UIs for "Controlled Data Lists," "Enriched Data Lists," and "Outcomes" subpages, including interactive tables with list information.*  
  * *Create a user-friendly UI for the Data Enrichment plan creation wizard, including pre-processing, processing, and post-processing task configuration.*  
  * *Develop UIs for the Data Groups subpages: "Data Groups," "D Code Grouping (auto)," and "RPC/WPC (auto)," including data visualization and download options.*  
  * *Implement the UI for the Connections page, enabling users to manage API webhooks and FTP server integrations effectively.*  
  * *Implement the Blacklist/Whitelist feature UI, including CSV import functionality and helpful error messages.*  
  * *Add helper text with a link to a CSV format example to the UI for the Blacklist/Whitelist feature to guide users.*

***3\. Middleware Integration (Node.js):***

* ***Middleware Development:***  
  * *Develop Node.js middleware to handle communication between the React.js frontend and the backend server (Kamailio SIP server).*  
  * *Implement API request handling and response formatting, ensuring consistency and efficiency.*  
  * *Handle authentication and authorization in the middleware, verifying user credentials and permissions.*  
  * *Implement comprehensive error handling and logging in the middleware to track issues and debug effectively.*  
  * *Optimize middleware performance to minimize latency and improve responsiveness.*

***4\. Testing & Quality Assurance:***

* ***Unit Testing:** Write unit tests for all backend services, middleware components, and frontend components to ensure code quality and prevent regressions.*  
* ***Integration Testing:** Perform integration tests to verify the interaction between different components of the application, including the frontend, middleware, backend, and database.*  
* ***API Testing:** Thoroughly test all API endpoints using tools like Postman or Insomnia to ensure they function correctly and return the expected responses.*  
* ***UI Testing:** Test the UI across different browsers and devices to ensure responsiveness and cross-browser compatibility.*  
* ***Security Testing:** Conduct security testing to identify and address potential vulnerabilities in the application.*  
* ***Performance Testing:** Perform load testing and performance testing to ensure the application can handle expected loads and maintain acceptable performance.*

***5\. Deployment & Infrastructure:***

* ***Deployment Planning:** Develop a deployment plan outlining the steps for deploying the application to the production environment.*  
* ***Infrastructure Setup:** Set up the necessary infrastructure, including servers, databases, and network configurations.*  
* ***Deployment Automation:** Implement deployment automation using tools like Jenkins or GitLab CI/CD to streamline the deployment process.*  
* ***Monitoring & Logging:** Set up monitoring and logging for the application to track performance and identify issues in production.*

***6\. Documentation:***

* ***API Documentation:** Maintain and update the OpenAPI schema and API documentation as development progresses.*  
* ***Technical Documentation:** Create technical documentation for the application, including architecture diagrams, database schema details, and code documentation.*  
* ***User Documentation:** Develop user documentation to guide users on how to use the application effectively.*

*By following these suggested next steps, the development team can ensure the successful creation and deployment of the NU DATA UI application, meeting all the specified requirements and providing a high-quality user experience.*

Based on the meeting notes, here are task lists for your full-stack and backend developers:

**Full-Stack Developer Task List:**

* **UI Implementation:**  
  * Implement the UI design for the application features, including login, user dashboard, list management, data enrichment, data groups, connections, and data import/export functionalities.  
  * Develop UI for "Controlled Data Lists," "Enriched Data Lists," and "Outcomes" subpages, including tables with list information.  
  * Create UI for Data Enrichment plan creation wizard, including pre-processing, processing, and post-processing tasks.  
  * Develop UI for Data Groups subpages: "Data Groups," "D Code Grouping (auto)," and "RPC/WPC (auto)".  
  * Implement UI for Connections page, managing API webhooks and FTP server integrations.  
  * Implement Blacklist/Whitelist feature UI, including CSV import functionality.  
  * Add helper text with a link to a CSV format example to the UI for the Blacklist/Whitelist feature.  
* **Frontend Development (React.js):**  
  * Develop React.js components for all UI elements and functionalities.  
  * Implement state management for the application.  
  * Integrate with the API endpoints using fetch or Axios.  
  * Ensure UI responsiveness and cross-browser compatibility.  
  * Implement client-side form validation.  
* **Middleware Integration (Node.js):**  
  * Develop Node.js middleware to handle communication between the React.js frontend and the backend server (Kamailio SIP server).  
  * Implement API request handling and response formatting.  
  * Handle authentication and authorization in the middleware.  
  * Implement error handling and logging in the middleware.  
  * Optimize middleware performance.

**Backend Developer Task List:**

* **API Development:**  
  * Develop API endpoints for all application functionalities, including login, user dashboard data, list management, data enrichment, data groups, and connections.  
  * Develop API specification for the Blacklist/Whitelist feature.  
  * Ensure API endpoints align with the OpenAPI Schema.  
  * Implement API endpoints for data import and export via API webhooks and FTP.  
* **Database Schema Design and Implementation (PostgreSQL):**  
  * Create database schema mapping based on the application's features.  
  * Design and implement a multi-tenant architecture in the database.  
  * Design the database architecture for data grouping.  
  * Update the database schema to include a source field (manual, dynamic, or empty for non-list) for list entries.  
  * Ensure the main and expanded call section tables contain relevant metrics.  
  * Modify the list schema to enable a many-to-many relationship with routing plans.  
  * Design database schemas for call logs, dynamic rules, and blacklist/whitelist management.  
* **Backend Development (Node.js):**  
  * Develop Node.js backend services to handle API requests and database interactions.  
  * Implement business logic for all application functionalities.  
  * Integrate with the Kamailio SIP server.  
  * Implement data validation and sanitization.  
  * Optimize backend performance and scalability.  
  * Implement server-side session-based authentication.  
* **OpenAPI Schema:**  
  * Generate an OpenAPI schema for the application.  
  * Ensure the API implementation aligns with the OpenAPI schema.  
  * Correct extraneous API references in the Swagger Hub schema.  
  * Bring the APIs into the Swagger Hub environment and add them to the schema.  
* **Data Handling:**  
  * Implement data import/export methods, including API webhooks and FTP.  
  * Develop connection types for data transfer, including webhooks and secure FTP servers.  
  * Plan for pre-processing of various raw data file types.  
  * Implement data enrichment plan management.  
  * Handle data grouping and filtering.  
  * Implement CSV import functionality for the Blacklist/Whitelist feature.

Based on the meeting notes, here's a breakdown of potential database schema components for each main menu page, subpage, and expandable table with subtabs:

---

## **📄 Database Schema Components**

---

Here is the updated Database Schema components list, with the \`tenant\_id\` (Foreign Key) added to most tables to support multi-tenancy, as requested:

Absolutely, Wesley. Here's the **updated and aligned PostgreSQL-compatible database schema** for `nu-data`, matching your finalized **OpenAPI 3.1.0 schema**. This version includes:

* ✅ Multi-tenancy via `tenant_id`

* 🧱 Proper normalization and foreign key constraints

* ⚡ Indexing recommendations

* 🧩 JSON support where structure varies

* 📘 Preserved Google Docs-style **headings and bullets**

  ---

  ## **📄 Updated Database Schema (with Multi-Tenant Support)**

  ---

  ### **1\. Login Page:**

**Users Table:**

* `user_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL REFERENCES tenants(tenant\_id)

* `email` VARCHAR(255) UNIQUE NOT NULL

* `password_hash` TEXT NOT NULL

* `remember_me_token` TEXT

* `password_reset_token` TEXT

* `password_reset_expiry` TIMESTAMP

  ---

  ### **2\. User Dashboard:**

**Activity Log Table:**

* `activity_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `user_id` INTEGER REFERENCES users(user\_id)

* `timestamp` TIMESTAMP NOT NULL

* `action_type` VARCHAR(100)

* `details` JSONB

**Data Health Checks Table:**

* `check_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `timestamp` TIMESTAMP NOT NULL

* `check_type` VARCHAR(100)

* `status` VARCHAR(20)

* `details` JSONB

**Campaign Success Rates Table:**

* `campaign_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `start_date` DATE

* `end_date` DATE

* `success_rate` FLOAT

* `metrics` JSONB

  ---

  ### **3\. List Management:**

**Lists Table:**

* `list_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `list_name` VARCHAR(255)

* `list_type` VARCHAR(50)

* `import_method` VARCHAR(100)

* `enrichment_status` VARCHAR(100)

* `metadata` JSONB

* `source` VARCHAR(100)

**List Entries Table:**

* `entry_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `list_id` INTEGER REFERENCES lists(list\_id)

* `data` JSONB

**List Metadata Table:**

* `metadata_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `list_id` INTEGER REFERENCES lists(list\_id)

* `key` VARCHAR(100)

* `value` TEXT

  ---

  ### **4\. Data Enrichment:**

**Enrichment Plans Table:**

* `plan_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `plan_name` VARCHAR(255)

* `pre_processing_tasks` JSONB

* `processing_tasks` JSONB

* `post_processing_tasks` JSONB

* `export_connection_id` INTEGER REFERENCES connections(connection\_id)

**Enrichment Tasks Table:**

* `task_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `plan_id` INTEGER REFERENCES enrichment\_plans(plan\_id)

* `task_type` VARCHAR(100)

* `configuration` JSONB

**Enriched Data Table:**

* `enriched_data_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `entry_id` INTEGER REFERENCES list\_entries(entry\_id)

* `plan_id` INTEGER REFERENCES enrichment\_plans(plan\_id)

* `enriched_data` JSONB

  ---

  ### **5\. Data Groups:**

**Data Groups Table:**

* `group_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `group_name` VARCHAR(255)

* `filter_criteria` JSONB

* `column_selections` JSONB

**Group Members Table:**

* `group_member_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `group_id` INTEGER REFERENCES data\_groups(group\_id)

* `entry_id` INTEGER REFERENCES list\_entries(entry\_id)

**Auto-Generated Groups Table:**

* `auto_group_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `group_type` VARCHAR(50)

* `grouping_criteria` TEXT

* `details` JSONB

  ---

  ### **6\. Connections:**

**Connections Table:**

* `connection_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `connection_name` VARCHAR(255)

* `connection_type` VARCHAR(50)

* `direction` VARCHAR(20)

* `configuration` JSONB

**Webhook Connections Table:**

* `webhook_id` SERIAL PRIMARY KEY

* `connection_id` INTEGER REFERENCES connections(connection\_id)

* `url` TEXT

* `method` VARCHAR(10)

* `headers` JSONB

**FTP Connections Table:**

* `ftp_id` SERIAL PRIMARY KEY

* `connection_id` INTEGER REFERENCES connections(connection\_id)

* `server_address` TEXT

* `username` VARCHAR(100)

* `password` TEXT

* `import_method` VARCHAR(50)

  ---

  ### **7\. Data Export:**

**Export Jobs Table:**

* `job_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `user_id` INTEGER REFERENCES users(user\_id)

* `filter_criteria` JSONB

* `selected_fields` JSONB

* `export_method` VARCHAR(50)

* `connection_id` INTEGER

* `timestamp` TIMESTAMP

**Exported Data Table:**

* `exported_data_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `job_id` INTEGER REFERENCES export\_jobs(job\_id)

* `data` JSONB

  ---

  ### **8\. User Interface (UI) and User Accessibility:**

**User Profiles Table:**

* `profile_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `user_id` INTEGER REFERENCES users(user\_id)

* `activity_log_settings` JSONB

* `subscription_billing_info` JSONB

**Account Settings Table:**

* `setting_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `user_id` INTEGER REFERENCES users(user\_id)

* `list_settings` JSONB

* `privacy_settings` JSONB

* `security_settings` JSONB

* `api_settings` JSONB

**Notifications Table:**

* `notification_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `user_id` INTEGER REFERENCES users(user\_id)

* `timestamp` TIMESTAMP

* `message` TEXT

* `status` VARCHAR(20)

**Action Pad Table:**

* `action_pad_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `user_id` INTEGER REFERENCES users(user\_id)

* `details` JSONB

* `credit_management` JSONB

  ---

  ### **9\. He-Man Search:**

* *No dedicated table; relies on full-text or indexed cross-table queries.*

  ---

  ### **10\. Blacklist/Whitelist:**

**Blacklist Table:**

* `blacklist_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `value` TEXT

* `type` VARCHAR(50)

* `reason` TEXT

**Whitelist Table:**

* `whitelist_id` SERIAL PRIMARY KEY

* `tenant_id` INTEGER NOT NULL

* `value` TEXT

* `type` VARCHAR(50)

* `reason` TEXT

  ---

  ### **Additional Notes:**

* ✅ Use `JSONB` for dynamic fields like config, metadata, tasks

* 🔐 Secure fields (e.g., passwords) with encryption or hashing

* ⚙ Index fields: `email`, `user_id`, `tenant_id`, `list_id`, `entry_id`

* 🔄 Cascade or restrict deletions via `ON DELETE` logic where applicable

  ---

  ---

  ## **📄 API Schema Conceptialised Outline**

  ---

This is a conceptual outline. The actual implementation may vary based on specific requirements and technology choices.

Based on the meeting notes, the application includes the following main features:

* Login  
* User Dashboard  
* List Management  
* Data Enrichment  
* Data Groups  
* Connections  
* Data Import/Export  
* Blacklist/Whitelist  
* "He-Man Search"

Considering these features, here's a more comprehensive list of potential API paths, expanding upon the initial list:

Absolutely, Wesley. Here's the updated version of your **API Endpoint Inventory** — now fully aligned with your finalized **OpenAPI 3.1.0 schema** and database structure.

It includes:

* ✅ Explicit versioning via `/v1/...`

* ✅ Consistency in HTTP methods

* ✅ Modular additions like tenant-aware structures and inferred future endpoints

* ✅ Organized sections with precise mappings to your app's modules

  ---

  ## **🔁 Updated API Endpoint Inventory (Aligned with OpenAPI Schema)**

  ---

  ### **🔐 Authentication:**

* `/v1/auth/login` (POST) — Authenticate user

* `/v1/auth/logout` (POST) — Log out user

* `/v1/auth/password/reset` (POST) — Request password reset (by email)

* `/v1/auth/password/reset/{token}` (POST) — Reset password using token

  ---

  ### **📊 User Dashboard:**

* `/v1/dashboard` (GET) — Get user dashboard overview

* `/v1/dashboard/activities` (GET) — Get recent activity log

* `/v1/dashboard/healthchecks` (GET) — Get data health check results

* `/v1/dashboard/campaigns` (GET) — Get campaign success rates

  ---

  ### **🗂 List Management:**

* `/v1/lists` (GET) — Get all lists

* `/v1/lists` (POST) — Create a new list

* `/v1/lists/{listId}` (GET) — Get a list by ID

* `/v1/lists/{listId}` (PUT) — Update a list

* `/v1/lists/{listId}` (DELETE) — Delete a list

* `/v1/lists/{listId}/entries` (GET) — Get entries for a list

* `/v1/lists/{listId}/entries` (POST) — Add entries to a list

* `/v1/lists/{listId}/entries/{entryId}` (GET) — Get a specific list entry

* `/v1/lists/{listId}/entries/{entryId}` (PUT) — Update a list entry

* `/v1/lists/{listId}/entries/{entryId}` (DELETE) — Delete a list entry

* `/v1/lists/{listId}/metadata` (GET) — Get metadata for a list

* `/v1/lists/{listId}/metadata` (POST) — Add metadata to a list

  ---

  ### **🧠 Data Enrichment:**

* `/v1/enrichment-plans` (GET) — Get all enrichment plans

* `/v1/enrichment-plans` (POST) — Create a new enrichment plan

* `/v1/enrichment-plans/{planId}` (GET) — Get an enrichment plan by ID

* `/v1/enrichment-plans/{planId}` (PUT) — Update an enrichment plan

* `/v1/enrichment-plans/{planId}` (DELETE) — Delete an enrichment plan

* `/v1/enrichment-plans/{planId}/tasks` (GET) — Get tasks for an enrichment plan

* `/v1/enrichment-plans/{planId}/tasks` (POST) — Add tasks to an enrichment plan

* `/v1/enriched-data` (GET) — Retrieve enriched data across plans

  ---

  ### **📚 Data Groups:**

* `/v1/data-groups` (GET) — Get all data groups

* `/v1/data-groups` (POST) — Create a new data group

* `/v1/data-groups/{groupId}` (GET) — Get a data group by ID

* `/v1/data-groups/{groupId}` (PUT) — Update a data group

* `/v1/data-groups/{groupId}` (DELETE) — Delete a data group

* `/v1/data-groups/{groupId}/members` (GET) — Get members of a data group

* `/v1/auto-groups` (GET) — Get auto-generated groups (e.g., RPC/WPC, D Code)

  ---

  ### **🔌 Connections:**

* `/v1/connections` (GET) — Get all connections

* `/v1/connections` (POST) — Create a new connection

* `/v1/connections/{connectionId}` (GET) — Get a connection by ID

* `/v1/connections/{connectionId}` (PUT) — Update a connection

* `/v1/connections/{connectionId}` (DELETE) — Delete a connection

* `/v1/connections/{connectionId}/test` (POST) — Test connection validity

  ---

  ### **⬆️⬇️ Data Import/Export:**

* `/v1/import` (POST) — Upload/import data

* `/v1/export` (POST) — Create a new export job

* `/v1/export/{jobId}` (GET) — Get export job status

* `/v1/export/{jobId}/data` (GET) — Download exported data

  ---

  ### **🚫 Blacklist / ✅ Whitelist:**

* `/v1/blacklist` (GET) — Get all blacklist entries

* `/v1/blacklist` (POST) — Add an item to blacklist

* `/v1/blacklist/{itemId}` (DELETE) — Remove a blacklist entry

* `/v1/whitelist` (GET) — Get all whitelist entries

* `/v1/whitelist` (POST) — Add an item to whitelist

* `/v1/whitelist/{itemId}` (DELETE) — Remove a whitelist entry

  ---

  ### **🔍 He-Man Search:**

* `/v1/search` (GET) — Full-system federated search (multi-table query)

  * Supports `query`, `filters`, `tenantId`, `limit`, `offset`, etc.

  ---

  ## **📌 Important Notes**

* All routes are versioned under `/v1/` for future-proofing

* All endpoints assume secured access via **JWT Bearer Auth**

* All resources are scoped by **`tenantId`**, either explicitly or by auth context

* Admin-only and user-settings endpoints are scoped for future releases (e.g., profiles, notifications)

  ---

Would you like this:

* Exported as Markdown or Google Doc format?

* Integrated directly into your OpenAPI YAML as `summary` \+ `description` fields for Swagger UI?

* Or turned into a clickable Postman collection?

Let me know your preferred next output\!

I highly recommend reviewing the meeting notes in detail to refine this list further and ensure it accurately reflects your application's API requirements.

---

## **🔁 OpenAPI Schema Draft**

---

Comprehensive OpenAPI 3.1.0 schema based on the expanded list of API paths derived from your meeting notes, incorporating Swagger support, common server types, and best practices for Hano, Rust, Node.js, and React.js.

```
openapi: 3.1.0
info:
  title: nu-data API
  version: 1.0.0
  description: Multi-tenant API for data list management, enrichment, dashboard analytics, and connection control.
  contact:
    name: Wesley Burgess
    email: wes@zyongate.com
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
servers:
  - url: https://api.zyongate.com/v1
    description: Production server
  - url: https://staging.zyongate.com/v1
    description: Staging server
  - url: http://localhost:3000
    description: Local development (Node.js/React)
  - url: http://127.0.0.1:8080
    description: Local Rust/Hano development

tags:
  - name: Authentication
  - name: Dashboard
  - name: Lists
  - name: Enrichment
  - name: Data Groups
  - name: Connections
  - name: Import/Export
  - name: Access Control
  - name: Search

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    Tenant:
      type: object
      required: [tenantId, tenantName]
      properties:
        tenantId:
          type: integer
        tenantName:
          type: string

    User:
      type: object
      required: [userId, email, tenantId]
      properties:
        userId:
          type: integer
        email:
          type: string
          format: email
        tenantId:
          type: integer

    LoginRequest:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          format: password

    LoginResponse:
      type: object
      required: [token]
      properties:
        token:
          type: string

    Error:
      type: object
      required: [code, message]
      properties:
        code:
          type: integer
        message:
          type: string

    List:
      type: object
      required: [listId, listName, listType, tenantId]
      properties:
        listId:
          type: integer
        listName:
          type: string
        listType:
          type: string
          enum: [Controlled, Enriched, Outcome]
        importMethod:
          type: string
        enrichmentStatus:
          type: string
        metadata:
          type: object
        source:
          type: string
        tenantId:
          type: integer

    ListEntry:
      type: object
      required: [entryId, listId, data, tenantId]
      properties:
        entryId:
          type: integer
        listId:
          type: integer
        data:
          type: object
        tenantId:
          type: integer

    EnrichmentPlan:
      type: object
      required: [planId, planName, tenantId]
      properties:
        planId:
          type: integer
        planName:
          type: string
        preProcessingTasks:
          type: array
          items:
            type: string
        processingTasks:
          type: array
          items:
            type: string
        postProcessingTasks:
          type: array
          items:
            type: string
        exportConnectionId:
          type: integer
        tenantId:
          type: integer

    DataGroup:
      type: object
      required: [groupId, groupName, tenantId]
      properties:
        groupId:
          type: integer
        groupName:
          type: string
        filterCriteria:
          type: object
        columnSelections:
          type: array
          items:
            type: string
        tenantId:
          type: integer

    Connection:
      type: object
      required: [connectionId, connectionName, connectionType, direction, tenantId]
      properties:
        connectionId:
          type: integer
        connectionName:
          type: string
        connectionType:
          type: string
          enum: [API Webhook, FTP]
        direction:
          type: string
          enum: [Import, Export]
        configuration:
          type: object
        tenantId:
          type: integer

    ExportJob:
      type: object
      required: [jobId, exportMethod, tenantId]
      properties:
        jobId:
          type: integer
        filterCriteria:
          type: object
        selectedFields:
          type: array
          items:
            type: string
        exportMethod:
          type: string
          enum: [Download, Webhook, FTP]
        connectionId:
          type: integer
        tenantId:
          type: integer

    BlacklistItem:
      type: object
      required: [blacklistId, value, type, tenantId]
      properties:
        blacklistId:
          type: integer
        value:
          type: string
        type:
          type: string
        reason:
          type: string
        tenantId:
          type: integer

    WhitelistItem:
      type: object
      required: [whitelistId, value, type, tenantId]
      properties:
        whitelistId:
          type: integer
        value:
          type: string
        type:
          type: string
        reason:
          type: string
        tenantId:
          type: integer

    DashboardSummary:
      type: object
      properties:
        totalLists:
          type: integer
        activeCampaigns:
          type: integer
        recentActivity:
          type: array
          items:
            $ref: '#/components/schemas/ActivityLogEntry'

    ActivityLogEntry:
      type: object
      required: [activityId, userId, timestamp, actionType]
      properties:
        activityId:
          type: integer
        userId:
          type: integer
        timestamp:
          type: string
          format: date-time
        actionType:
          type: string
        details:
          type: object
        tenantId:
          type: integer

    HealthCheckResult:
      type: object
      required: [checkId, timestamp, checkType, status]
      properties:
        checkId:
          type: integer
        timestamp:
          type: string
          format: date-time
        checkType:
          type: string
        status:
          type: string
          enum: [Pass, Fail, Warning]
        details:
          type: object
        tenantId:
          type: integer

paths:
  /auth/login:
    post:
      tags: [Authentication]
      summary: Authenticate user and return a JWT
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Successful login
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LoginResponse'
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/logout:
    post:
      tags: [Authentication]
      summary: Logout current user session
      security:
        - bearerAuth: []
      responses:
        '204':
          description: Logout successful

  /auth/password/reset:
    post:
      tags: [Authentication]
      summary: Request password reset link
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
              required: [email]
      responses:
        '200':
          description: Reset link sent

  /auth/password/reset/{token}:
    post:
      tags: [Authentication]
      summary: Reset password using reset token
      parameters:
        - in: path
          name: token
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                newPassword:
                  type: string
              required: [newPassword]
      responses:
        '200':
          description: Password reset successful

  /dashboard:
    get:
      tags: [Dashboard]
      summary: Get user dashboard data summary
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Dashboard data returned
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DashboardSummary'

  /dashboard/activities:
    get:
      tags: [Dashboard]
      summary: Get recent user activities
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Activity log returned
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ActivityLogEntry'

  /dashboard/healthchecks:
    get:
      tags: [Dashboard]
      summary: Get system health check results
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Health checks returned
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/HealthCheckResult'

  /dashboard/campaigns:
    get:
      tags: [Dashboard]
      summary: Get campaign performance metrics
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Campaign metrics returned
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/CampaignSuccessRate'

  /lists:
    get:
      tags: [Lists]
      summary: Get all lists for current tenant
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Lists retrieved
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/List'

    post:
      tags: [Lists]
      summary: Create a new list
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/List'
      responses:
        '201':
          description: List created

  /lists/{listId}:
    get:
      tags: [Lists]
      summary: Get a list by ID
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: List returned
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/List'

    put:
      tags: [Lists]
      summary: Update a list
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/List'
      responses:
        '200':
          description: List updated

    delete:
      tags: [Lists]
      summary: Delete a list
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: List deleted

  /lists/{listId}/entries:
    get:
      tags: [Lists]
      summary: Get entries for a list
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: List entries returned
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ListEntry'

    post:
      tags: [Lists]
      summary: Add entries to a list
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/ListEntry'
      responses:
        '201':
          description: Entries added

  /lists/{listId}/entries/{entryId}:
    get:
      tags: [Lists]
      summary: Get a specific entry
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
        - name: entryId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Entry returned
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ListEntry'

    put:
      tags: [Lists]
      summary: Update an entry
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
        - name: entryId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ListEntry'
      responses:
        '200':
          description: Entry updated

    delete:
      tags: [Lists]
      summary: Delete an entry
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
        - name: entryId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Entry deleted

  /lists/{listId}/metadata:
    get:
      tags: [Lists]
      summary: Retrieve list metadata
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Metadata returned
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ListMetadata'

    post:
      tags: [Lists]
      summary: Add metadata to list
      security:
        - bearerAuth: []
      parameters:
        - name: listId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ListMetadata'
      responses:
        '201':
          description: Metadata added

  /enrichment-plans:
    get:
      tags: [Enrichment]
      summary: Get all enrichment plans
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Enrichment plans retrieved
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/EnrichmentPlan'

    post:
      tags: [Enrichment]
      summary: Create new enrichment plan
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EnrichmentPlan'
      responses:
        '201':
          description: Plan created

  /enrichment-plans/{planId}:
    get:
      tags: [Enrichment]
      summary: Get an enrichment plan by ID
      security:
        - bearerAuth: []
      parameters:
        - name: planId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Plan retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/EnrichmentPlan'

    put:
      tags: [Enrichment]
      summary: Update an enrichment plan
      security:
        - bearerAuth: []
      parameters:
        - name: planId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EnrichmentPlan'
      responses:
        '200':
          description: Plan updated

    delete:
      tags: [Enrichment]
      summary: Delete an enrichment plan
      security:
        - bearerAuth: []
      parameters:
        - name: planId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Plan deleted

  /enrichment-plans/{planId}/tasks:
    get:
      tags: [Enrichment]
      summary: Get tasks for enrichment plan
      security:
        - bearerAuth: []
      parameters:
        - name: planId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Tasks retrieved
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string

    post:
      tags: [Enrichment]
      summary: Add tasks to enrichment plan
      security:
        - bearerAuth: []
      parameters:
        - name: planId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: array
              items:
                type: string
      responses:
        '201':
          description: Tasks added

  /enriched-data:
    get:
      tags: [Enrichment]
      summary: Get enriched data
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Enriched data returned
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object

  /data-groups:
    get:
      tags: [Data Groups]
      summary: Get all data groups
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Data groups retrieved
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/DataGroup'

    post:
      tags: [Data Groups]
      summary: Create a new data group
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DataGroup'
      responses:
        '201':
          description: Data group created

  /data-groups/{groupId}:
    get:
      tags: [Data Groups]
      summary: Get a data group by ID
      security:
        - bearerAuth: []
      parameters:
        - name: groupId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Group retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DataGroup'

    put:
      tags: [Data Groups]
      summary: Update a data group
      security:
        - bearerAuth: []
      parameters:
        - name: groupId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DataGroup'
      responses:
        '200':
          description: Group updated

    delete:
      tags: [Data Groups]
      summary: Delete a data group
      security:
        - bearerAuth: []
      parameters:
        - name: groupId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Group deleted

  /data-groups/{groupId}/members:
    get:
      tags: [Data Groups]
      summary: Get members of a data group
      security:
        - bearerAuth: []
      parameters:
        - name: groupId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Group members returned
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object

  /auto-groups:
    get:
      tags: [Data Groups]
      summary: Get all auto-generated data groups
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Auto-groups returned
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object

  /connections:
    get:
      tags: [Connections]
      summary: Get all connections
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Connections retrieved
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Connection'

    post:
      tags: [Connections]
      summary: Create a new connection
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Connection'
      responses:
        '201':
          description: Connection created

  /connections/{connectionId}:
    get:
      tags: [Connections]
      summary: Get a connection by ID
      security:
        - bearerAuth: []
      parameters:
        - name: connectionId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Connection details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Connection'

    put:
      tags: [Connections]
      summary: Update a connection
      security:
        - bearerAuth: []
      parameters:
        - name: connectionId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Connection'
      responses:
        '200':
          description: Connection updated

    delete:
      tags: [Connections]
      summary: Delete a connection
      security:
        - bearerAuth: []
      parameters:
        - name: connectionId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Connection deleted

  /connections/{connectionId}/test:
    post:
      tags: [Connections]
      summary: Test a connection
      security:
        - bearerAuth: []
      parameters:
        - name: connectionId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Connection tested successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "success"

  /import:
    post:
      tags: [Import/Export]
      summary: Import data into system
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  type: string
                  format: binary
      responses:
        '202':
          description: Import initiated

  /export:
    post:
      tags: [Import/Export]
      summary: Initiate export job
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ExportJob'
      responses:
        '201':
          description: Export job created

  /export/{jobId}:
    get:
      tags: [Import/Export]
      summary: Check export job status
      security:
        - bearerAuth: []
      parameters:
        - name: jobId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Export job status
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ExportJob'

  /export/{jobId}/data:
    get:
      tags: [Import/Export]
      summary: Download exported data
      security:
        - bearerAuth: []
      parameters:
        - name: jobId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Exported data file
          content:
            application/octet-stream:
              schema:
                type: string
                format: binary

  /blacklist:
    get:
      tags: [Access Control]
      summary: Get all blacklist entries
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Blacklist retrieved
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/BlacklistItem'

    post:
      tags: [Access Control]
      summary: Add an item to blacklist
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BlacklistItem'
      responses:
        '201':
          description: Blacklist item added

  /blacklist/{itemId}:
    delete:
      tags: [Access Control]
      summary: Remove item from blacklist
      security:
        - bearerAuth: []
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Item deleted

  /whitelist:
    get:
      tags: [Access Control]
      summary: Get all whitelist entries
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Whitelist retrieved
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/WhitelistItem'

    post:
      tags: [Access Control]
      summary: Add an item to whitelist
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/WhitelistItem'
      responses:
        '201':
          description: Whitelist item added

  /whitelist/{itemId}:
    delete:
      tags: [Access Control]
      summary: Remove item from whitelist
      security:
        - bearerAuth: []
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Item deleted

  /search:
    get:
      tags: [Search]
      summary: Global search across lists, groups, and enriched data
      security:
        - bearerAuth: []
      parameters:
        - name: query
          in: query
          required: true
          schema:
            type: string
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            default: 25
        - name: offset
          in: query
          required: false
          schema:
            type: integer
            default: 0
      responses:
        '200':
          description: Search results returned
          content:
            application/json:
              schema:
                type: object
                properties:
                  results:
                    type: array
                    items:
                      type: object
                  total:
                    type: integer

```

