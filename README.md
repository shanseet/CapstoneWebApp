# Dashboard - Dance Dance
MERN web app for NUS Computer Engineering Capstone project. <br/>
This is a locally hosted web app, with a remotely hosted database on MongoDB Atlas.

## About
This app is one of 6 different parts to the CEG Capstone project.<br/>
Each group was tasked with building a wearable device for dancers in a dance group. This device must be able to identify their executed dance move, the positions of the dancers relative to each other, and calculate the timing delay between the execution of moves between multiple dancers. This was implemented using Arduino Beetles communicating over BLE to users' laptops. Data is then sent over MQTT to an FPGA board sitting in a remote location which runs the data through a ML model and identifies the dance move. Finally, the result is sent over MQTT to this dashboard that users have opened to obtain real-time feedback.

## Backend server
`npm run server` starts the backend server on `localhost:4000` with `nodemon` installed. <br/>
Alternatively, `node server.js` runs backend server, requiring manual refreshes.

## Frontend server
In the client folder, `npm start` starts react development server on `localhost:3000`.

## Credits
The frontend of this app is built on React, using React Bootstrap, Recharts and Datepicker libraries.

The backend of this app is built using Node, Express and mongoose.