//import { SqlContenedor } from "./Handlers/Contenedor.js";
//import { optionsSql, optionsSqlite } from "./dbCnf/Confi.js";
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { getProducts } from "./Mocks/products.js";
import Contenedor from "./Handlers/Contenedortx.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
//import sessionFileStore from "session-file-store"
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

// NORMALIZR
import util from "util";
function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

//// COOKIE PARSER
app.use(cookieParser("DcsqTJaA4K1f2xvH"));

////MONGO
const MongoAdvancedOptions = { useNewUrlParser: true, useUnifiedTopology: true};
//const FileStore = sessionFileStore(session);
//store: new FileStore({path:"./sessions", ttl: 600, retries:0}),
//DcsqTJaA4K1f2xvH
//// EXPRESS SESSION
app.use(session({

  //store: new FileStore({path:"./sessions", ttl: 600, retries:0}),
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://EzeDss:DcsqTJaA4K1f2xvH@cluster0.wz853zr.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions: MongoAdvancedOptions,
    ttl: 600
  }),

  secret: "DcsqTJaA4K1f2xvH",
  resave: false,
  saveUninitialized: false,
}));
////

//PLANTILLAS
app.set("view engine", "ejs");

//DB
//const productosContenedor = new SqlContenedor(optionsSql, "Productos");
const productosContenedor =new Contenedor("productos.txt");
const mensajesContenedor = new Contenedor("mensajes.txt");
//const mensajesContenedor = new SqlContenedor(optionsSqlite, "Mensajes");

//GET
app.get("/productos", async (req, res) => {
  try {
    const productos = await productosContenedor.getAll();
    res.render("index", {
      pageTitle: "Desafio 07 - DB",
      productos: productos,
    });
  } catch (error) {
    console.log(error);
  }
});

//GET PRODUCTOS-TEST (FAKER)
app.get("/productos-test", async (req, res) => {
  try {
    req.query.user? req.session.user = req.query.user : null
    if(req.query.user) {
      const productos = getProducts(5);
      res.render("index", {
        pageTitle: "Desafio 09 - Faker/Normalizacion",
        productos: productos,
        user: req.query.user,
    });
    }
    else
    {
      console.log("paso")
      res.render("login", {
        pageTitle:"Desafio 10 - Login",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
///LOGOUT
app.get("/logout",(req, res) => {
  const lastUser = req.session.user;
  req.session.destroy( err => {
    err? console.log(err) : null
  })
  res.render("logout", {
    pageTitle: "Desafio 10 - Logout",
    user: lastUser
  });
})

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");
  const productos = getProducts(5);
  const mensajes = await mensajesContenedor.getAllNormalized();
  print(mensajes);
  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

    socket.on("nuevoProducto", async (data) => {
      io.sockets.emit("productos", getProducts(productos.length++));
    });

    socket.on("nuevoMensaje", async (data) => {
      await mensajesContenedor.save(data);
      //console.log(data);
      io.sockets.emit("mensajes", await mensajesContenedor.getAllNormalized());
    });

})

const PORT = 8080;
httpServer.listen(PORT, () => console.log("Escuchando en puerto " + PORT));