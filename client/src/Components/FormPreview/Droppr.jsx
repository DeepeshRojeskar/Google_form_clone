import React,{useState} from 'react'
import './Drop.css'
const Droppr = ({onDrop}) => {
    const [showDrop,setShowDrop]=useState(false);

  return (
    <div className={showDrop?"pr-display-drop":'pr-Hide-drop'} 
    onDragEnter={()=>setShowDrop(true)}
    onDragLeave={()=>setShowDrop(false)}
    onDrop={()=>{onDrop();
        setShowDrop(false);
    }}
    onDragOver={e=>e.preventDefault()}
    
    >
        :Drop Here:
    </div>
  )
}

export default Droppr