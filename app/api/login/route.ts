import { Client } from 'pg';
import bcrypt from 'bcryptjs';

interface LoginRequest {
  username: string;
  password: string;
}

export async function POST(req: Request): Promise<Response> {
  const { username, password }: LoginRequest = await req.json();

  console.log('Received password:', password);


  const client = new Client({
    connectionString: process.env.SUPABASE_DB_URL,
  });

  try {
    await client.connect();

    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await client.query(query, [username]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
    }

    return new Response(JSON.stringify({
      message: 'Login successful',
      user: { id: user.id, username: user.username }
    }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
  } finally {
    await client.end();
  }
}
