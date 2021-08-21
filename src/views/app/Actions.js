export function query(method, url){
	const response = fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          }
        })
	return response
}



