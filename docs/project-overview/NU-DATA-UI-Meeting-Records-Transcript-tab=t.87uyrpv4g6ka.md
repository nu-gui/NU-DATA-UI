Apr 10, 2025

## Meeting Apr 10, 2025 at 11:06 SAST \- Transcript

### 00:00:00

   
**Wesley Burgess:** All right. So today we're going over the new data portal and purpose of this meeting is to discuss the this is to discuss the UI and the design layout that's currently being developed. And within this meeting, we're going to detail each function and each page, what is seen on the UI as I navigate through the UI itself, mentioning the pages, the subpages, expandable tables or columns that might be visual on the page. Purpose of this also is to map the UI database schema for APIs. Um we'll be utilizing open API and swagger uh for creating our API for our backend front end integration. And uh just take note of the words that I use in describe uh for each of the visual columns and the names mentioned on the UI. All right, so let's get started. And arriving on the login page. login page has a header logo, new data and new DATA. It is says welcome back please sign in below and the first box is an box for an email address to be entered.  
   
 

### 00:01:34

   
**Wesley Burgess:** Below that uh there is some text between the password blocks and the email block says the word password with helper text with an icon that the user can click on which allows them to get helpful information about logging in. Below that is the password box where the user can enter their password is by default hidden. There is an icon in the password box that allows you to show your password. Below gives some helper text saying password must be at least eight characters as default text. Below that is a check box that says remember me obviously allowing for remember me cache type uh storage on the user's browser. Then below is a sign in block if the user chooses to enter to sign in. And next to the remember me text block, there is an word forgot password with a question mark which takes you to a link which allows you to then go through a forget password process. The login box changes and allows you the user to now enter their password or email address. Sorry, enter their email address in the forgot password section.  
   
 

### 00:02:54

   
**Wesley Burgess:** There there is an email box to allow them to enter and then there's a send blink button below to continue. Once the user has continued moves to the next flow which says forgot password please check your inbox for password reset link. It verifies the email address in the email box showing the user where the email notification has been sent to. And then a timer below starts showing. Did not get the link? Please send it again. And then that timer block disappears and the button appears for the user to resend the email link again if it is not received in the emails user box. Once the user is logged in, you'll arrive at the user dashboard. Now the design layout of this UI has a left side menu as well as a right side toolbox which is replaced by a traditional top header container which has functionality. What we've done with this particular design is you have your menu page or menu um on the left side of the page and on the right you've got a expandable user control toolbar which allows the user to do things like manage their profile, their settings, log out, view notifications, view subscription details for the application and it has uh various different actions like request credit if the user runs out of credit while utilizing the new data  
   
 

### 00:04:48

   
**Wesley Burgess:** system. So let's go over the components of dashboard and what is visually here. I've summarized the structure of the UI design. So let's go over the dashboard. So within the center of the page with the menu to the left and the user toolbar to the right, most of the page is covered by the center column center page which is a container which contains all functionality on the UI. In the container there are there's a button to the top right hand corner called import list which is a quick action allowing the user to import their contact data. The new data system is a data enrichment and storage and management uh application for contact data utilized usually within marketing campaigns and communication campaigns. The system new data is designed to show you the health check of your data in the system allowing users to import data directly into their system to allow them to start manage their leads and their contact data more efficiently by creating all various different types of rules around campaigns, communication outcomes and general feedback based on communication with the contact itself.  
   
 

### 00:06:18

   
**Wesley Burgess:** push back either via via CRM or automated dialing or campaigning systems. So in the dashboard we have a health check which is a widget shows you top recent outcomes and it will give you a list that has been worked on within the system. It would mention the last campaign was run and what the campaign success was. It would show the communication outcome and the percentage of the communication outcome usually identified as contactability. And then there's a summary on the positive or negative response from that campaign which is based on metrics data elected from the campaign itself. Then there's a widget to the right hand side of that which is a data health check. It then mentions top recent outcomes and it will have a list by name. It will have campaign outcome and it would have list by name on the outcomes. It would have communication outcomes. It will have the lists by name and their uh communication outcomes. And then it'll have general feedback which is again listing the list by name and then each of their uh outcomes whether they're positive or negative based on that percentage score.  
   
 

### 00:07:41

   
**Wesley Burgess:** Then below that we got a larger table which covers the width of the container in the middle of the page. This is called recent activities. In recent activities you have a table with two subtabs. The first subtab is APIs calls processed. And in the APIs processed, you have a table with date, submit, success, fail, and pending. In this you have the date of when the list was submitted, how many records were submitted for data enrichments, how many were successful based on the submission, how many have failed or if the list is still ongoing, it would say pending and show pending status of how many are still outstanding to be processed. In the next S uh tab within the main table is called batch files processed. In batch files processed we have a table with date, list name, category, submitted, success, failed and pending. Here again you'll have metrics data of data files being processed currently in in being enriched by the new data system and in that it'll show the dates of the list of when it was processed the list name the category submitted whether and the metrics data submitted success failed and pending for each of the files currently in batch file processing.  
   
 

