import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const query = `
      SELECT
        c.id AS country_id,
        c.country_code,
        c.country_en,
        c.country_ro,
        c.capital_en,
        c.capital_ro,
        c.flag,
        c.map,
        f.fun_fact_en,
        f.fun_fact_ro,
        n.neighbour_code,
        n_country.country_en AS neighbour_name
      FROM
        trivia.countries c
      LEFT JOIN
        trivia.fun_facts f ON c.country_code = f.country_code
      LEFT JOIN
        trivia.neighbours n ON c.country_code = n.country_code
      LEFT JOIN
        trivia.countries n_country ON n.neighbour_code = n_country.country_code
      ORDER BY
        c.country_code;
    `;
    const result = await client.query(query);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'No countries found' }, { status: 404 });
    }

    const countriesMap: Record<string, any> = {};

    result.rows.forEach(row => {
      const { country_code, country_en, country_ro, capital_en, capital_ro, flag, map, fun_fact_en, fun_fact_ro, neighbour_name } = row;

      if (!countriesMap[country_code]) {
        countriesMap[country_code] = {
          id: row.country_id,
          countryCode: country_code,
          countryEn: country_en,
          countryRo: country_ro,
          capitalEn: capital_en,
          capitalRo: capital_ro,
          flag: flag,
          map: map,
          funFactEn: fun_fact_en,
          funFactRo: fun_fact_ro,
          neighbours: []
        };
      }
      if (neighbour_name && !countriesMap[country_code].neighbours.includes(neighbour_name)) {
        countriesMap[country_code].neighbours.push(neighbour_name);
      }
    });

    const countries = Object.values(countriesMap);

    console.log(countries);

    return NextResponse.json(countries, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch countries data' }, { status: 500 });
  } finally {
    await client.end();
  }
}
