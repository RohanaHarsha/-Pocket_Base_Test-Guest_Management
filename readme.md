



# Note:
pocketbase exe cannot be in the same folder as in the pocketbaseapi because it confusus the runtime and give resolver error

# Hotel Guest Management App

A modern, responsive web application for managing hotel guests. Built with **React**, **Tailwind CSS**, **React Router**, and **PocketBase** as the backend.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Installation & Setup](#installation--setup)  


---

## Project Overview

This app provides a streamlined interface to manage hotel guests, including registration, listing, editing, and deleting guest records. testing newest database technology waas the main purpose here.

---

## Features

- **PocketBase Integration**: Stores guest data securely in PocketBase collections.
- **Guest Registration**: Add new guest details, including name, email, and date of birth.
- **Guest List**: View all registered guests in a searchable, sortable table.
- **Edit Guest**: Update guest details via a dedicated edit page.
- **Delete Guest**: Remove guests from the system with a confirmation step.
- **Tailwind Styling**: Clean, modern design with custom cards, buttons, forms, and alerts.



## Tech Stack

- **Build Tool**: Vite  
- **Version Control**: Git  



## Project Structure
```
├─ hotel-guest-management
    ├─ client/
    │   ├─ src/
    │   │   ├─ components/
    │   │   ├─ pages/
    │   │   │ ├─ GuestList.tsx
    │   │   │ ├─ GuestEdit.tsx 
    │   │   │ └─ GuestRegistration.tsx 
    |   |   ├─ server/
    │   │   │ ├─ Guest.ts
    │   │   │ ├─ pocketbase.ts 
    │   │   │ 
    │   │   ├─ styles/ # CSS / Tailwind overrides
    │   │   ├─ app.tsx 
    │   │   └─ main.tsx # App entry point
    │   └─ package.json
    ├─ pocketbase/ # PocketBase server & collections
    └─ README.md
```

## Local Installation

**Split the terminal to run PocketBase as well**

---

### 1st Terminal (Frontend - React + Vite)

*Current directory: `hotel-guet-management`*

```bash
# go to client folder
cd client

# install dependencies (No need to install if you already have them installed)
npm install
npm install react-router-dom
npm install pocketbase
npm install tailwindcss @tailwindcss/vite

# add tailwindcss() to the array of the jason-lock.js dependancy file 

#run npm run dev
```
### 2nd Terminal (pocketbase)

*Current directory: `hotel-guet-management`*
```bash
# go to server folder
cd server

#go to pocketbase_folder
cd pocketbase_setup

#run(where the pocketbase exe exist)
./pocketbase serve
#note:
#you can change the pocketbase credentials in pocketbase.ts in server folder inside of the client
#default credentials
 test@gmail.com
 12345678
