# Social Security Application

This is a Front end app that enables a user to submit the application for Social Security.

# Purpose & Features

User has to enter all his personal data including UAE National ID, UAE Phone number. The application also collects the financial backgound, current financial status & his / her dependents. The application form has been designed to check the patterns of important information so as to reduce the instance of data error. Users also have the option of taking the assistance of AI (in this instance OpenAI) to enter their current situation. This will help them in putting a better application to get the assistance. This application has been designed to be filled and submitted in Tablets & Mobiles also. Hence, there is no need for Users to have a computer system to submit the application. The application also supports Arabic language.

# Techstack

React + Vite +
Typescript +
Material UI (incl. Date Picker) +
React Hook Form +
React-i18next +
OpenAI

# Steps to run the project

1. Go to root folder and run <mark>npm install</mark> to install the dependencies
2. Run <mark>npm start</mark> or <mark>npm run dev</mark> to run the application
3. Access the application at [http://localhost:5173/](http://localhost:5173/) in your browser. Best supported in <mark>Chrome</mark> / <mark>Firefox</mark>
4. If you're unable to access the app at [http://localhost:5173/](http://localhost:5173/), you may running another app in the same port. Do check the command line to fetch the correct port
5. This app required OpenAI access to complete the form. Please check the steps mentioned to get OpenAI API Key.

# Steps to get OpenAI API Key

- Please create an account in [OpenAI](https://platform.openai.com), if you do not have a OpenAI account already.
- After creating the account, please navigate to [Billing](https://platform.openai.com/settings/organization/billing/overview) on the left hand side menu and click <mark>‘Add to credit balance’</mark> to add credit.
- On the same menu list, on the top you can see link to <mark>‘API keys’</mark>. On the same page, click <mark>‘Create new secret key’</mark> button to create a new API Key.
- Please copy and add <mark>VITE_OPENAI_KEY={apiKey created}</mark> in .env file.
- Since env file is git ignored, the secret is not stored in git. Hence, please do not save secret keys in any other files as the secrets may be accidentally shared with others.

# Architecture

Client layer - [ReactJs](https://react.dev/) + [Typescript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/)

Build Tool - [Vite](https://vite.dev/)

UXE Library - [Material UI](https://mui.com/) + [Material Date Picker](https://mui.com/x/react-date-pickers/)

Form - [React Hook Form](https://react-hook-form.com/)

Internationalization - [react-i18next](https://react.i18next.com/)

External Integrations - [OpenAI](https://platform.openai.com)

Mock API - [Mock Service Worker](https://mswjs.io/)

Component Testing - [Vitest](https://vitest.dev/)

# Why?

React.js - provides an efficient, scalable and flexible approach to building User Interfaces, primarily due to its component-based architecture and the use of a Virtual DOM.

Typescript - primarily adds optical static typing to the language, providing significant advantages for building large-scale, robust applications.

Tailwind CSS - streamlines web development process by providing a utility-first framework

Vite - modern, fast frontend build tool, offering an extremely quick development experience and efficient production builds

React Hook Form - provides a performant, light weight & simple solution for form management and validation

MSW - standalone API mocking layer, creating a single source of truth for your network behavior and integrating it across

# Future Scope

The application can be scaled to include Authentication, Application Tracking / Edit / Abandon.
