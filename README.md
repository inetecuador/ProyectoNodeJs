Name: Verónica Sangucho
Description: This project was generated with NodeJs v22.1.0 as a simple implementation of a REST API for user management, protected with a JWT token using MongoDB as storage.

## Development server
1) Run `npm install` to install all of the required packages.

2) Run `npm run dev` for a dev server or `npm run start` for a production server

## Configuration

The .env file in the root folder contains all the parameterizable values for this project, it includes MongoDB connection string, express port, request limits, authentication timeout and encryption secret key.

## Implemented endpoints

1) AUTHENTICATION API
==================================================

Method:	POST
URL:	http://localhost:3000/api/auth/login
Autorization Header: No Auth
Sample body:
{
    "email":"admin@tipti.com",
    "contraseña": "tipti.2024"
}

Sample response:
{
    "status": 200,
    "message": "Login correcto.",
    "token": "eyJhbGciOi..."
}

Method:	POST
URL:	http://localhost:3000/api/auth/logout
Autorization Header:
	Type: Bearer Token
	Value:	token returned in login call
Sample response:
{
    "status": 200,
    "message": "Sesión finalizada."
}

2) USER CRUD API
==================================================
Method:	POST
URL:	http://localhost:3000/api/users
Autorization Header:
	Type: Bearer Token
	Value:	token returned in login call
Sample body:
{
  "nombre": "Jagger",
  "edad": 2,
  "email": "jagger@gmail.com",
  "contraseña": "miau.2024"
}
Sample response:
{
    "status": 200,
    "message": "Usuario almacenado.",
    "data": {
        "_id": "6643efeb6b08d85b77f57056",
        "nombre": "Jagger",
        "edad": 2,
        "email": "jagger@gmail.com",
        "contraseña": "$2b$10$glpCLYatS45FK6/C9kK6JOFtNdhqyx1X/UHYMLJ9NHOj3TOlkKu9u",
        "__v": 0
    }
}


Method:	GET
URL:	http://localhost:3000/api/users
Autorization Header:
	Type: Bearer Token
	Value:	token returned in login call
Sample response:
{
    "status": 200,
    "message": "Usuarios encontrados.",
    "data": [
        {
            "_id": "6643ac0eeedc5acabfdb40b0",
            "nombre": "administrador",
            "edad": 30,
            "email": "admin@tipti.com",
            "contraseña": "$2b$10$s9EYlLcmbCSaimyU21KIr.OW/MvEQY3/sLQVBqbDWRvM9MLPygFCS"
        },
        {
            "_id": "6643efeb6b08d85b77f57056",
            "nombre": "Jagger",
            "edad": 2,
            "email": "jagger@gmail.com",
            "contraseña": "$2b$10$glpCLYatS45FK6/C9kK6JOFtNdhqyx1X/UHYMLJ9NHOj3TOlkKu9u",
            "__v": 0
        }
    ]
}

Method:	GET
URL:	http://localhost:3000/api/users/{_id}
	{_id}:	A user _id

Sample request URL: http://localhost:3000/api/users/6643efeb6b08d85b77f57056

Autorization Header:
	Type: Bearer Token
	Value:	token returned in login call

Sample response:
{
    "status": 200,
    "message": "Información de usuario",
    "data": {
        "_id": "6643efeb6b08d85b77f57056",
        "nombre": "Jagger",
        "edad": 2,
        "email": "jagger@gmail.com",
        "contraseña": "$2b$10$glpCLYatS45FK6/C9kK6JOFtNdhqyx1X/UHYMLJ9NHOj3TOlkKu9u",
        "__v": 0
    }
}

Method:	PUT
URL:	http://localhost:3000/api/users/{_id}
	{_id}:	A user _id
Sample request URL: http://localhost:3000/api/users/6643efeb6b08d85b77f57056
Autorization Header:
	Type: Bearer Token
	Value:	token returned in login call
Sample body:
{
	"nombre": "Jagger",
	"edad": 2,
	"email": "jagger@gmail.com",
	"contraseña": "miaumiau.2024"
}

Sample response:
{
    "status": 200,
    "message": "Usuario actualizado."
}

Method:	DELETE
URL:	http://localhost:3000/api/users/{_id}
	{_id}:	A user _id
Sample request URL: http://localhost:3000/api/users/6643efeb6b08d85b77f57056
Autorization Header:
	Type: Bearer Token
	Value:	token returned in login call
Sample response:
{
    "status": 200,
    "message": "Usuario eliminado."
}

3) SESSION API
==================================================
Method:	GET
URL:	http://localhost:3000/api/session/currentuser
Autorization Header:
	Type: Bearer Token
	Value:	token returned in login call
Sample response:
{
    "status": 200,
    "message": "Usuario encontrado.",
    "data": {
        "_id": "6643ac0eeedc5acabfdb40b0",
        "nombre": "administrador",
        "edad": 30,
        "email": "admin@tipti.com",
        "contraseña": "$2b$10$s9EYlLcmbCSaimyU21KIr.OW/MvEQY3/sLQVBqbDWRvM9MLPygFCS"
    }
}
