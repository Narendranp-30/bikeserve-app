******************************************************************Installable Packages:***************************************************************************
For Backend:
bikeserve/backend
├── bcryptjs@2.4.3
├── cors@2.8.5
├── dotenv@8.2.0
├── express@4.17.1
├── jsonwebtoken@8.5.1
├── mongoose@5.11.15
├── nodemailer@6.4.18
└── nodemon@2.0.7


For Frontend path:
bikeserve/
├── @babel/core@7.12.10
├── @babel/preset-env@7.12.11
├── @babel/preset-react@7.12.10
├── axios@0.21.1
├── babel-loader@8.2.2
├── eslint-plugin-react@7.22.0
├── eslint@7.19.0
├── react-dom@17.0.1
├── react-router-dom@5.2.0
├── react@17.0.1
├── webpack-cli@4.5.0
├── webpack-dev-server@3.11.2
└── webpack@5.21.2

***********************************************************************Project Overview************************************************************************

- **Project Description**: A bike service application for a service station that includes service management functionality integrated into both frontend and backend systems.
- **Frontend**: Built with React.
- **Backend**: Built with Node.js, Express, and MongoDB.
- **Key Requirements**:
  1. Prevent duplicate keys in the database when adding services.
  2. Use different pages for updating and displaying the service list to avoid conflicts.
  3. Implement a system where owners in different districts have default login credentials.
  4. Implement a dropdown in `serviceForm.js` for selecting cities and service centers, with unique identifiers for each center.
  5. Send selected service center details along with the login request and retrieve the service list based on the service center after login.
  6. Configure mailing to owners based on the selected owner in the service form.

#### Key Components and Structure
- **Frontend Directory Structure**:
  ```

  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── services/
  │   ├── App.jsx
  │   ├── index.js
  │   ├── routes.js
  ├── package.json
  ├── .env
  ├── .gitignore
  ```

- **Components**:
  - `Header.js`, `ServiceList.js`, `ServiceForm.js`, , `BookingDetails.js`
  - Pages: `Home.js`, `Login.js`, `Register.js`, `Dashboard.js`, `Services.js
  - Services: `authService.js`, `bookingService.js`, `serviceService.js`
  - `App.jsx`, `index.js`

#### Functionalities
1. **Login and Authentication**:
   - Frontend login page (`Login.js`) with form handling.
   - Backend authentication endpoint (`auth/login`).

2. **Service Management**:
   - Add and fetch services with no duplicate keys.
   - Display and update service lists on different pages to avoid conflicts.

3. **Owner Management**:
   - Default login credentials for owners.
   - Dashboard for owners to select the city and service center.

4. **Mailing System**:
   - Nodemailer configured for sending emails to owners based on service form selection.

***********************************************************************Database Schemas***************************************************************************

1.Users Collection:
Stores information about the users (owners and customers).

{
  "_id": "ObjectId",
  "email": "String",
  "password": "String",
  "role": "String",  // "owner" or "customer"
  "serviceCenter": "ObjectId"  // Reference to the ServiceCenter
}
|------Sample data for user
[
  {
    "_id": "64a7f27c45a2f4d3e6f1d15b",
    "email": "erode1@service.com",
    "password": "$2b$10$EixZ0hM/Q.fEjDSYWFSOYO3JvYK4Zvlh/QjBkjk0/uY6c1G6jYBeK",  // Hashed password
    "role": "owner",
    "serviceCenter": "64a7f27c45a2f4d3e6f1d162"
  },
  {
    "_id": "64a7f27c45a2f4d3e6f1d15c",
    "email": "erode2@service.com",
    "password": "$2b$10$EixZ0hM/Q.fEjDSYWFSOYO3JvYK4Zvlh/QjBkjk0/uY6c1G6jYBeK",  // Hashed password
    "role": "owner",
    "serviceCenter": "64a7f27c45a2f4d3e6f1d163"
  },
  {
    "_id": "64a7f27c45a2f4d3e6f1d15d",
    "email": "prasabth@gmail.com",
    "password": "$2b$10$EixZ0hM/Q.fEjDSYWFSOYO3JvYK4Zvlh/QjBkjk0/uY6c1G6jYBeK",  // Hashed password
    "role": "customer",
    "serviceCenter": null
  }
]

2.Services Collection:
Stores details of the services provided.
{
  "_id": "ObjectId",
  "name": "String",
  "serviceType": "String",
  "bikeType": "String",
  "description": "String",
  "price": "Number",
  "serviceCenter": "ObjectId"  // Reference to the ServiceCenter
}

|------Sample data for services
[
  {
    "_id": "64a7f27c45a2f4d3e6f1d165",
    "name": "Narendra",
    "serviceType": "Water wash",
    "bikeType": "Sport",
    "description": "Basic exterior wash for sport bikes.",
    "price": 20.0,
    "serviceCenter": "64a7f27c45a2f4d3e6f1d162"
  },
  {
    "_id": "64a7f27c45a2f4d3e6f1d166",
    "name": "Prasanth",
    "serviceType": "Oil change",
    "bikeType": "Cruiser",
    "description": "Perform oil change only",
    "price": 50.0,
    "serviceCenter": "64a7f27c45a2f4d3e6f1d163"
  }
]


3.ServiceCenters Collection:
Stores information about different service centers.

{
  "_id": "ObjectId",
  "name": "String",
  "city": "String",
  "address": "String"
}

|------Sample data

[
  {
    "_id": "64a7f27c45a2f4d3e6f1d162",
    "name": "Erode1 Bike Service Center",
    "city": "Erode",
    "address": "1234 Bike Lane, NY"
  },
  {
    "_id": "64a7f27c45a2f4d3e6f1d163",
    "name": "Erode2 Bike Service Center",
    "city": "Erode",
    "address": "5678 Wheel Street, CA"
  }
]



