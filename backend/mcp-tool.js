import { db } from './db.js';

// Standard Model Context Protocol (MCP) Tool
export const logDoseStatusTool = {
  // 1. Tool definition for AI model
  definition: {
    name: 'logDoseStatus',
    description: 'Mark patient medication dose for today as taken or pending, and automatically deduct 1 unit from stock if taken.',
    inputSchema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['taken', 'pending'] }
      },
      required: ['status']
    }
  },

  // 2. Execution handler when AI invokes this tool
  async handler(args) {
    db.prepare("UPDATE intake_logs SET status = ? WHERE id = 'log_1'").run(args.status);
    if (args.status === 'taken') {
      db.prepare("UPDATE medicines SET stock = stock - 1 WHERE id = 'med_1'").run();
    }
    return { success: true, message: `AI updated dose status to: ${args.status}` };
  },
  
};
// Tool: Record blood pressure vitals
export const recordVitalsTool = {
  // 1. Tool definition for AI model
  definition: {
    name: 'recordVitals',
    description: 'Record patient blood pressure readings into the health tracking system.',
    inputSchema: {
      type: 'object',
      properties: {
        systolic: { 
          type: 'number', 
          description: 'Systolic blood pressure reading (e.g., 120, 130)' 
        },
        diastolic: { 
          type: 'number', 
          description: 'Diastolic blood pressure reading (e.g., 80, 85)' 
        }
      },
      required: ['systolic', 'diastolic'] // AI must extract both values
    }
  },

  // 2. Database execution handler
  async handler(args) {
    const { systolic, diastolic } = args;
    const now = new Date().toISOString();

    // Insert into database
    db.prepare(`
      INSERT INTO vitals (systolic, diastolic, created_at) 
      VALUES (?, ?, ?)
    `).run(systolic, diastolic, now);

    console.log(`[MCP Tool] Recorded new blood pressure: ${systolic}/${diastolic} mmHg`);
    
    // Return result to AI
    return {
      success: true,
      message: `Successfully recorded blood pressure ${systolic}/${diastolic} mmHg at ${now}.`
    };
  }
};