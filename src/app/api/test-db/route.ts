import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    return NextResponse.json({
      success: true,
      time: result[0].current_time,
      message: 'Successfully connected to Neon Postgres!'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}