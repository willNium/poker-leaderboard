export default function postPayout(playerId, amount) {
  return fetch('http://localhost:5000/payout',
    {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        amount: amount,
        playerId: playerId
      })
    })
}