### 00:09:26

   
**Wesley Burgess:** So this gives the user a overview of what is in submission and has not yet been completed while they are doing their various different data enrichment um processes design and given to them by this application. Okay. So from here then the user can get into more of the the application's functionality. So the first main page is called list management. So the user would navigate to the left uh menu bar, click on the icon in the word list management. Once they click on list management, list management will take them to a page which has three subpages navigated by a tool a top table column with three tabs. So the UI comes to what they call to lists and lists are categorized by three sub pages called control data lists, enrich data list and outcomes. In this new page under list management, when the user is selected on the first tab of the subpage called controlled data list, the user will be presented with a table below it with the following column headers list, description, tags, enriched status, import method.  
   
 

### 00:11:01

   
**Wesley Burgess:** Within this table, the user will see all of their lists that they have imported into the system. List referring to as their contact records. The list would have the list name, the description, and while the user goes through an import process, they have the ability to add tags to the list. and tags are then managed to a external uh function on the UI around managing tags assigned to specific list. This is particularly useful for campaigning in that same table. Um under contact data list continue with the column headers. The next one is after tags is enriched status. That shows the user what files they have imported that have either not yet been enriched or currently in Q being processed and maybe completed. And with this it gives the user the knowledge to understand have they enriched their data process or their files already or their list. The last column is called import method. Here it informs the user how they are ingesting data into this list. So our system allows the user to add data to lists via different methods of importing the data into the list.  
   
 

### 00:12:36

   
**Wesley Burgess:** A method could be secure FTP where a user drops a file in a secure FTP inbox. Our system has an API that fetches the data and then it inserts the data into the list based on various column mapping rules. If the user chooses to manually import a list, they would click the list import button at the top right hand side of the page and the user will go through a wizard like setup allowing them to import data and map it to the list column formatting. The other option is the user can have an web hook where they are running live campaigns and as a lead or contact is created or updated or anything along those lines API is pushed with a web hook to our system and it updates or inserts that record directly into the list. This functionality not only gives the user the ability to import data but make the data dynamically updatable. Past systems would allow you to import and then that import list will remain the same unless you export it and reimpport replacement data.  
   
 

### 00:13:53

   
**Wesley Burgess:** Our system does allow that. So users do have the ability to quickly export their data and once exported they can manually modify their data and reimpport the data if they wish to with the changes. Okay. Into the second subpage under list management named enrich data list. So when you move to enrich data list looks very similar to the other column in control data list but now enrich data list subpage. The column headers in this table are called list descriptions tags enriched rate and import method. So in this one we are using similar metrics data as before list name description tags and import method but this time we are detailing the enrichment rate which determines the success of a record being updated and modified through our system processing which then gives the user a visual uh uh value of how many records were processed and how many of those records boards had been enriched through our enrichment data process. This gives the user a quick highle overview of the success of the enrichment process without having to manually go through and look at the list themselves.  
   
 

### 00:15:25

   
**Wesley Burgess:** The third subpage is called outcomes. Outcomes has the following colum column headers. Import enriched list updated on with a date stamp source name meaning how was the data imported into the system i.e. CSV file import via web hook via FTP. Next column is records indicating how many unique records are in the list. Next column is top campaign outcome detailing the type of campaign that it was most successful in based on the campaign name. Top campaign outcome is established a percentage communication outcome based on contactability from all campaigns run on this list. Next column is general feedback which gives an percentage based value on the success of the general feedback based on various different metrics data for this particular list. Now what is important what I have not yet mentioned is that within each of these three subtabs contract data contact control date sorry the first column sorry the first tab under list management the first subpage tab is called control data list. If I mistakenly called it something else previously, please take note of that that under list, the first subpage tab is called control data list.  
   
 

### 00:17:32

   
**Wesley Burgess:** Now within each of these three subtabs, control data list, enrich data list and as well as al u outcome, you have the ability to select the list from a select box next to the name of the list. And then in the subpage tab header, there are buttons and actual items that the user has the ability to select on when on each of the pages. For example, control data list has a hourglass which allows the user to select a function to search and they can search based on the list name or even description or tags. There is also a refresh button which refreshes the data on the screen. You can click that to reload the data on the screen. There's also a filter button which digs deeper into filtering the results as an advanced search function by choosing options that appear on a pop-up window. In the filter option, the user can choose start date, end date, the enriched plan that was used to enrich the data, or they can enter a origin of country or phone number D code based on the D code that belongs to the contact number for each record.  
   
 

### 00:19:12

   
**Wesley Burgess:** or they can filter by tags then apply filters and reset the data visible to the user on each page. So in control data when you're looking at the main table which details the list information there is multiple buttons in each row of data. The first button is edit. The next button is delete. And the third button is a downwards arrow indicating that you can expand the row to view more data regarding that list. So if the user had to click on the edit button, they allow them to edit basic information about the list like the list name, descriptions, and tags. If the user clicks on the downward arrow to expand the row, the user will be presented with two new subtabs. So these are tabs above a table. The first tab has the following table. Sorry, the first tab is called list meta data. And in this list ma meta data tab the user will be presented with a a table with the following column headers. Dates with a date stamp reference phone numbers indicating how many phone numbers belong to that list.  
   
 

### 00:20:42

   
**Wesley Burgess:** The D code indicating the D international D code for the numbers in the list. And then the enriched plan which is the plan that's been insigned to the list to enrich that data list. From here the user has the ability to switch over to the second subtab called import contact. Sorry I repeat the second subtab is called import connection. In import connection the connection name is in the table meaning how is it being connected to the contact records I via the via voice SMS email what are the oh um that is incorrect I retract what I said about import connection sub tab. In this import correct connection subtab the following column belong in the table below. Connection name type status data mapping. So within these four columns, connection name, type, status, data mapping, it indicates to the user how they are adding data to this list via an import connection. As mentioned before, the import methods allowed are via web hook API push, import CSV file or a FTP file catch or file drop where we catch any files added to an FTP.  
   
 

