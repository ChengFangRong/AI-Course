/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://AI-Course-Generator_owner:npg_vzTC42YRPjqD@ep-rough-fire-a131p0l0-pooler.ap-southeast-1.aws.neon.tech/AI-Course-Generator?sslmode=require',
  }
};





// export default {
//     schema: "./configs/schema.jsx",
//     dialect: 'postgresql',
//     dbCredentials: {
//         url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
//     },


// import { defineConfig } from "drizzle-kit";
// // import "dotenv/config"; // so you can use environment variables

// export default defineConfig({
//   dialect: "postgresql",
//   schema: "./configs/schema.jsx",
//   out: "./drizzle",
//   dbCredentials: {
//     url : process.env.NEXT_PUBLIC_DB_CONNECTION_STRING, // this pulls from your .env.local
//   },
// });

// import { drizzle } from 'drizzle-orm/node-postgres';
// // You can specify any property from the node-postgres connection options
// export const db = drizzle({ 
//   connection: { 
//     connectionString: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
//     ssl: true
//   }
// });
