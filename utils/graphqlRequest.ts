export async function graphqlRequest(url:string, apiKey: string, query: string, variables?: Record<string, any>) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `ApiKey ${apiKey}`,
      },
      body: JSON.stringify({ query, variables }),
    });
  
    if (!response.ok) throw new Error("Network error: " + response.statusText); //TODO: handle error
  
    const { data, errors } = await response.json();
    if (errors) throw new Error(errors.map((e: any) => e.message).join(", "));
  
    return data;
  }