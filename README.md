# CS2040S-ALGO-VISUALIZER

> A web-app that visualizes the different algorithms and data structures that were taught in CS2040S, the Data Structures and Algorithms undergraduate Computer Science course in the National University of Singapore (NUS).

## Table of contents

- [General info](#general-info)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Contact](#contact)

## General info

I created this web-app as a fun side-project to help me understand data structures and algorithms while I was taking CS2040S. This project has really paid off for me as I learnt the various naunces and tricky bugs of the data structures and algorithms that were taught by implementing them from scratch. I hope that future CS students can benefit from the usage of my web-app by first taking a seemingly complex data structure / algorithm, visualizing how it works in practice on different inputs, and then understanding the high-level idea behind it.

## Screenshots

![Receptionist Welcome](./release/resize-screenshots/rsz_receptionistwelcome.png)

## Technologies

- Javascript
- ReactJS 
- Redux
- Ant-Design

## Setup

1. Clone this repo
2. In project root, run: `npm ci`
3. To setup ReactJS, refer to https://reactjs.org/docs/getting-started.html
4. To setup Ant-Design, refer to https://ant.design/docs/react/introduce
5. To setup Redux, refer to https://react-redux.js.org/introduction/quick-start
6. After completing the pre-requisite setup, run `npm run start` to start the local dev server
7. You should be able to view the web-app at http://localhost:3000

## Features

- Create, read, update and delete Meetings.
- Uses native date-time picker.
- Create, read, update user roles.
- Send confirmation email with QR code to meeting participants when a new meeting is set up.
- Scan meeting QR code to verify visitor.
- Manual form submission (indicating their contact details and their purpose of visit) for visitors without QR code.
- Push-Notification to employees with _FALLBACK_ / _ADMIN_ role notifying them of new visitor without QR code.
- Employees may _ACCEPT_ / _REJECT_ visitors along with a custom message that will be rendered to the visitor.

Nice to have features:

- Push-Notification to the relevant employee when new visitor with meeting QR code is verified.
- Admin to be able to set custom configs such as standard ACCEPT / REJECT messages as part of their company's Standard Operating Procedures.
- More naunced status update for visitors without meeting QR code such as `WAIT_FOR_X_MINS`.

## Contact

Created by [@raysonkoh](https://www.raysonkoh.com/) - feel free to contact me!

# Issues:

## Graphs Page:
### 1. Implement directed graphs / figure out how to draw arrows in CSS (so bellman-ford can work on -ve wt edges)

## Sort Page:
### 1. Prevent user from sorting after the array is already sorted
### 2. Add functionality to change run speed
### 3. Implement QUICK-SELECT (Order statistic)

## Data Structures Page:
### 1. Implement HashMaps**
### 2. Implement Skiplists