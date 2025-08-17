# product-service backend
<pre>
0) database
docker run --rm --name postgres \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=P@ssw0rd \
    -e POSTGRES_DB=postgres \
    -p 5432:5432 \
    postgres

1) new project
nest new product-service
✔ Which package manager would you ❤️ to use? npm

2) install
cd product-service
npm install

npm install @nestjs/typeorm pg
npm install @nestjs/config
npm install class-validator
npm install joi

3) resource
nest generate resource products
✔ What transport layer do you use? REST API
✔ Would you like to generate CRUD entry points? Yes

4) modify
main.ts
.env
app.module.ts

products/entities/product.entity.ts
products/dto/create-product.dto.ts

products/products.module.ts
products/products.service.ts
products/products.controller.ts

5)
npm run start

6)
http://localhost:3000/products
</pre>
