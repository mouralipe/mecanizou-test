export async function getProducts() {
  const response = await fetch('/data/products.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}