### 00:22:38

   
**Wesley Burgess:** So when looking at list it's important to understand under the import connection tab it is specifying what is the method of integration with this list with our system. All right going over to enrich data list based on the second main page tab for list management. In this page as well, the user also has the ability to edit the row data which edits the basic information of the list, the descriptions and the tags. The user can also delete the list if they choose to. Uh, and then there's a downward arrow again in the row which allows the user to expand the row data to view more information about that list. In the first sub tab column you would have list metadata. In list meta meta data you have the following table with the following column names. Date import type reference phone number dull codes submitted success fail. In here, the user has the ability to see the results of the enriched data and information pertaining to that list. In the second subtab enriched plan used, it specifies the plan that was the enrichment plan that was assigned to this particular list and their outcomes or detab enrich plan used.  
   
 

### 00:24:22

   
**Wesley Burgess:** You have the following table. Enrich plan is the first column. Pre-processing task, processing tasks, post-processing task. Here the user can see the enriched plan name that was assigned to the list. What other pre-processing tasks were done prior to the enrichment which are some pre uh functionality that we allow the user to do before applying to enrich their data. they can do some data uh cleansing uh processes allowing them to improve their over over uh their overall results on the enrichment plan. Then there's a post-processing task which allows the user to perform additional data enrichment tasks after the enrichment process has been completed. The purpose of this here is to show the user that they have the ability to assign a customized data enrichment plan which allows the user to do functionality tasks in a pre-processing environment before attempting to enrich the data from an external source of data. And then once the external source of data is returned, the user can then do some post-processing which allows them to do further enrichments to the data.  
   
 

### 00:25:48

   
**Wesley Burgess:** Afterwards, the user will see the processing tasks list by name for each of the options given to them when viewing the data. Now moving over to data enrichment. In in data enrichment is the second main page from the left toolbar or left menu page. In this day enrichment page the user is presented with a single main page for with a single uh tab. No multiple tabs on on this uh this uh data enrichment menu. The tab on this page for the for the main page of data enrichment is called enrichment plans. This is where the user has the ability to create a new data enrichment plan just described in list managements earlier. So within list management the user manages the list and within data enrichment the user manages the enrichment plans assigned to the list. So in this part here we have a workflow. There's a button on the top right hand corner called create enrichment plan. The user clicks on create enrichment plan and it takes them through a wizard-like setup where a pop-up appears on the screen with five steps with a linear approach.  
   
 

### 00:27:14

   
**Wesley Burgess:** In step one, plan setup. The user must enter a plan name. The user must then enter a plan description which is optional. Then they are presented with two buttons at the bottom. The first one says clear input if they wish to clear the information they've just entered or they can continue by hitting the button save and continue. Once the user saves and continues, they are pres move to step two which is prepro processing tasks. The the user has the option to choose one or more pre-processing tasks and the two options currently available to them is duplicate removal. If the user chooses this pre-process processing task, it'll remove all duplicate records including only keeping only the original. The user then can have a second option to choose filter columns by unique records. Which means if the user decides to apply the first rule which is duplicate uh remove duplicates and applies the second rule which is filter by column for unique records. The user can duplicate all records on a specific columns and not all columns combined.  
   
 

### 00:28:39

   
**Wesley Burgess:** So the first option is the uh delete all unique uh records for all available columns and filter by columns allows them to granually select which columns they want to remove or duplicates by. All right, as the user goes on to the next step, there we go. Save and continue to step three. Select one or more processing tasks. So now the pro the user is in postprocessing. So if the user wishes to apply additional uh processing tasks which we call post-processing, they'll be presented with two options in step three. The first option is select one or more processing tasks. The user must choose one at least from the first section below which is called reverse number lookup process. The user will be able to select reverse for a number lookup process and then be presented with additional post-processing tasks which they can choose from. The three options currently in post-processing tasks is full name cleanup on third-party data. Meaning that the data that is retrieved from the data enrichment on the reverse phone number lookup allows the user to then run phone number or cleanup on any columns which have text in which they want to clean up based on removing white spaces or special characters or funny things.  
   
 

### 00:30:15

   
**Wesley Burgess:** They don't belong in contact name uh formatting or even addresses or anything associated to specific rules on a column data. The second option is write party context score. So if the user wishes to compare their original file, the source file or the control data file with the third-party data which is returned back from the data uh enrichment process reverse phone number lookup. The user then can run our algorithm script to then compare the control data with the the third party data from the reverse phone number lookup. This will then give the the the user additional data metrics on their list which shows them a value based on the score of the comparing of the names between the source data, control data and the third party data. And then given it a easy match ranking based on match, partial match or strong match, medium match or low match or anything of those types of descriptions. I think we will rather go high match, medium match, low match as a word description based on their right party contact score. The user then has the ability to rep prioritize phone numbers on a specific contact record unique identifier such as a government ID number or reference number because in our system if the user has a unique identifier and has multiple phone numbers we will handle each of those records as an individual record and a row on its own.  
   
 

