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
    const res = await fetch('https://greeting.jelastic.metropolia.fi/graphql', opts);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const saveGreeting = async (message) => {
  const query = {
    query: `
      {
        mutation VariableTest($username: String!, $greeting: String!) {
          addGreeting(username: $username, greeting: $greeting) {
            username
            greeting
            time
          }
        }
      }
    `,
    variables: message,
  };
  const data = await fetchGraphql(query);
  return data.addGreeting;
};

const getGreetingsByUser = async (user) => {
  const query = {
    query: `
      {
        greetingsByUser(username: "${user}") {
          id
          username
          greeting
          time
        }
      }
    `,
  };
  const data = await fetchGraphql(query);
  return data.greetingsByUser;
};
