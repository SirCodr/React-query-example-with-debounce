import React, { useRef, useState, useEffect } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import useDebounce from "./hooks/useDebounce"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
  )
}

const Example = () => {
  const inputRef = useRef()
  const [user, setUser] = useState('midudev')
  const userDebounced = useDebounce(user, 10000)

   const { isLoading, error, data } = useQuery(['repoData', userDebounced], () =>
     fetch(`https://api.github.com/users/${userDebounced}`).then(res =>
       res.json()
     )
   )
    
   if (error) return 'An error has occurred: ' + error.message
 
   return (
     <div>
      <input type="text" defaultValue={user} ref={inputRef} onKeyUp={(e)=>{setUser(e.target.value)}}/>
       {data && <div>
        <h1>{data.name}</h1>
       <p>{data.bio}</p>
       <strong>👀 {data.followers}</strong>{' '}</div>}
       {isLoading && 'Loading...'}
     </div>
   )
 }

export default App