### 00:32:27

   
**Wesley Burgess:** Meaning that a contact name could be duplicated if it has a different phone number and the same ID number. So the purpose of this is it to normalize our data in our system where each phone number is its own unique record because we are looking at control data from a source data versus third party data based on the reverse phone number lookup. Our system is designed to prioritize the phone number as the contact source and unique identifier and all other relative data such as contact information as secondary to the phone number. Therefore, our phone number system is the unique identifier record. Moving on, if the user can decides to choose any of these three options to rep prioritize phone number one for the unique identifier, the user has the option to choose prior rep prioritize phone number based on your right party contact score. Now the logic behind this is quite simple. source data has source information of the contact information and the reverse phone number and lookup process returns third party data which may be different from the source data meaning that the phone number from the source data might be John Smith but the reverse phone number lookup process returns Michael Burgess and from this the user will be able to identify does the third party data show a different name causing a discrepancy and a low score right party  
   
 

### 00:34:12

   
**Wesley Burgess:** score match on the source name versus the third party party name. Therefore, when the user rep prioritizes the phone number associated to the contact being the source versus the right party contact results, this user can score this number as a low match. Therefore, determining that the number is most likely not the source data name or contact name. Therefore, the new results returned from the third party data would indicate to the user that this may need to be a new record created that is detached from the original source data and may no longer be relevant for the phone number shared between the source data contact information and the third party contact information. Moving on to step four, data export. So in this option the user is presented with an optional option to export the data through various different method types. One, they can enable the feature to post-process data export, which means that the system after enriching the data through its enrichment plan will then push data to the user via an API web hook or push data via an FTP file drop as the output file results from the enrichment.  
   
 

### 00:35:42

   
**Wesley Burgess:** This integration process allows the user to customize their data enrichment plan to automate post-processing data to be pushed back to the user either via API web hook or to file drop back to a secure FTP server that is preconfigured in our system under a different menu page called connections. So if the user decides to disable the post-processing data export method, the data will just remain within the system and the user can go and view the results directly within the system without taking the data out of the system. The user says they choose not to export the data in this data enrichment plan, they can save, continue, and then they'll go to step five, which gives them a review of what the plan settings look like based on the configuration options they have chosen. For example, the plan setup would show the plan name and the description. In the enrichment tasks, it would show the user what pre-processing enrichment tasks they have assigned to this plan, what processing tasks they have assigned to this plan, and what pre-proc or post-processing tasks they have assigned to this plan.  
   
 

### 00:36:55

   
**Wesley Burgess:** If they're happy with what they're looking at on the review, they can save and continue to create the data enrichment plan. Now, the plan is created. Under enrichment plan, you'll have a main page. And in that main page, you will have the following table. Under enrichment plans tab, plan name, description, pre-processing, post-processing, and po uh sorry, let me repeat that. The table is plan name, description, pre-processing, processing, post-processing indicating the plan settings assigned to it. In the row of the of the plan, there are three buttons presented. The first row is a edit which allows the user to edit which takes them back through the wizard flow to allow them to edit the plan. Delete allows them to delete the plan. And then the third button in the row is called play. And this play button indicates the user is ready to submit that data enrichment plan and allow to be utilized with its list. If it is plain and active, it means that it is always active allowing new list to be assigned to this plan.  
   
 

### 00:38:07

   
**Wesley Burgess:** If it is stopped, it means the list is not active. You cannot assign any list to a plan. In there, there is now a bottom container below the main page within data enrichment. So in the data enrichment plan what is slightly different from list management page is that there are two containers the main container which covers about 80% of the page is the list plans and the table I just described and below that which covers about 20% of the bottom of the main page is a table with three sub sorry with um a a small table or container with four tabs. First tab is in Q indicating how many lists are in Q and being processed. The next tab, second tab is paused. How many lists are in pause state. The next tab which is third tab is scheduled is how many lists are scheduled to be enriched. And then the fourth tab which is called complete which indicates how many lists have been completed. Now purpose of this allows the user to manage their data enrichment plans and act and allow them to see which plans are currently active in play state or stopped.  
   
 

### 00:39:39

   
**Wesley Burgess:** If they are active, they will have a basically live uh widget type table which allows them to view lists in Q, pause, scheduled, and complete. Because lists are managed in list management and assigned to the data enrichment plan. The purpose of having this bottom container is to allow the user to see data enrichment lists that are currently in process or assigned to a plan. All right. Now we go to the third main uh menu uh button called data groups. In data groups, you're presented with three sub uh pages, three subpages. The first subpage is called data groups. Second subpage is called D group D. Second subpage is called D code grouping with brackets auto. And then the third subpage is called RPC for right party contact and WCP for wrong party contact with brackets auto. Now let me describe data groups subpage first. In the data group subpage, you have a main table called with column header names, group name, description, unique records. In this you data in this table, you'll see a segmented name created by a user based on a group.  
   
 

### 00:41:37

   
**Wesley Burgess:** Now the user has the ability to create a group by clicking on the create group button at the top right hand corner which takes the user through a setup to create a data group. The purpose of this is to allow the user to group their data based on various different details. For example, create data group in step one. So there are four steps in total. The steps are list filters, include columns, group setup, and review. In step one, the user is given the options to filter list to include in data group. They get to choose do we want to filter the data based on the control data. This is the data that is re imported by the data uh in the main list. Control data will always be the main list data. The user has the ability to also choose if they want to in include the riched data list which is the third party data results because our data system allows the user to import data as a control data list. We'll always have a third party data as a relational data to that information based on the reverse phone number lookup information we've conducted in the enrichment plan.  
   
 

