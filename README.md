# TaskFlow Website

#### Video Demo: <(https://youtu.be/Pa6NSOriOjg?si=jrS8QXdIVi8WsGnp)>

#### Description:

he TaskFlow Task Management Website is a simple, interactive website developed to help users manage their daily tasks. It allows users to add new tasks, update existing tasks, delete unwanted tasks, and display saved tasks in a table. The website is developed using three main web technologies: HTML, CSS, and JavaScript.

The website contains four files: index.html, style.css, script.js, and README.txt. Each file has a different responsibility, and all four work together to create a complete website.

1. index.html — Structure of the Website
   The index.html file is the main file of the TaskFlow website. It defines the structure and content of the web page. HTML stands for HyperText Markup Language, which is used to organize the elements displayed in a browser.

This file contains the website's header, command buttons, input fields, task table, messages, and Exit button. It also connects the CSS and JavaScript files to the website.

Main components of index.html:

a. Website Header

The header displays the name TaskFlow, a checkmark symbol, and a short description. It introduces the website and provides its identity. The heading and branding help users understand that the website is designed for task management.

b. Command Buttons

The website contains four main command buttons:

- Add Task (1): Opens a form for entering a new task.
- Update Task (2): Opens a form where the user enters an existing task ID and its updated description.
- Delete Task (3): Opens a form where the user enters the ID of the task to remove.
- Show Tasks (4): Displays the saved tasks in the table.
  These buttons allow users to perform the main operations without needing to type a command number.

c. Command Input Field

The HTML file provides an input field where users can type a number from 1 to 4. After entering a number, the user clicks the Run Command button to perform the selected operation.

If the user enters an invalid number, the website displays an error message asking them to enter a valid command.

d. Task Input Form

The task form contains fields for entering a task description and, when necessary, a task ID. The task ID is required when updating or deleting an existing task.

The form also includes a Save Task or corresponding action button and Cancel buttons. These elements allow users to submit or cancel their current operation.

e. Task Table

The HTML file defines a table with three columns:

- ID: Displays the unique identification number of each task.
- Task Description: Displays the task's name or description.
- Status: Shows whether the task is saved.
  The table headings remain visible even when the task details are hidden. The task rows are displayed only when the user selects command 4.

f. Exit Button

The Exit button opens a session-ended screen. The user can return to the website using the Back to TaskFlow button.

g. File Connections

The HTML file connects the other two main files using these statements:

- style.css controls the appearance of the website.
- script.js controls the website's functionality.
  Without these connections, the website would not have its intended styling and interactive behavior.

In summary, index.html provides the basic structure of the website and determines which elements appear on the page. 2. style.css — Design and Appearance
The style.css file controls the visual appearance and layout of the TaskFlow website. CSS stands for Cascading Style Sheets. It is used to make web pages attractive, readable, and responsive.

Without CSS, the website would still have its HTML content, but it would look much simpler and less organized.

Main responsibilities of style.css:

a. Colors and Theme

The file defines a modern purple and indigo color theme. It also uses white backgrounds, light gray borders, and different accent colors for the command buttons. These colors make the website look professional and help users distinguish between operations.

b. Layout and Spacing

CSS controls the positions, sizes, margins, and spacing of the website's elements. It arranges the command cards and task table into organized sections.

The page uses separate panels for the command center and the task board, making the interface easier to understand.

c. Buttons and Input Fields

The file styles the Add Task, Update Task, Delete Task, Show Tasks, Run Command, and Exit buttons. It also defines the appearance of text fields, borders, rounded corners, and focus effects.

When users hover over certain buttons, the buttons change appearance slightly to provide visual feedback.

d. Task Table Design

CSS formats the task table by defining the heading background, text sizes, column spacing, borders, task ID labels, and status labels.

It also styles the empty-table message shown when the user has not selected Show Tasks or when the displayed task list is empty.

e. Responsive Design

The file includes media queries that adjust the layout for different screen sizes. For example, the two main website panels can be arranged vertically on smaller screens.

This makes the website more usable on desktop computers, tablets, and mobile phones.

f. Exit Screen Design

CSS styles the session-ended overlay that appears when the Exit button is clicked. It gives the screen a separate appearance and emphasizes the option to return to TaskFlow.

In summary, style.css makes the website visually appealing, organized, and responsive. It controls how the website looks rather than how the task operations work. 3. script.js — Functionality of the Website
The script.js file is responsible for the interactive behavior of TaskFlow. JavaScript allows the website to respond to user actions, process input, modify task data, and update the table without reloading the page.

This file contains the main logic for adding, updating, deleting, and displaying tasks.

Main responsibilities of script.js:

a. Adding Tasks

When the user selects command 1, JavaScript opens the Add Task form. The user enters a task description and submits it.

The script checks that the description is not empty, assigns a unique ID to the new task, and adds the task to the saved task list.

For example, if the user enters "Complete homework," the website creates a task with an ID such as 1.

b. Updating Tasks

When the user selects command 2, the website asks for the task ID and the new task description.

JavaScript searches the saved task list for the specified ID. If the task exists and the new description is valid, the script updates the task.

If the ID cannot be found, an error message is displayed.

c. Deleting Tasks

When the user selects command 3, the website asks for the ID of the task to delete.

JavaScript searches for the matching task and removes it from the task list. If the specified ID does not exist, the website displays an error message.

d. Displaying Tasks

When the user selects command 4, JavaScript displays all saved tasks in the HTML table.

If no tasks exist, the website displays a message explaining that the task list is empty.

After adding, updating, or deleting a task, the user can select command 4 again to see the latest task list.

e. Validating User Input

JavaScript checks whether the entered command is valid. Only the numbers 1, 2, 3, and 4 are accepted as commands.

It also checks task descriptions and task IDs to prevent invalid operations.

f. Saving Tasks

The script uses the browser's localStorage feature to save tasks.

This means tasks can remain available after the page is closed and reopened in the same browser, provided that the browser's stored data has not been cleared and local storage is available.

g. Updating the Table

The script dynamically updates the table rows using the current task list. It also displays the total number of saved tasks.

This keeps the table synchronized with the task data.

h. Exit Functionality

JavaScript handles the Exit button by displaying the session-ended overlay. The user can return to the website without having to reload the page.

In summary, script.js is the functional part of the website. It processes commands, manages task data, handles errors, and updates the interface.
