## GrowwGram

_Instagram for aesthetic pictures_

## Frontend project for GrowwGram

This project is built using React as the core library and various other libraries like Redux Toolkit, React Router and Tailwind CSS.
It consumes Unsplash API to show photos.

It includes the following features -

- [ ] **Infinite feed** of pictures from all over the world
- [ ] **Profile page of photographers** showcasing their latest photos
- [ ] **Light and Dark mode**

The base branch for this project is maintained in `main`.

## Project Setup

- Install git and setup git config.
- Clone the repo to your working directory.
- Install VSCode editor.
- Make sure Node.JS version 16LTS or later is installed.
- Run `npm i` in the project root to install dependencies.

## Environment variables setup

The project requires some environment variables to work after the setup. Follow the steps below to supply the necessary environment variables.

Create a **.env** file in the project root and add the following envs to it.

<br />

**1. REACT_APP_ACCESS_KEY**

`Your access key for Unsplash API`

**2. REACT_APP_CACHE_DURATION** (optional)

`Duration (in seconds) for which the API response should be cached`

## Running the project

After finishing the setup, run `npm start` to start the development server and visit `http://localhost:3000` to view app running in your browser.
Any changes made to the app will reflect in the browser.

<br />
<hr />
<br />

### Application Overview

## 1. Tech Stack

<h4>This project is built using React. This section gives an overview of all the important libraries used for the development.</h4>

- **React**:

  React is an open-source front-end JavaScript library for building user interfaces based on UI components.

#####

- **Redux, Redux Toolkit**:

  Redux provides a centralized data store for storing all the data in the app.

  The project uses redux-toolkit, which is an opinionated redux starter, that comes with many redux utilites and enables handling redux store following best practices.

#####

- **Tailwind CSS**

  This project uses utility class based css library tailwind for all styles customizations. All the tailwind custom config can be found in tailwind.config.js.

#####

- **axios**

  axios is used as the client to handle all network requests.

## 2. Techninical overview

### Pages

- `index.js`: is the entry point to the application.
- `apps.js`: consists of routes for different pages.

Route based code-splitting is implemented and thus pages are "lazy-loaded".

This application contains following two main pages.

### /

This is the home page. It fetches 10 random pictures on intial load.
And additional 10 pictures are loaded as the user reaches end of the list.
Infinite scrolling is implemented using the `Intersection Observer` API.
Images outside the viewport are 'lazy loaded'.

All the API responses are cached for a duration of 120 seconds using the browser's `Cache` interface.
Page reloads within the specified interval won't make an API request and instead serve the cached response.
On reloading after the specified interval, the cache will be cleared, an API request will be made and the new response will be cached.

Photos fetched on scroll will be added to the existing cache.

<br />

### /:@username

This is the profile page of a user. It lists some basic information about the user and showcases some of their latest photos.
Photos are initially shown in grid view and there is an option to view them in list view.

Images outside the viewport are 'lazy loaded'.

<br />

### Theme

Light is the default theme.
Dark theme is enabled using Tailwind CSS ‘class’ strategy.
