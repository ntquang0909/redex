# order-service backend
<pre>
0) database
docker run --rm --name postgres \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=P@ssw0rd \
    -e POSTGRES_DB=postgres \
    -p 5432:5432 \
    postgres

1) new project
nest new order-service
✔ Which package manager would you ❤️ to use? npm

2) install
cd order-service
npm install

npm install @nestjs/typeorm pg
npm install @nestjs/config
npm install class-validator
npm install joi
npm install @nestjs/axios

3) resource
nest generate resource orders
✔ What transport layer do you use? REST API
✔ Would you like to generate CRUD entry points? Yes

4) modify
main.ts
.env
app.module.ts

orders/entities/order.entity.ts
orders/dto/create-order.dto.ts

orders/orders.module.ts
orders/orders.service.ts
orders/orders.controller.ts

5)
npm run start

6)
http://localhost:3001/orders
</pre>
