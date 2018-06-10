export default function getPlayer(id) {
  return fetch(`http://localhost:5000/player/${id}`)
    .then(response => {
      return response.json()
    });
}