import { Client } from 'pg';

interface CreateUserRequest {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  country: string;
  age: number;
  points: number;
}

export async function POST(req: Request): Promise<Response> {
  try {

    const { first_name, last_name, username, password, country, age, points }: CreateUserRequest = await req.json();


    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();


    const query = `
    INSERT INTO trivia.users (first_name, last_name, username, password, country, age, points)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;
  
    const values = [first_name, last_name, username, password, country, age, points];

    const result = await client.query(query, values);

    await client.end();

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error during user creation:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create user' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
