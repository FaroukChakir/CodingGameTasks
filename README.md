
# CodingGame .Net 8 / Angular and Sql

This application serve to create, Update and delete Tasks using .Net core web api and Angular.


## Remarks !

##### .Net
---
###### - program.cs : 
update the cors to correspond you frontend in my case it was :
http://localhost:4200
###### - appsettings.json:
update the connection String.

## Run Locally

Clone the project

```bash
  git clone https://github.com/FaroukChakir/CodingGameTasks.git
```

## Visual Studio (Backend)
#### .Net
---
#### Create your first migration

```bash
  Add-Migration InitialCreate
```

#### Create your database and schema

```bash
  Update-Database
```
then run your application.

## Visual Cose (Frontend)
#### Angular
---
go to the frontend directry and generate environnement files
```bash
  ng generate environments
```
-add this variable in both environment.developmenet.ts and environment.ts:

export const environment = {
    apiUrl:"https://(Application Url)/api"
};

and use your backend Url.
for this project and in case its local and Https use : "localhost:7112"

#### Create your database and schema
Run :
```bash
  npm start
```
Or :
```bash
  ng serve
```

