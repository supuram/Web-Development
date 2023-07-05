/* Write a function that takes an array of URLs and returns a promise that resolves with an array of the HTTP 
responses for each URL. Handle any errors that occur during the process. */

async function fetchUrls(urls) {
    const responses = await Promise.all(
      urls.map(url => fetch(url).catch(error => error))
    );
    return responses;
}

/**
This function takes an array of URLs as an argument and returns a promise that resolves with an array of the 
HTTP responses for each URL. The Promise.all method is used to wait for all the promises returned by the fetch 
calls to resolve before returning the array of responses. Any errors that occur during the process are caught 
and returned in the array of responses.
*/