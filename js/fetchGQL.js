const fetchGraphql = async (query) => {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(query),
  };

  try {
  } catch (err) {
    console.error(err);
  }
};
