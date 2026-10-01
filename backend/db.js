import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const db = new Database(path.join(__dirname, 'carebridgemini-db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS medicines (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    stock INTEGER DEFAULT 30
  );

  CREATE TABLE IF NOT EXISTS intake_logs (
    id TEXT PRIMARY KEY,
    medicine_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending'
  );
`);
// Table to store blood pressure readings
db.exec(`
  CREATE TABLE IF NOT EXISTS vitals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    systolic INTEGER,  -- Systolic blood pressure (top number, e.g., 120)
    diastolic INTEGER, -- Diastolic blood pressure (bottom number, e.g., 80)
    created_at TEXT
  );
`);
const checkMed = db.prepare('SELECT COUNT(*) as count FROM medicines').get();
if(checkMed.count === 0) {
     db.prepare("INSERT INTO medicines VALUES ('med_1', 'Amlodipine 5mg (Blood Pressure)', 30)").run();
  // Seed default intake log: Pending ('pending')
     db.prepare("INSERT INTO intake_logs VALUES ('log_1', 'med_1', 'pending')").run();
     console.log('[DB] Sample data initialized successfully!');
}