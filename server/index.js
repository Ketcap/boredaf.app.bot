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
  server.listen(8000);
  console.log(`
      Server is at your service 
    `)
} catch (err) {
  console.log(
    `ups`,
    err
  );
  process.exit(1)
}