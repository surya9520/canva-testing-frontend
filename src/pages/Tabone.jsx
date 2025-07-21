import React from 'react'
import { useEffect } from 'react'

const Tabone = () => {
    // useEffect(() => {
         window.addEventListener('storage', (event) => { 
        if(event.key==='tab') {
            alert(event.newValue)
            localStorage.removeItem('tab')
        }
    })
    // },[])
   
  return (
    <div>Tabone</div>
  )
}

export default Tabone