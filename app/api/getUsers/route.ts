// import { Client } from 'pg';

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   username: string;
//   password: string;
//   country: string;
//   age: number;
//   points: number;
// }

// export async function GET(req: Request): Promise<Response> {
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//   });

//   try {
//     await client.connect();


//     const result = await client.query('SELECT * FROM trivia_users');

//     return new Response(JSON.stringify(result.rows), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: 'Database query failed' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } finally {
//     await client.end();
//   }
// }


