import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id            SERIAL PRIMARY KEY,
        name          VARCHAR(255) NOT NULL,
        email         VARCHAR(255) NOT NULL UNIQUE,
        source        VARCHAR(100) DEFAULT 'crm-setup-checklist',
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        contacted     BOOLEAN DEFAULT false,
        contacted_at  TIMESTAMP,
        sequence_step INTEGER DEFAULT 0,
        next_email_at TIMESTAMP
      )
    `);

    await pool.query(`
      ALTER TABLE subscribers
        ADD COLUMN IF NOT EXISTS sequence_step INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS next_email_at TIMESTAMP,
        ADD COLUMN IF NOT EXISTS business_name VARCHAR(255),
        ADD COLUMN IF NOT EXISTS business_location VARCHAR(255),
        ADD COLUMN IF NOT EXISTS service_type VARCHAR(100),
        ADD COLUMN IF NOT EXISTS research_status VARCHAR(50) DEFAULT 'pending',
        ADD COLUMN IF NOT EXISTS research_data JSONB,
        ADD COLUMN IF NOT EXISTS research_completed_at TIMESTAMP
    `);

    console.log("Database initialized — subscribers table ready.");
  } catch (err) {
    console.error("Database initialization failed:", err.message);
  }
};

initDb();

export default pool;
