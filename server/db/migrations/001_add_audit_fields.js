import pool from "../pool.js";

export async function up() {
  try {
    await pool.query(`
      ALTER TABLE subscribers
      ADD COLUMN IF NOT EXISTS business_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS business_location VARCHAR(255),
      ADD COLUMN IF NOT EXISTS service_type VARCHAR(100),
      ADD COLUMN IF NOT EXISTS research_status VARCHAR(50) DEFAULT 'pending',
      ADD COLUMN IF NOT EXISTS research_data JSONB,
      ADD COLUMN IF NOT EXISTS research_completed_at TIMESTAMP;
    `);
    console.log("✓ Migration 001 completed: Added audit fields to subscribers table");
  } catch (err) {
    console.error("Migration failed:", err.message);
    throw err;
  }
}

export async function down() {
  try {
    await pool.query(`
      ALTER TABLE subscribers
      DROP COLUMN IF EXISTS business_name,
      DROP COLUMN IF EXISTS business_location,
      DROP COLUMN IF EXISTS service_type,
      DROP COLUMN IF EXISTS research_status,
      DROP COLUMN IF EXISTS research_data,
      DROP COLUMN IF EXISTS research_completed_at;
    `);
    console.log("✓ Migration 001 rolled back");
  } catch (err) {
    console.error("Rollback failed:", err.message);
    throw err;
  }
}
