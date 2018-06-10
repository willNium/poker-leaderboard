export default function getPlayers() {
  return fetch('http://localhost:5000/players')
    .then(response => {
      return response.json()
    });
}