### 00:42:56

   
**Wesley Burgess:** So if the user filters by the control data, they then are presented an option to choose from start date to end date and that indicates when the data was um first inserted into the database. Then the user has the ability to then choose the end date. So specifying when they would want um uh to consider data that was imported into the system by a specific end date. The user then has the ability to choose a tag. These are tags that are added usually during uh data imports uh or list creations. So if there the user can filter by a tag to create to assign it to this data group. The user has the option to choose origin which allows them to show uh show the phone numbers by area uh international dial code. Um if they choose South Africa for example as the D code, they could even get more granular and choose the D code network operator prefix. So with if they choose the network operator D code, it then allows their user to filter that data based on a specific mobile network or or operator network.  
   
 

### 00:44:18

   
**Wesley Burgess:** If they choose to filter further, they can also choose to filter by the enrichment plan which the data went through. So once data is enriched, it is tagged with the specific enrichment plan that it's assigned to. And the user can also filter their data results by group based on the Richmond plan that it was assigned to. Now the user doesn't have to choose all of these options. They can choose just date on its own or they can choose tags just on its own or they can choose it specifically on their data enrichment group that they were they were assigned to. So after step one, they then have the ability to can save and continue. but before they are yeah save and continue they go to step two. In step two the user is then presented with the following options in include columns. Here it gives the user a preview of the list columns within the data uh table. The user can select multiple phone numbers or single phone numbers or prioritize phone number one and two or or one and two and three or five depending on the phone number priority that's assigned to the unique identifier and mobile number.  
   
 

### 00:46:09

   
**Wesley Burgess:** The user then can also choose to include columns like name, second name, third name, last name or all depending on what information they want to add to this group. They then have the option to um choose the address dress address options once this and then other options are to choose by customer unique reference number or age or any age and customer reference number. So if they go and continue, they then can choose the group name and give the group name uh group description based on the filtering and columns to include and then go to review and they get to see an overview. Okay, this is the group name. This is the description. Uh what are we filtering by based on the filter the list filter options and then which columns to include into the grouping. Then they can create the group. Once they've created the group, all data that matches that criteria would be added to this group, allowing users to cross-pollinate their contact lists or lists from list management and start grouping them into merge data sources which they can then use for marketing campaigns and various other communication campaigns they want to use.  
   
 

### 00:47:36

   
**Wesley Burgess:** The next tab p in uh subpage two under data groups is called d code grouping auto. So in this it is really mostly related to storing of information based on the customer's data. So in this d code grouping what it then does is all data in the system is then grouped based on their country of origin. So in this what it would do is it would show the user the country name country d code and how many phone numbers are part of that country that are contained in all the different data sources they have. If the user wishes to see more information about a in country level, there's a drop-own arrow inside the column or inside the row data. They are then presented with a new subpage table. In the subtab, list group by network operator gives the user the option to see how many of the phone numbers within that country are assigned to specific network operators i.e. phone number or phone operator carrier provider. So if they were looking at South Africa for example uh and they chose to drill down into the country they would have a list of all South Africa network operators.  
   
 

### 00:49:19

   
**Wesley Burgess:** How many lists um are include how many accounts of lists are included with that network operator and how many phone numbers they have from that network operator in that country. The user has a double arrow next to the list counts within this table which allows them to pop up on the screen all lists that make up that list count. So the user can see which lists by name are part of the metrics data shown in this subtable. The user has the ability to download or view or download country or operated list for detailed information. So for example, if the user was looking at the South Africa grouping or the Dalco grouping page and was looking at country list South Africa, they then uh have the opportunity to click on that list and download all data based on that country. They'll then be presented with a confirm pin to view data or download data. Once they have confirmed PIN there, it'll download the data for them. We do never we never display the actual contact information on our UI system for privacy and permission reasons, allowing this to be a very secure data uh management system without having to physically see and view the the data directly on the system.  
   
 

### 00:51:12

   
**Wesley Burgess:** It is all secured. So if the user wishes to see the data, they have to go through a security process of exporting that data to a CSV file which they can look at locally on their machine with the right permissions. All right, going on to the next third subpage called RPC and WPC auto which again stands for right party contact wrong party contact order auto to describe the auto reasoning for this is that these groupings d code grouping and right party contact wrong party contact grouping these groups are done dynamically ally by our system. The user does not need to do anything to create these groupings. They'll automatically group by the system based on their country D code or operator D code or their wrong party contact or right party contact scoring uh resulted by the data enrichment process. So once the user goes through wrong party contact and or sorry sorry uh right party contact and wrong party contact they're then able to see their control data list name which is the uh imported in list management uh the description uh how many records were submitted, how many were successful, how many records failed, how many of those records scored a right party contact score and how many of them scored a wrong party contact scored.  
   
 

### 00:52:52

   
**Wesley Burgess:** Now the purpose of this table uh in this section is to give the user a higher level view of the postprocessing done from their data enrichment plan. So only when a list that is gone through a data enrichment plan with post-processing for righty contact scoring will appear in this page for data grouping. Very important to note that if the post-processing for right party contact score has not been done on any of the list, the list will not appear in this section under data groups for right party contact and wrong party contact. Okay. continuing in once the user um is wanting to look at the results, they have a button presented to them in the table where they can view the right party contact and wrong party contact which allows them to split that list into two separate lists. Now the benefit of doing this is to remove all wrong party contact from the right party contact data from the original source file the control file. If the user chooses to split it, what will then happen is all wrong party contact will become 100% in the list and all wrong party contact will become 100% in the list that is split into.  
   
 

