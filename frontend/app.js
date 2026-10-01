const medNameEl = document.getElementById('med-name');
const medStockEl = document.getElementById('med-stock');
const medStatusEl = document.getElementById('med-status');
const btnTake = document.getElementById('btn-take');

// 1. Fetch data from backend on page load
async function loadData() {
  const res = await fetch('http://localhost:3001/api/today');
  const data = await res.json();

  medNameEl.innerText = data.name;
  medStockEl.innerText = data.stock;

  if (data.status === 'taken') {
    medStatusEl.innerText = 'TAKEN';
    medStatusEl.className = 'status taken';
    btnTake.disabled = true; // Disable button if dose is already taken
    btnTake.innerText = '✓ COMPLETED';
  } else {
    medStatusEl.innerText = 'PENDING';
    medStatusEl.className = 'status pending';
    btnTake.disabled = false;
  }
}

// 2. Event listener for dose confirmation button
btnTake.addEventListener('click', async () => {
  btnTake.innerText = 'Recording...';
  
  // Send POST request to backend
  await fetch('http://localhost:3001/api/dose', { method: 'POST' });

  // Reload data to refresh UI and stock count
  await loadData();
});

// Fetch initial data on load
loadData();