# Points of Interest

This project is a simple application which allows users to view and add points of interest directly from a map provided by OpenStreetMap.

## Prerequisites

Install Visual Studio Code - https://code.visualstudio.com/download
Install nodejs - https://nodejs.org/en/download/
Install MongoDB - https://www.mongodb.com/try/download/community

### Getting started

Open Visual Studio Code.
Clone this repository using the command - git clone https://github.com/CristinaConsta/PointOfInterests.git
Install the dependencies as displayed in package-json file. Run:

```
npm init -y
npm install
```

To import the initial data into the MongoDB database run:

```
node seeder.js
```

### Running and testing

Modify the localhost port if needed in .env file - by default is 3000.

Run
```
npm run dev
```
to start the application and then follow the link provided.


