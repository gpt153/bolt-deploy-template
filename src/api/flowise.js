export async function query(data) {
  const response = await fetch(
    "http://localhost:3000/api/v1/prediction/421dabab-9b52-40ee-8497-07c1be1f837b",
    {
      headers: {
        Authorization: "Bearer Hlej74TiWv5PCl9KsCN-mwEHOizBJDeKZpBoKJEXWzo",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    }
  );
  return response.json();
}
