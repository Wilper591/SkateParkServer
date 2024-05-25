# SkateParkServer
 - Servidor Express, consume DB postgreSQL con dependencia PG.

## APP:
<a href="https://wilper591.github.io/SkateParkClient/">Link</a>

## Cliente:
<a href="https://github.com/Wilper591/SkateParkClient">Link</a>

### INSTRUCCIONES:
 - Para ejecutar en localhost, modifica las credenciales del archivo "db.js" ubicado en la ruta /skateparkserver/src.
 - Puedes usar los siguientes comandos para crear la base de datos.

CREATE DATABASE skatepark;

CREATE TABLE skaters (
	id serial4 NOT NULL,
	email varchar(50) NOT NULL,
	nombre varchar(50) NOT NULL,
	"password" varchar(25) NOT NULL,
	anos_experiencia int4 NOT NULL,
	especialidad varchar(50) NOT NULL,
	foto varchar(255) NOT NULL,
	estado bool NOT NULL,
	CONSTRAINT skaters_pkey PRIMARY KEY (id),
	CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE administradores (
	id serial4 NOT NULL,
	email varchar(50) NOT NULL,
	"password" varchar(25) NOT NULL,
	CONSTRAINT administradores_email_key UNIQUE (email),
	CONSTRAINT administradores_pkey PRIMARY KEY (id)
);
 - Una vez creadas las tablas puedes realizar un registro de un Skater a traves del enlace "Registrarme" ubicado en el index.html o ingresando directo a la ruta del resgistro.html.
 - Debes rellenar el formulario con todos sus datos. Si intentas registrar un correo nuevamente podras ver un error 500 en el servidor ya que la tabla skaters tiene un clausula UNIQUE en su columna email.
 - Para poder acceder a la vista de administrador debes crear un usuario en la tabla administradores

INSERT INTO administradores(email, password) VALUES('admin@admin', 'admin') RETURNING *;

 - Una vez creado el registro puedes acceder a la vista admin ingresando a traves del enlace en la vista login.html, "¿Eres Administrador?", allí podras iniciar sesión y podras aceptar a los skaters que se hayan inscrito.

 - Tanto la vista admin.html como datos.html, cuentan con un boton de salir que eliminan las credenciales guardadas en tu navegador y te llevan al login nuevamente.

 - Si te vas a la vista index.html veras los usuarios registrados con el respectivo estado que es otorgado por el admin al marcar o desmarcar el checkbox.
