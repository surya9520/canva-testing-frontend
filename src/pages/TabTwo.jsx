import React from 'react'
import { useEffect } from 'react'

const TabTwo = () => {
    useEffect(() => {
        localStorage.setItem("tab", "2")
        // newTab.close()
        window.open('', '_self', '');
window.close(); // sometimes works after this hack in old browsers

    }, [])
  return (
    <div>TabTwo</div>
  )
}

export default TabTwo