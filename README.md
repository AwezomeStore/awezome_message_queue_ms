# awezome_message_queue_ms
message queue microservice

El proyecto está compuesto:
  - producer.js: Conecta con el microservicio que producer las peticiones.
  - consumero.js: Conecta con o con los microservicios que consumen las peticiones.

Ejecutar el contenedor de RabbitMQ en un contenedor de docker por medio del siguiente comando:

```sh
docker run -d -p 15672:15672 -p 5672:5672 --name rabbitmq rabbitmq:3-management
```