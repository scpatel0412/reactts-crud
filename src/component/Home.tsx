import React, { useEffect, useState } from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import {Form,FormGroup,Input,Label,Button} from "reactstrap"


interface data2 {
        task_title:string;
        set_id:string | null;
        task_description:string;
        date_time:string;   
}
interface HomeProps {
    state:{
        id:string;
        emailone:string
    }
}

function Home() {
  let history:any = useNavigate()
  let location:any = useLocation()
  var a:HomeProps = location
  const [data1, setdata1] = useState<data2>({task_title:"",set_id:a.state.id,task_description:"",date_time:""})
  const [data2, setdata2] = useState<Array<any>>([])
  const [error, seterror] = useState<string>("") 
  const [toggle,setToggle] = useState<boolean>(false)
  const [updateId, setUpdateId] = useState("")
  const [search,setsearch] = useState<string>("")
  var c:string;
  var d:any[]

  useEffect(() => {
    axios.get(`http://localhost:8000/api/task`)
    .then((res:any) => {
        setdata2(res.data)
    })
    .catch((err:any) => {
        console.log("error ======>",err)
    })      
  }, [])
  

  const onLogout = () => {
        if(window.confirm(`Are you sure want to logout`)){
        localStorage.clear();
        history("/")}
    }
    const onUpdate = (data:any) => {
        console.log("data ===>",data)
        setdata1({task_title:data.task_title,set_id:a.state.id,task_description:data.task_description,date_time:data.date_time})
        setToggle(true)
        c = data._id 
        setUpdateId(c)    
    }
    const HandelSubmit = (e:any) => {
        e.preventDefault()
        if(data1.task_title === "",data1.task_description === "",data1.date_time ===""){
            seterror("Please Fill All Data")
        }
        else{
            if(toggle === true){
                if(window.confirm(`Are you sure you want to update this task`)){
                    console.log("////",updateId)
                axios.put(`http://localhost:8000/api/task/${updateId}`,data1)
                .then((res:any) =>{
                    console.log("res.data",res.data)
                    setToggle(false)
                    setdata1({task_title:"",set_id:a.state.id,task_description:"",date_time:""})

                }) 
                setTimeout(() => {
                    axios.get(`http://localhost:8000/api/task`)
                    .then((res:any) => {
                        setdata2(res.data)
                    })
                    .catch((err:any) => {
                        console.log("error ======>",err)
                    })  
                }, 1000);  
            }
            }
            else{
        console.log(data1)
        // let fd = new FormData()
        // fd.append("task_title",data1.title)
        // fd.append("task_description",data1.description)
        // fd.append("date_time",data1.time)
        // console.log("fd==>",fd)
        axios.post(`http://localhost:8000/api/task`,data1)
        .then((res:any) =>{
            console.log("res.data",res.data)
            setdata1({task_title:"",set_id:a.state.id,task_description:"",date_time:""})
        }) 
        setTimeout(() => {
            axios.get(`http://localhost:8000/api/task`)
            .then((res:any) => {
                setdata2(res.data)
            })
            .catch((err:any) => {
                console.log("error ======>",err)
            })  
        }, 1000);
    }
    }
    }
    const onDelete = (id:any) => {
        if(window.confirm("Are you sure you want to delete this task")){
            axios.delete(`http://localhost:8000/api/task/${id}`)
            .then((res:any) => {
                console.log("delete item",res.data)
            })
            setTimeout(() => {
                axios.get(`http://localhost:8000/api/task`)
                .then((res:any) => {
                    setdata2(res.data)
                })
                .catch((err:any) => {
                    console.log("error ======>",err)
                })  
            }, 1000);
        }
    }
   d =data2.filter((i) => {return i.set_id == a.state.id} ) 
    return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-light" style={{background:"#47B5DB"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home" >Daily Task</Link>
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a onClick={onLogout}  className="nav-link" style={{background:"none",border:"none",padding:"none",cursor:'pointer'}}>Logout</a>
      </div>
    </div>
  </div>
</nav>
    <div className="container">
        <div className="row" style={{justifyContent:"center"}}>
            
        <div className='col-sm-3' style={{alignItems:"center",padding:"10px"}} >
            
                <input className='form-control' type="text" placeholder="Enter title name to search" value={search}  onChange={(e:any) => setsearch(e.target.value)}/>
            
        </div>
      
        </div>
        
        
        <div className="row" style={{padding:"20px"}}>
            <div className='col-sm-8'>
             Welcome {a.state.emailone}
            </div>
            <div className="col-sm-4">
            
                <button type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                    Form
                </button>


                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Form</h5>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Form onSubmit={HandelSubmit}>
                            <div>
                            {error !== "" ? 
                               <div className="alert alert-danger" role="alert">
                                    This is a danger alert—check it out!
                                </div>
                            :null}
                            
                            </div>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input type="text" placeholder='Please Enter Title' value={data1.task_title} onChange={(e) => setdata1({...data1,task_title:e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input type="textarea" rows={10} placeholder='Please Enter Title' value={data1.task_description} onChange={(e) => setdata1({...data1,task_description:e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Date</Label>
                                <Input type="datetime-local" placeholder='Please Enter Title' value={data1.date_time} onChange={(e) => setdata1({...data1,date_time:e.target.value})} />
                            </FormGroup>
                            <Button type="submit" className="btn btn-primary">Submit</Button>
                        </Form>
                    </div>
                    
                    </div>
                </div>
                </div>

            </div>
        </div>
        <div className='row'>
            <div className='col-sm-12' style={{paddingTop:"50px"}}>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Time</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {d.filter((e:any) => {
                        if(search === ""){
                            return e
                        }
                        else if(e.task_title.toLowerCase().includes(search.toLowerCase())){
                            return e
                        }
                        else if(e.task_title.toUpperCase().includes(search.toUpperCase())){
                            return e
                        }
                        
                        }).map((i:any) => {
                        var b = new Date(i.createdAt)
                        var c = b.getDay()+"-"+b.getMonth()+"-"+b.getFullYear()+"   "+b.getHours()+":"+b.getMinutes()+":"+b.getSeconds()
                        return(
                            <tr key={i._id}>
                            <td>{i._id}</td>
                            <td>{i.task_title}</td>
                            <td>{i.task_description}</td>
                            <td>{c}</td>
                            <td><button onClick={() =>onUpdate(i)}  type="button" className="btn btn-warning"><i className="fa-solid fa-pen-to-square"></i></button></td>
                            <td><button onClick={() => onDelete(i._id)} type="button" className="btn btn-danger"><i className="fa-solid fa-ban"></i></button></td>
                        </tr>
                        )
                    })}
                   
                </tbody>
            </table>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Home