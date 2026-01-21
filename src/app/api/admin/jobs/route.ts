export async function POST(request: Request) {
  const user = await currentUser();

  if (!user || (user.publicMetadata.role !== 'admin' && user.publicMetadata.role !== 'support')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await request.json();
  const {
    title,
    department,
    location,
    type,
    description,
    responsibilities,
    requirements,
    salary_range,
  } = body;

  if (!title || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Split comma or newline-separated strings into arrays
  const respArray = responsibilities
    ? responsibilities.split(/[\n,]+/).map((s: string) => s.trim()).filter((s: string) => s.length > 0)
    : null;

  const reqArray = requirements
    ? requirements.split(/[\n,]+/).map((s: string) => s.trim()).filter((s: string) => s.length > 0)
    : null;

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      INSERT INTO jobs (
        title, department, location, type, description,
        responsibilities, requirements, salary_range, status
      ) VALUES (
        ${title}, ${department || null}, ${location || 'Remote'},
        ${type || 'Full-time'}, ${description},
        ${respArray ? sql`ARRAY[${respArray}]` : null},
        ${reqArray ? sql`ARRAY[${reqArray}]` : null},
        ${salary_range || null}, 'open'
      )
    `;

    return NextResponse.json({ success: true, message: 'Job posted!' });
  } catch (error) {
    console.error('Job creation error:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}