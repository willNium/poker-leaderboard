export default function postPlayer(player) {
  return fetch('http://localhost:5000/player',
    {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(player)
    })
}