### 00:54:33

   
**Wesley Burgess:** The user then has the ability to manage two separate list from the original contact source list. And the benefit of this is they will move all wrong party contact data into a new list. The the user will be presented with a pop-up screen that says new control list which is based on wrong party contact data. They can create a new wrong party contact data list. Give it a description. specify the country of origin uh for the D code purposes mapping. It can add tags to this data and it can also add suggestions based on data grouping and segments managed in data grouping. For example, you can create a data group called insurance or top sales or senior citizens and you can assign data to that group during this process. Once the user has created a new wrong party contact control data list, those two lists now will live in two different environments. Therefore, it would the list management would then be modified and the wrong party contact data will then have a new data source for and create a new record for it.  
   
 

### 00:56:04

   
**Wesley Burgess:** All right, going into uh just to also um note um this main page for data groups has an hourglass for searching lists by name and description. Uh there's a refresh button. There's also a filter button to filter list displayed by the different groups. And there's always an export button if the user chooses to export a specific uh data group, D code group or wrong party contact list group on this page. Going to the fifth menu page. Now we've covered dashboard, contact list management, data enrichment, data groups. We're now going on to connections. Connections is a section within the UI that's based on integrations. And this integration uh option allows users to connect to our system e via API web hooks or secure FTP server connections. So in this section, the first uh it's separated by two uh subpages. The first subpage tab is called API web hooks and the second subpage tab is called FTP servers. In this uh connections page, the user has a button on the top right corner.  
   
 

### 00:57:33

   
**Wesley Burgess:** So called create new connection. The user has an option to choose from two when is presented with two options when creating a new connection. The first option is import connection and the second option is export connection. They can only choose one. They cannot choose both. If they choose import connection and they go continue, they will have an option in step one out of step three steps presented to them. In step one, the data export connection will choose API web hook or FTP sec uh server connection. Since we are choosing imports as our um create connection type, we are now setting up the import data rules based on either an API webbook or an incoming uh input folder for an FTP connection. So let's work through the API web hook flow. First user chooses API web hook, says save and continue. They give the web hook a name. They add the web hook URL. They then choose I want to import this data into a control data list or I want to import this data into an outcome data list.  
   
 

### 00:58:58

   
**Wesley Burgess:** Now let me explain the difference. If the choose user chooses to import this data into a control data list, it will be mapped to a specific list that exists on the system. as the control data. If the chooser the user chooses to import this data based on import connection by via output data, the user will then be able to update the outcome data based on the control data itself. So import function operates in two methods. One is to import data to the control data which is creating a new list and adding or create adding data to a list on the system and the output data is based on adding data results to the list. the control data list. The user can then save and continue and then it'll give them a review to show them the connection view type which is type web hook web hook name URL and method in this example get. The user then has a run test button before they go to create connection to actually simulate and test that the API integration is either successful or fails based on the setting parameters.  
   
 

### 01:00:32

   
**Wesley Burgess:** Now let's walk through the connection type again and choose secure FTP server connection. Here the user is FTP connection server moves to step two. They enter the server name, the server address, the connection port, the directory path, the username and password. The user then must choose am I importing this data into a control data or am I fetching this data and adding it to my output data. Same as before with the web hook, the user has two import options. One, am I importing my data to a control list or am I updating my control list by up importing data from an outcome data source? User can continue review the connection setup and then run a test to simulate the connection to that FTP server. Once the connection is created, the user can then use these connections created to assign them to lists. So just to recap, if we move back to list management and we edit a list or view an existing list, we are presented with uh the edit control list information which shows us the ed uh the list name, the description, the d code assigned to tags and uh segments grouping segments.  
   
 

### 01:02:05

   
**Wesley Burgess:** They can go continue and edit. Then under data enrichment second main page the user now knowing that that connection has been created under connections can go to a data enrichment plan. Hit the edit button and in the edit button walk through that edit the the plan settings and under the data export step four option. The user has the ability to now assign that connection type to that data enrichment plan. So for example in list management the user will be able to set up all import connections as well as export connections to export data back to a CRM or data application. Sorry, let me repeat that. Under list management, the user can manage or import connections only. And for data enrichment main page, the user can uh manage the data enrichment plan based on export connection types. Now let me explain. For list management, the uh connection type for import allows user to import data into a control list or update the control list data based on outcomes from an external source. Under data enrichment, if the user wants to enrich data and then send the results back to them to an external source, they then could choose data export in step four and allow them to push that data either via web hook or FTP server.  
   
 

### 01:04:13

   
**Wesley Burgess:** Now if the server it's so now we've we've covered dashboard list management data enrichment data groups and connections and creating a connection. The last menu uh option in the main menu is data export. So now that we've created connections and we have lists and we have data enrichment plans and groups, we now have the ability to export data based on a v wide a v variety of methods. For example, if the user wants to export data, they'll go to the export data page. They then choose new export data presented with with a password or pin to secure uh to confirm access to uh view data. They are then taken to a wizard setup for create export data flow. There are four steps in step one under list filter list. The user must choose do they want to filter the data based on control list. It will then show how many control lists there are on the system or they can choose do I want to um export data based on the enriched enriched list and then verify how many enriched lists the uh numbers there are based on uh the selection the user will be asked to choose or to filter the list by their date.  
   
 

