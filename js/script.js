// FLATPICKR DATE
flatpickr("#date", {
  dateFormat: "d/m/Y",
  altInput: false,
  altFormat: "d M Y",
});

// VALIDASI FORM TODO
const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todo");
const dateInput = document.getElementById("date");
const tableBody = document.querySelector("table tbody");
const filterBtn = document.querySelector(".filter");
const deleteAllBtn = document.querySelector(".delete");

let no = 1;

function checkEmptyTable() {
  if (tableBody.children.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.classList.add("empty-row");
    emptyRow.innerHTML = `<td colspan="5">No tasks found</td>`;
    tableBody.appendChild(emptyRow);
  }
}

// Tambah task
addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  const date = dateInput.value.trim();

  if (task === "" || date === "") {
    alert("Please fill in all fields!");
    return;
  }

  const emptyRow = document.querySelector(".empty-row");
  if (emptyRow) emptyRow.remove();

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${no++}</td>
    <td>${task}</td>
    <td>${date}</td>
    <td class="status">Process...</td>
    <td>
      <button class="action-btn complete"><i class="fa-solid fa-check fa-lg"></i></button>
      <button class="action-btn delete"><i class="fa-solid fa-trash-can fa-lg"></i></button>
    </td>
  `;

  // Complete
  row.querySelector(".complete").addEventListener("click", () => {
    const statusCell = row.cells[3];
    statusCell.textContent = "Completed";
    statusCell.classList.add("completed");
    row.querySelector(".complete").remove();
  });

  // Delete
  row.querySelector(".delete").addEventListener("click", () => {
    row.remove();
    if (tableBody.children.length === 0) {
      checkEmptyTable();
      no = 1;
    }
  });

  tableBody.appendChild(row);

  todoInput.value = "";
  dateInput.value = "";
});

// FILTER & DELETE
const filterSelect = document.getElementById("filterStatus");
const deleteAll = document.getElementById("deleteAll");

// Filter
function filterTasks() {
  const selected = filterSelect.value;
  const rows = tableBody.querySelectorAll("tr:not(.empty-row)");

  let visibleCount = 0;

  rows.forEach((row) => {
    const statusCell = row.cells[3].textContent.trim().toLowerCase();

    if (selected === "all" || (selected === "process" && statusCell === "process...") || (selected === "completed" && statusCell === "completed")) {
      row.style.display = "";
      visibleCount++;
    } else {
      row.style.display = "none";
    }
  });

  // Kalau tidak ada yang tampil, munculkan "No tasks found"
  document.querySelector(".empty-row")?.remove();
  if (visibleCount === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.classList.add("empty-row");
    emptyRow.innerHTML = `<td colspan="5">No tasks found</td>`;
    tableBody.appendChild(emptyRow);
  }
}

filterSelect.addEventListener("change", filterTasks);

// Delete
deleteAll.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete?")) {
    tableBody.innerHTML = "";
    checkEmptyTable();
    no = 1;
  }
});
