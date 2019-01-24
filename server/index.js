import fastify from 'fastify';
import { Bot } from './bot';
import dotenv from 'dotenv';

dotenv.config();
const server = fastify();

server.post('/', (request, reply) => {
  try {
    const { body } = request;
    Bot(body);
    reply.send({ hello: 'world' })
  } catch (e) {
    console.log(e);
    reply.send({ hello: 'world' })
  }
});


try {
  const port = process.env.PORT || 8080;
  server.listen(port, '0.0.0.0', (err, address) => {
    console.log(`
    Server is at your service 
    ${address}
    ${port} should be listening
  `)
  });
} catch (err) {
  console.log(
    `ups`,
    err
  );
  process.exit(1)
}