### 01:05:44

   
**Wesley Burgess:** So now let's say I want to look at all lists that were available from July 6th to February 1, uh, February 28\. And then I want to enter all my tags based on the type of data that I'm looking for from my list. I then can choose the country code that I want to choose based on country origin. And if I want to drill down even further, uh I can say I want to only choose the the specific network carrier like Vodafon. So by adding these filters into my export, I can drill down and I can export all data from control list between this start date and this end date with these tags and this country origin from this specific network operator. And then to drill it down even further, I can say with only this enrichment plan performed on this data, it'll then give a count of how many records meet and match that filtered criteria and the user can save and continue. Then the user is presented with options like what information do I want to export?  
   
 

### 01:07:11

   
**Wesley Burgess:** Do I want to export priority phone number one only records or do I want to export priority phone number one and two and three? So the first three phone numbers in those priority orders for all control data lists order I want to select all which means all phone numbers priority 1 to five as well as the contact phone uh email records. I then have the option to choose do I want the first name and last name only or do I want first name, last name, third name or or all names associated to the record. Same thing goes with address. Do I want the just the address or just the zip code or just the country? Or I could say give me all address details. And the last option which is other, which is do I want to filter this data based on its unique reference number and do I want to filter the data based on its age? And I can enter an age range or do I want to filter it based on unique reference number as well as age.  
   
 

### 01:08:26

   
**Wesley Burgess:** It will then reduce the record uh count based on these uh details. Sorry, just to repeat that these are all columns I want to include in my export. So when it comes to other when I choose customer reference or age or or all it's going to it's going to allow those columns in the exported data not filter them by. So I retract what I said previously about filtering on other that is incorrect. It allows me to view that data as part of the export columns. Once the user says export and we'll move to uh to next page which is step three and we're going to say how do we want to export this data. So the user clicks on the export button and uh the user gets presented with an option that says download to my device which means it will prepare the file and allow them to click on that file once the file is ready for download and they can download that file directly on their local machine or the user can untick download to my device and say no I want this data to be exported to a web hook.  
   
 

### 01:09:34

   
**Wesley Burgess:** It would then choose the web hook and then go through the connection and choose the connection type that's been predefined and set up under connections ma uh page and then when that data is exported it'll be pushed to either the web hook or pushed to the secured FTP folder based on the connection type that has been set up and then save and continue. Then what ends up happening is now the user is data is exported based on their filter across all lists. Now again the system is designed to manage individual list but as you can see even though there are individual lists available this data is still merged into groups and can be exported based on various different filtering options. That is the full workflow and and main pages of the new data system based on its functionality. Now let's get to the user functionality based on the toolbar on the right hand side of the page um for the user accessibility in the UI. And then to the bottom left hand side of the UI in the main menu you have two buttons called send feedback giving feedback to product owners uh based on their experience on the system um and help which takes the user through a ticketing system allowing them to open support tickets based on uh troubleshooting issues.  
   
 

### 01:11:11

   
**Wesley Burgess:** Um the help section will first allow the user to review through frequently asked questions and as well as include a onremise uh chatbot AI allowing the user to ask questions to our system and our system given it answers back on feedback to help them with the UI. Then let's navigate to the right hand side of the screen which we will see is a small slither of a toolbar that covers the top to bottom um right hand side toolbar. It is takes up about 5% if not less of the full page. And in this toolbar, you the user will see a profile image of themsel or um some type of avatar. There's a button which has a profile icon. The user can click on it and it will show them their information of their profile which they can edit and modify. uh in that popup there's activity log which shows them um all activity that this user has done on the page and their IP address and in this table below which they can scroll through shows time event and the IP address they were last um had activity on the system.  
   
 

### 01:12:40

   
**Wesley Burgess:** The third uh option is their subscription and billing plan. here. If their user is an admin, uh they will have access to view the subscription and billing plan. If the user is just a normal agent on the system, uh subscription um and billing plan will not be accessible to them. So, as an admin user, they will have subscription and billing access. They can view their plan. They can manage their payments uh type. Um if they are on a prepaid plan uh they can manage their credit and assign credit to their plan. If they're on post-paid plan for premium plans they can manage their monthly subscription and credit allowance on the system. In the billing section, uh it'll show all billing history based on their usage on our system and it'll allow them to also download any invoices for transactions based on the system and and a statement. All right. Next button within the sidebar right sidebar menu is account settings. In account settings here they can set various different rules based on the user uh UI functionality.  
   
 

### 01:13:55

   
**Wesley Burgess:** they can um manage their list settings. So uh for example, if they are an admin, they can allow specific um permissions to uh allow for import from external source or export from external source, deleting of files or non-deing of files in various different list settings. Uh under privacy and security um they can also manage access to the system based on uh will the user have functionality around exporting data. API settings allows the user to allow for API settings to allow web hook or allow FTP and if they are allowed uh to preconfigure and whitelist IP addresses utilized within our system to allow these API connections either via web hook or FTP. Then the third option or button on the side menu toolbar is to log out which is self-explanatory logs the user out. And then there is a little um vertical card which is displayed below which shows dollar a dollar sign with a circular amount or saying active showing the amount of active credit that is available on the system. and below is the total counts or searches available on the system.  
   
 

