<!-- ## **SETUP NEON DATABASE WITH PRISMA ORM**

![app_to_db_connection](./db.svg)

### Install dependencies

```
npm install prisma --save-dev
npm install @prisma/client dotenv
```

### Setup Prisma

```
npx prisma init --datasource-provider postgresql --output ../app/generated/prisma
```

### Add configurations

Import `dotenv/config` to prisma.config.ts file. Add database connection string to `.env` file.

### Sycn models, app with database

Before running cmd add tables schema to schema.prisma file.

```
npx prisma migrate dev --name init
``` -->

**CONNECT NEON DATABASE WITH NEXT APP WITH PRISMA**

![db_to_app_visual](./db.svg)

**Steps & Commands:**

1.  install prisma cli and client library

    ```ts
    // cmd commands
     npm install prisma --save-dev
     npm install @prisma/client dotenv
    ```

2.  initilize prisma to project

    ```ts
    // cmd commands
    npx prisma init --datasource-provider postgresql --output ../app/generated/prisma
    ```

3.  configure database tables schema

    ```ts
    // prisma/schema.prisma

    model User{
        // model schema
    }
    model Todo{
        // model schema
    }
    ```

4.  add DB connection string to `.env` file and import `dotenv/config` to `prisma.config.ts`

    ```ts
    // .env
    DATABASE_URL = "database_connection_string";

    // prisma.config.ts
    import "dotenv/config";

    // run migration (cmd)
    npx prisma migrate dev --name init
    ```

5.  adding custom lib function `prismaClientSingleton()` to avoid db connections exhusting (see src/lib/prisma.ts).
