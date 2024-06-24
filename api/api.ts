export interface ApiReponse{
  message:string,
  obj:any
}

const makeRequest= <T>(method: RequestInit['method'], body:T) =>{
  
}

export const ApiV1=async <T>(url: string, method: RequestInit['method'], body?:T): Promise<ApiReponse> =>{
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')

  return await fetch(url, {
    method: method,
    headers: headers,
    body:JSON.stringify(body)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json() as Promise<ApiReponse>
    })
}