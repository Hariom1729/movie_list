
const userId = localStorage.getItem("userId") || prompt("Enter your name:");
const API = 'https://movie-list-a0tx.onrender.com/movies';

localStorage.setItem("userId", userId);
const res = await fetch(`${API}/movies/${userId}`);

async function fetchMovies() {
    const res = await fetch(`${API}/movies/${userId}`);
    const movies = await res.json();
    const list = document.getElementById('movieList');
    list.innerHTML = '';
    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = `${movie.title} (${movie.genre}, Rating: ${movie.rating})`;
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.onclick = () => deleteMovie(movie.title);
        li.appendChild(btn);
        list.appendChild(li);
    });
}

async function addMovie() {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = document.getElementById('rating').value;
    await fetch(`${API}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, genre, rating, userId })
    });
    fetchMovies();
}

async function deleteMovie(title) {
    await fetch(`${API}/${title}`, { method: 'DELETE' });
    fetchMovies();
}

fetchMovies();


const toggleBtn = document.getElementById('toggleTheme');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    toggleBtn.textContent = '☀️ Light Mode';
  } else {
    toggleBtn.textContent = '🌙 Dark Mode';
  }
});