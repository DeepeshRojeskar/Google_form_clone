import React,{useState} from 'react'
import Dialog from '@mui/material/Dialog';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { TextField,MenuItem,Select,InputLabel,
    FormControl,Box,Button
    
 } from '@mui/material';

import './CreateForm.css'

const CreateTemplate = ({open,setopen}) => {
    const navigate=useNavigate();
    const handleClose=()=>setopen(false)
    const [category,setcategory]=useState();
    const handleChange=(e)=>{
        setcategory(e.target.value)
        
    }
  
  
    const [img,setImg]=useState('');
    const [name,setname]=useState('');
    const [decs,setDecs]=useState('');
    const handlecreate=()=>{
      var ID = nanoid();
      console.log(ID);
      navigate(`formEdit/${ID}`,{ state:{name,decs,Bg:img} })
    }


  return (
    <Dialog
    open={open}
    onClose={()=>{handleClose();}}>
    <div className='create-form-main'>

        <h4>Create new Form</h4>
        <TextField id="standard-basic" label="Form Name" variant="standard" value={name} onChange={(e)=>setname(e.target.value)} />
        <TextField id="standard-basic" label="Description" variant="standard" value={decs} onChange={(e)=>setDecs(e.target.value)}/>

        <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="category"
          onChange={(e)=>handleChange(e)}>

          <MenuItem value={'Marketing'}>Marketing</MenuItem>
          <MenuItem value={'Finance'}>Finance</MenuItem>
          <MenuItem value={'Studies'}>Studies</MenuItem>
        </Select>
        </FormControl>
      
        </Box>    
        {!img?<label for='inputImg' className='inputBgBtn'>Add BackGround</label>:<label className='bg-added'>Background is added</label>}
        <input type='file' id='inputImg' onChange={(e)=>{setImg(e.target.files[0])}} style={{display:'none'}}/>
        <Button className='Create-form-button' variant="contained" onClick={handlecreate}>Create</Button>


        
        
    </div>
    </Dialog>
  )
}

export default CreateTemplate