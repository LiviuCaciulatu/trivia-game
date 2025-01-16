import { Client } from 'pg';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(req: Request, context: Context): Promise<Response> {
  const { id } = await context.params;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const query = `
      SELECT id, username, first_name, last_name, country, points, date_of_birth
      FROM trivia.users
      WHERE id = $1
    `;
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const user = result.rows[0];
    const currentDate = new Date();
    const birthDate = new Date(user.date_of_birth);
    const age = currentDate.getFullYear() - birthDate.getFullYear() - 
                (currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);

    return new Response(JSON.stringify({
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      country: user.country,
      points: user.points,
      age: age,
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user details' }), { status: 500 });
  } finally {
    await client.end();
  }
}