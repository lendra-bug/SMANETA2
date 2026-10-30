// Mengambil elemen HTML
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const statusBadge = document.getElementById('status-badge');

// Memuat data dari LocalStorage saat web pertama dibuka
let notes = JSON.parse(localStorage.getItem('offline_notes')) || [];

// Fungsi untuk menampilkan catatan ke layar
function renderNotes() {
    todoList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${note}</span>
            <button class="delete-btn" onclick="deleteNote(${index})">Hapus</button>
        `;
        todoList.appendChild(li);
    });
}

// Fungsi untuk menambah catatan baru
function addNote() {
    const text = todoInput.value.trim();
    if (text !== '') {
        notes.push(text);
        localStorage.setItem('offline_notes', JSON.stringify(notes));
        renderNotes();
        todoInput.value = '';
    }
}

// Fungsi untuk menghapus catatan
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('offline_notes', JSON.stringify(notes));
    renderNotes();
}

// Event Listener tombol tambah dan tombol Enter
addBtn.addEventListener('click', addNote);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNote();
});

// Fitur Pendeteksi Status Internet (Online/Offline) secara Real-time
function updateOnlineStatus() {
    if (navigator.onLine) {
        statusBadge.textContent = "Online";
        statusBadge.className = "badge online";
    } else {
        statusBadge.textContent = "Offline (Mode Lokal)";
        statusBadge.className = "badge offline";
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Jalankan fungsi saat web pertama kali dimuat
renderNotes();
updateOnlineStatus();