### 01:15:23

   
**Wesley Burgess:** Now what that means is our system is based on data enrichment. So every data enrichment service that we offer allows the user um the ability to search a record based on its phone number. So if there are X amount of credits loaded on the system in the value of the currency that the user is charged by, it will show them how much credit they have available and how many searches they can conduct based on the available credit they have on the system. Then there then is a icon with a bell uh which is a notification uh icon and it'll show a value below it which would indicate how many lists are currently in process or being enriched and um a notification to notify them how many new notifications the user has. So with the small slither of a toolbar on the on the right hand side there is an double arrow pointing left allowing the user to expand their toolbar into an action pad. Here in the action pad it expands more information based on the users's profile settings, subscriptions, their credits, how many searches available.  
   
 

### 01:16:45

   
**Wesley Burgess:** There's also an option to request more credit uh if the user has run out of say prepaid credit or if their post-paid credit for their subscription plan um is running low. They have the ability to request more credit, enter the value of how many searches they would like and then submit. This will be pushed back through to our admin portal which will allow our admin um uh users the ability to either authorize credits or invoice for the additional credit requested. Below that is an expanded view of our notification uh section which indicates all notifications on our system. Notifications can include an export of data to local machine which will then show them the progress of the file being prepared for download. Once the file is available for download, they'll be notified in the notify notifications um uh section and and the user will be presented with a link to be able to click to download that file. Uh if credit request was approved, notifications will be in there. if they're low on credit, new low notifications, anything to do with activity on the system where new import data might be inserted or if data enrichment files have been completed and the enrichment plan is completed or if there only any any other activities that are running as backend processing.  
   
 

### 01:18:14

   
**Wesley Burgess:** those notifications would end up in this notifications bar including all user activity uh related to uh subscriptions and services. All right, that covers the bulk of the UI. The only part that I've left out is what we call our He-Man search. So in the main left toolbar under the me above the menu page or menu section above dashboard there is a search uh section. In that search section it says search by new data. Now what this is we call is the He-Man search. In the He-Man search, the user can search for anything in the UI, whether it's a list, a list name, a tag, an enrichment plan name, a data group or connection type, whatever it is, they can search there. And when they search, it will then appear with all uh a pop-up will then appear with all results categorized in each of the menu pages such as list management, data enrichment, group, data group, connections, or data export and then show the keywords that are searched to filter out the results based on each of them.  
   
 

### 01:19:35

   
**Wesley Burgess:** The user can then choose based on those page pages which to view based on the results. So if they only want to see results from list management, you'll click on the list management icon in the popup and it will only display all keyword results based in list management. Allow more for more granular selection when searching within our system. And just for the record, the reason why we call it the He-Man search is because He-Man was master of the universe. And this is kind of like that. We're searching everything within its new data universe to allow the user to see all information associated within their system. Making it very easy to navigate and find anything within our system. All right. Last thing I wanted to mention is that in the He-Made search, if the user knows the phone number of a record cuz they're an admin and have that permission, they can even type the phone number. And what would happen is it would show the user all lists that are associated with that phone number, all data enrichments that is being conducted by that phone number, all data groups that phone number belongs to and so forth.  
   
 

### 01:20:50

   
**Wesley Burgess:** That is the purpose of the He-Man search is that it also allows users to quickly identify where a record exists within our system without having to actually physically go look and search in each of the individual lists itself. All right, that covers it completely and uh now the the goal from this meeting is to do one of the two followings. One is to create a database schema uh utilized for this UI where it can map each of the elements and components of this UI. Identify how to make this application a multi-teneted structure based on the user's accessibility and how an admin user can manage the multi-teneted structure of this UI and also give uh API instructions to our full stack developer and backend developer on how to handle API integrations and connections from web hooks and from FTP's uh integrations with our system as well as discuss tasks around creating a database architectural structure to manage these different functionalities within the system such as grouping of data based on relational information from multiple sources of data. So the database that would be managed the system would need to understand the source data and its original state as well as the unique contact record identifier given by the user on the import and the unique identifier constraints around the phone number and how many other records are also linked to that same phone Therefore identifying the best source of contact information as right party contact based on the phone number and not on the contact information itself  
   
 

### 01:22:58

   
**Wesley Burgess:** associated to that phone number. That is our system and we need assistance with developing uh all various different backend applications to do the various different services as discussed. Now I would like to talk about feature enhancements based on this current design and future design. The future design which adds additional pre-processing of importing data into list management sections. So we have rec recently developed a system that allows a user to scan through local directory folders on their servers which pick up any type of file whether a text file uh a zip file with v different formats within that zip file, a PDF file, a word document, an excel, various different Excel for file formats, a CSV file, a SQL file or any type of our other commonly used database files. And the purpose of this application that we've developed is to allow users to take very raw unconstructed data from their system to import into the new data system more seamlessly and to create control data lists for all of the data based on its various different structure and unconstructed formatting in different data sources. The benefit of this is to allow a user to take all data files seamlessly in integrate them into our system and rep prioritize column names and data names based on its data source to standardize data when bringing in old unconstructed data and make it new data in our new data system.  
   
 

### Transcription ended after 01:25:03

*This editable transcript was computer generated and might contain errors. People can also change the text after it was created.*