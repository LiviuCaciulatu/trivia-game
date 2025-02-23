import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const client = new Client({ connectionString: process.env.SUPABASE_DB_URL });

  const userId = req.headers.get('user-id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    await client.connect();

    const query = `
      SELECT id, username, points, country
      FROM users
      ORDER BY points DESC
      LIMIT 10
    `;
    const result = await client.query(query);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'No users found' }, { status: 404 });
    }

    const topUsers = result.rows.map((user, index) => ({
      position: index + 1,
      id: user.id,
      username: user.username,
      points: user.points,
      country: user.country,
    }));

    const loggedInUser = topUsers.find(user => user.id === userId);

    return NextResponse.json(
      {
        topUsers,
        loggedInUserPosition: loggedInUser ? loggedInUser.position : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database error while fetching top users:', error);
    return NextResponse.json({ error: 'Failed to fetch top users' }, { status: 500 });
  } finally {
    await client.end();
  }
}
