# CareBridge Mini 💊🩺

CareBridge Mini is a lightweight healthcare and medication adherence tracking system designed to assist elderly patients and their caregivers. It features a straightforward user interface, a lightweight Express/SQLite backend, and built-in **Model Context Protocol (MCP)** tool integration for AI health assistants.

---

## 🌟 Features

- **Medication Adherence Tracking**: View scheduled medication for today with clear visual status (`PENDING` / `TAKEN`).
- **One-Click Dose Confirmation**: Patients can easily confirm that they have taken their medicine, automatically updating stock count.
- **Vitals Monitoring**: Record and track blood pressure readings (systolic / diastolic).
- **Model Context Protocol (MCP) Ready**: Built-in tool definitions and handlers allowing AI assistants to inspect medication status, log doses, and record vitals via natural conversation.

---

## 🏗️ Project Structure

```text
carebridge-mini/
├── backend/
│   ├── db.js             # SQLite database initialization and schema setup
│   ├── mcp-tool.js       # Model Context Protocol (MCP) tool definitions & handlers
│   ├── server.js         # Express REST API server
│   ├── package.json      # Dependencies and scripts
│   └── package-lock.json
├── frontend/
│   ├── index.html        # Clean, accessible UI for elderly users
│   └── app.js            # Frontend logic and API integration
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema

The backend uses SQLite (`better-sqlite3`) with three core tables:

1. **`medicines`**:
   - `id` (TEXT, PK): Unique medicine ID (e.g., `'med_1'`).
   - `name` (TEXT): Name of the medicine (e.g., `'Amlodipine 5mg (Blood Pressure)'`).
   - `stock` (INTEGER): Number of pills remaining in stock.

2. **`intake_logs`**:
   - `id` (TEXT, PK): Unique dose log ID (e.g., `'log_1'`).
   - `medicine_id` (TEXT): Foreign key referencing `medicines.id`.
   - `status` (TEXT): Dose status (`'pending'` or `'taken'`).

3. **`vitals`**:
   - `id` (INTEGER, PK AUTOINCREMENT): Unique vital record ID.
   - `systolic` (INTEGER): Systolic blood pressure (mmHg).
   - `diastolic` (INTEGER): Diastolic blood pressure (mmHg).
   - `created_at` (TEXT): ISO timestamp when the measurement was taken.

---

## 🔌 API Specification

### 1. Get Today's Medication
- **Endpoint**: `GET /api/today`
- **Description**: Returns today's medication dose, current intake status, and available stock.
- **Response**:
  ```json
  {
    "logId": "log_1",
    "name": "Amlodipine 5mg (Blood Pressure)",
    "stock": 30,
    "status": "pending"
  }
  ```

### 2. Confirm Medication Intake
- **Endpoint**: `POST /api/dose`
- **Description**: Marks the medication status as `'taken'` and decreases the medicine stock by 1.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Medication intake recorded successfully!"
  }
  ```

### 3. Record Blood Pressure
- **Endpoint**: `POST /api/vitals`
- **Description**: Records systolic and diastolic blood pressure readings.
- **Body**:
  ```json
  {
    "systolic": 120,
    "diastolic": 80
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Successfully recorded blood pressure 120/80 mmHg at 2026-10-01T12:00:00.000Z."
  }
  ```

---

## 🤖 Model Context Protocol (MCP) Tools

CareBridge Mini includes standard tool definitions located in `backend/mcp-tool.js`:

- **`logDoseStatus`**:
  - Updates the medication dose status (`'taken'` or `'pending'`) and updates inventory accordingly.
- **`recordVitals`**:
  - Extracts and logs `systolic` and `diastolic` readings into the health tracking database.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm

### 1. Setup Backend
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
```
The server will start at `http://localhost:3001`.

### 2. Run Frontend
Open `frontend/index.html` in your web browser, or serve it using an HTTP server:
```bash
# Example using npx serve or Live Server:
cd frontend
npx serve .
```
Open your browser and navigate to the displayed URL (or simply double-click `frontend/index.html`).

---

## 📄 License
ISC
