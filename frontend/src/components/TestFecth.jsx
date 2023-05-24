import React, {useEffect, useEffect} from 'react'
import axois from 'axios'


function TestFecth() {

    const [data, setData] = useState('')


    // BYT UT TILL VÅR ROUTES
    useEffect(() => {
        axois.get('https://avancera.app/cities')
        .then(response => {
            setData(response.data)
        })
        .catch(error =>{
            console.error(error)
        })
     }, [])
  return (
    <div>
        <ul>
            {data.map(item =>{
                <li key={item.id}>{item.name}</li>
            })}
        </ul>
    </div>
  )
}

export default TestFecth
