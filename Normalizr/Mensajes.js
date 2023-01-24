import util from "util";
import { normalize, schema } from "normalizr";

const mensajes = {
    id: 'Desafio-9-Incutto',
    mensajes: [
      {
        author: {
          email: 'incuttoezequiel858@gmail.com',
          nombre: 'ezequiel',
          apellido: 'Incutto',
          edad: '22',
          alias: 'Ezequiel',
          avatar: 'www.ezequiel.com'
        },
        fecha: '23/1/2023, 21:00:04',
        text: 'dsada',
        id: 0
      },
      {
        author: {
          email: 'incuttoezequiel858@gmail.com',
          nombre: 'ezequiel',
          apellido: 'Incutto',
          edad: '22',
          alias: 'Ezequiel',
          avatar: 'www.ezequiel.com'
        },
        fecha: '23/1/2023, 21:03:08',
        text: 'dsada',
        id: 1
      },
      {
        author: {
          email: 'incuttoezequiel858@gmail.com',
          nombre: 'ezequiel',
          apellido: 'Incutto',
          edad: '22',
          alias: 'Ezequiel',
          avatar: 'www.ezequiel.com'
        },
        fecha: '23/1/2023, 21:04:17',
        text: 'dsada',
        id: 2
      }
    ]
  }
  
  console.log(JSON.stringify(mensajes));
  
  function print(obj) {
    console.log(util.inspect(obj, false, 12, true));
  }
  
  // SCHEMAS
  
  const authorSchema = new schema.Entity("author",{},{idAttribute: 'email'});
  
  const messageSchema = new schema.Entity("mensaje", {
    author: authorSchema,
  });
  
  const messagesSchema = new schema.Entity("mensajes", {
    mensajes: [messageSchema],
  });
  
  const messagesNorm = normalize(mensajes, messagesSchema);
  print(messagesNorm);