<p align="center">
  <img height="250" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/logo_white.png" />
</p>

<h1> Proyecto Final - RENT-TEN </h1>

<h2> Sobre este proyecto. </h2>

Este proyecto ha sido realizado como proyecto grupal para ser evaluado en el Bootcamp SoyHenry. 
Tiene la finalidad de ofrecerle al usuario la posibilidad de rentar alojamientos a su preferencia y a su vez poder publicar los suyos con la misma finalidad.

Está realizado en con un conjunto de diferentes tecnologías:

 - Angular
 - NGRX
 - Express
 - Sequelize - Postgres
 - NodeJS
 - Javascript (BackEnd)
 - Typescript (FrontEnd)
 
 Para la interface gráfica se utilizó:
 
 - Bootstrap
 - Material Design
 - CSS / SASS

<h2> Como funciona </h2>
<h2> BACK-END </h2>
En esta área lógica de nuestra página web, contamos con sus respectivas rutas y conexiones a la base de datos, trabajando para obtener los datos y poder renderizar los mismos hacia el frontEnd.

__Bookings__
- [ ] POST "/"
  - Donde se hace la reserva de nuestro alojamiento
- [ ] PUT "/checkstatus"
  - Verificamos el estado de dicha reserva

__Houses__
- [ ] GET "/", "/:id", "/order/:order"
  - Podemos traer todas las casas, por id u ordenadas por raiting y quality
- [ ] POST "/createhouse"
  - Creamos nuestro respectivo alojamiento y se aloja en la base de datos
- [ ] PUT "/edithouse/:id"
  - Se edita la propiedad "deleted" para que no se reenderize su visibilidad en el front-end

__Mercado pago__
- [ ] POST "/", "/payment" & "/subscription"
  - Obtenemos toda la data a traves de sus respectivos links desde payment y subscription


__Reviews__
- [ ] GET "/" & "/:id"
  - Obtenemos las reseñas hechas por un usuario (id)
- [ ] POST "/"
  - Dicho usuario puede postear su reseña
- [ ] DELETE "/"
  - Tambien puede borrar la misma

__Users__
- [ ] GET "/", "/allUsers", "/usersD", "/getuser" & "/verifymail/:mail"
  - Obtenemos la informacion del usuario a traves de varias rutas en especifico
- [ ] POST "/", "/addfavoritehouse" & "/requirecode/:mail"
  - Agrega los alojamientos favoritos. Require code pide el codigo para verificar la cuenta de usuario.
- [ ] PUT "/deletefavoritehouse" & "/deleteAccount/:userId"
  - Edita los alojamientos favoritos y el estado de la cuenta de usuario una vez que quiere borrar esta.

<h2> FRONT-END </h2>
En la cara visible del proyecto, contamos con rutas también, pero no todas visibles a todos los usuarios como invitados. Para poder visualizar todo, hara falta logguearse.

- __Log in__
<p align="center">
  <img height="500" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/login.png" />
</p>

- __Navegacion y Home__
<p align="center">
  <img height="250" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/home1.png" />
  <img height="250" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/home2.png" />
</p>

- __Favoritos__
<p align="center">
  <img height="500" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/favourites.png" />
</p>

- __Filtros y ordenamiento__
<p align="center">
  <img height="500" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/filters.png" />
</p>

- __Detalle de cada alojamiento__
<p align="center">
  <img height="500" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/detail.png" />
</p>

- __Reservas y reseñas__
<p align="center">
  <img height="250" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/reservas.png" />
  <img height="250" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/reviews.png" />
</p>

- __Perfil del usuario__
<p align="center">
  <img height="500" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/darkmode2.png" />
</p>

- __Formulario de creacion__
<p align="center">
  <img height="250" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/form1.png" />
  <img height="250" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/form2.png" />
</p>

- __Sobre el equipo__
<p align="center">
  <img height="500" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/about.png" />
</p>

- __Dashboard__
<p align="center">
  <img height="500" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/dashboard.png" />
</p>

- __Dark Mode__
<p align="center">
  <img height="250" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/darkmode.png" />
  <img height="250" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/darkmode2.png" />
</p>

- __Chatbot__
<p align="center">
  <img height="500" src="https://github.com/raulereno/rent-ten/blob/main/client/src/assets/readME/chatbot.png" />
</p>

<h2> Enviroment variables </h2>

- Enviroment:
```
DB_USER=
DB_NAME=rentten
DB_PASSWORD=
DB_HOST=
PORT=
```

- Node-mailer
```
EMAIL=
MAILPW=
```

- Mercado Pago
```
MERCADOPAGO_TOKEN=
```

<h2> DEPLOY </h2>
Para deploy del servidor y base de datos de la APP se usó __railway__:

 - __Ruta base__: 

Para el frontend se usó __vercel__:

 - __Ruta base__: https://rent-ten.vercel.app/home


