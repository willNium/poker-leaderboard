
export default function getPayouts() {
  return fetch('http://localhost:5000/payouts')
    .then(response => {
      return response.json()
    });
}
