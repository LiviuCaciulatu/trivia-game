import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  const userId = pathname.split('/').pop();

  if (!userId || isNaN(Number(userId))) {
    return NextResponse.json({ error: 'Invalid or missing User ID' }, { status: 400 });
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });

  try {
    await client.connect();

    const query = `
      SELECT id, username, first_name, last_name, country, points, date_of_birth
      FROM trivia.users
      WHERE id = $1
    `;
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = result.rows[0];
    const currentDate = new Date();
    const birthDate = new Date(user.date_of_birth);
    const age =
      currentDate.getFullYear() -
      birthDate.getFullYear() -
      (currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);

    return NextResponse.json(
      {
        id: user.id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        country: user.country,
        points: user.points,
        age: age,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Database error while fetching user ${userId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch user details' }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  const userId = pathname.split('/').pop();

  if (!userId || isNaN(Number(userId))) {
    return NextResponse.json({ error: 'Invalid or missing User ID' }, { status: 400 });
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });

  try {
    await client.connect();

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (typeof body.points !== 'number') {
      return NextResponse.json({ error: 'Points value must be a number' }, { status: 400 });
    }

    const fetchQuery = `SELECT id, username, first_name, last_name, country, points, date_of_birth FROM trivia.users WHERE id = $1`;
    const fetchResult = await client.query(fetchQuery, [userId]);

    if (fetchResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = fetchResult.rows[0];
    const currentDate = new Date();
    const birthDate = new Date(user.date_of_birth);
    const age =
      currentDate.getFullYear() -
      birthDate.getFullYear() -
      (currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);

    const updateQuery = `UPDATE trivia.users SET points = $1 WHERE id = $2 RETURNING *`;
    const updateResult = await client.query(updateQuery, [body.points, userId]);

    console.log(`User ${userId} points updated to:`, updateResult.rows[0].points);

    return NextResponse.json({
      id: updateResult.rows[0].id,
      username: updateResult.rows[0].username,
      firstName: updateResult.rows[0].first_name,
      lastName: updateResult.rows[0].last_name,
      country: updateResult.rows[0].country,
      points: updateResult.rows[0].points,
      age: age,
    }, { status: 200 });

  } catch (error) {
    console.error(`Database update error for user ${userId}:`, error);
    return NextResponse.json({ error: 'Failed to update points' }, { status: 500 });
  } finally {
    await client.end();
  }
}