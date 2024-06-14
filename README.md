## task - description
- Create an endpoint /api/files using the NodeJS (TypeScript), which should fetch data from the https://rest-test-eight.vercel.app/api/test endpoint and transform the result to meet the following form (example provided in mail). 
An important note is that the external endpoint returns a large dataset and has a delay of about ten seconds. In addition to data transformation, the end user should receive a response as quickly as possible. This means that it is necessary to create a mechanism that will ensure that the new /api/files endpoint does not have a significant delay in response time.
The code needs to be uploaded to the GitHub repository for review. Additionally, the application needs to function in a local environment for easier testing.

## task - implementation
- File index.ts contains server creation and import route.ts which contains defined endpoint which is used to bring data in requested form. Main logic in in getFiles.ts, where there is function for getting external API, and with that data function sortFiles is called, where data get requested form. Function sortFiles uses other functions as helpers.

## task - optimization
- Few ideas for optimization that could be implemented are:
  - With the start of server, external endpoint could be called and data sorting to requested form could be done, so when client enters endpoint /api/files to see sorted data, he can get quickly as they have already been sorted.
  - Create timer to call external endpoint after some period of time. Sort those data and store it in a file, return data form that file when user uses endpoint /api/files.

## run project
- To run project use command: npm start 

## test 
- The mentioned endpoint can be tested using postman: curl --location 'http://localhost:3000/api/files'
