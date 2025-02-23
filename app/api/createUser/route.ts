import { Client } from 'pg';
import bcrypt from 'bcryptjs'; // Import bcryptjs

interface CreateUserRequest {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  country: string;
  points: number;
  date_of_birth: string;
}

interface PgError extends Error {
  code?: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { first_name, last_name, username, password, country, points, date_of_birth }: CreateUserRequest = await req.json();

    // Hash the password before inserting it into the database
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    const query = `
    INSERT INTO users (first_name, last_name, username, password, country, points, date_of_birth)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;
  
    const values = [first_name, last_name, username, hashedPassword, country, points, date_of_birth];

    const result = await client.query(query, values);

    await client.end();

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error during user creation:', error);

    if (error instanceof Error && 'code' in error && (error as PgError).code === '23505') {
      return new Response(
        JSON.stringify({ error: 'User already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Failed to create user' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
