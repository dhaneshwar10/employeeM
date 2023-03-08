import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export const Employee=()=> {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId]=useState('')
    const[name,setName]=useState('')
    const[age,setAge]=useState('')
    const[Gender,setGender]=useState('')
    const[deptid,setDeptid]=useState('')
    
    const[emp,setEmp]=useState([])
    const [numEmps, setNumEmps] = useState(0);
    const classes = useStyles();

    const handleClick=(e)=>{
        e.preventDefault()
        const Employee={id,name,age,Gender,deptid}
        console.log(emp)
        fetch("http://localhost:8080/post",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(Employee)
        }).then(()=>{
            console.log("New Emp added");
            setNumEmps(numEmps +1);
          });
};

const handleUpdate = (id) => {
  const upEmployee =  prompt('Enter updated id:', Employee.id);
  const updatedname = prompt('Enter updated name:', Employee.name);
  const updatedage= prompt('Enter updated age', Employee.age);
  const updatedGender = prompt('Enter updated gender', Employee.Gender);
  const updateddeptid = prompt('Enter updated deptid', Employee.deptid);
  
  
  const updatedEmp = {
    id: upEmployee,
  name: updatedname,
    age:updatedage,
    Gender:updatedGender,
    deptid:updateddeptid
    
  };
  fetch('http://localhost:8080/update', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedEmp),
  })

  .then(() => {
    setNumEmps(numEmps +1);
  });
};

const handleDelete = (id) => {
  fetch(`http://localhost:8080/delete?id=${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      setNumEmps(numEmps +1);
    });
};





useEffect(()=>{
    fetch("http://localhost:8080/get")
    .then(res=>res.json())
    .then((result)=>{
      setEmp(result);
    }
  );
  },[numEmps]);
    return (
  
      <Container>
          <Paper elevation={3} style={paperStyle} >
              <h1 style={{color:"green"}}><u>Employee Management</u></h1>
  
      <form className={classes.root} noValidate autoComplete="off">

      <TextField id="outlined-basic" label="ID" variant="outlined" fullWidth 
        value={id}
        onChange={(e)=>setId(e.target.value)}
        />
      
        <TextField id="outlined-basic" label="NAME" variant="outlined" fullWidth 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <TextField id="outlined-basic" label="AGE" variant="outlined" fullWidth
        value={age}
        onChange={(e)=>setAge(e.target.value)}
        />
        <TextField id="outlined-basic" label="Gender" variant="outlined" fullWidth 
        value={Gender}
        onChange={(e)=>setGender(e.target.value)}
        />

        <TextField id="outlined-basic" label="DEPTID" variant="outlined" fullWidth 
        value={deptid}
        onChange={(e)=>setDeptid(e.target.value)}
        />
       
        <Button variant="contained" color="secondary" onClick={handleClick}>
    Submit
  </Button>
      </form>
     
      </Paper>
      <h1>Employees</h1>
  
      
  
        {emp.map((Employee)=>(
          <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={Employee.id}>
            <div className='output'>
            <div style={{ paddingRight: 50 }}>
           Id:{Employee.id}<br/>
           Name:{Employee.name}<br/>
           Age:{Employee.age}<br/>
          Gender:{Employee.Gender}<br/>
          Deptid:{Employee.deptid}<br/>
    
           
           </div>
           <div>
            <Button variant="contained" color='secondary' style={{marginTop: 25,marginLeft: 200 }} onClick={() =>handleDelete(Employee.id)}>
              Delete
            </Button>
            <br/>
            <Button
  variant="contained"
  color="secondary"
  style={{ marginTop: 25, marginLeft: 200 }}
  onClick={() => handleUpdate(Employee.id)}
>
  Update
</Button>
           </div>
  </div>
          </Paper>
        ))}
      
        </Container>
  )
}
  export default Employee