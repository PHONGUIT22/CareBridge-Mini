import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import { logDoseStatusTool, recordVitalsTool } from './mcp-tool.js';
const app = express();
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json());

// API 1: Get today's medication dose info
app.get('/api/today', (req, res) => {
  const query = `
    SELECT l.id as logId, m.name, m.stock, l.status 
    FROM intake_logs l 
    JOIN medicines m ON l.medicine_id = m.id 
    LIMIT 1
  `;
  const data = db.prepare(query).get();
  res.json(data);
});

// API 2: Record medication taken
app.post('/api/dose', (req, res) => {
  // Update status to 'taken'
  db.prepare("UPDATE intake_logs SET status = 'taken' WHERE id = 'log_1'").run();
  // Deduct 1 unit from medicine stock
  db.prepare("UPDATE medicines SET stock = stock - 1 WHERE id = 'med_1'").run();

  console.log('[Server] Patient took medication! Deducted 1 unit from stock.');
  res.json({ success: true, message: 'Medication intake recorded successfully!' });
});
// API to record blood pressure vitals
app.post('/api/vitals', async (req, res) => {
  // Extract values sent by user (or AI): { systolic: 120, diastolic: 80 }
  const result = await recordVitalsTool.handler(req.body);
  res.json(result);
});
// Start server on port 3001
app.listen(3001, () => {
  console.log('🚀 Backend server is running at: http://localhost:3001');
});
