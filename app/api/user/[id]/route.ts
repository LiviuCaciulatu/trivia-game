import { NextRequest, NextResponse } from 'next/server';  // Ensure you're using Next.js types for request/response
import { Client } from 'pg';

// The GET handler with the correct typing and awaiting of params
export async function GET(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const { id } = context.params;  // Destructure params directly, params are already available

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const query = `
      SELECT username, first_name, last_name, country, points, date_of_birth
      FROM trivia.users
      WHERE id = $1
    `;
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = result.rows[0];
    const currentDate = new Date();
    const birthDate = new Date(user.date_of_birth);
    const age = currentDate.getFullYear() - birthDate.getFullYear() -
                (currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);

    return NextResponse.json({
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      country: user.country,
      points: user.points,
      age: age,
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user details' }, { status: 500 });
  } finally {
    await client.end();
  }
}
