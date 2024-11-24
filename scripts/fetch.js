async function asyncFetch(
    endpoint = undefined,
    method = undefined,
    headers = undefined,
    body = undefined,
) {
    let response = await fetch(endpoint, {
        "method": method,
        "headers": headers,
        "body": body,
    });

    if (response.ok) {
        let json = await response.json();
        return json;
    }
}