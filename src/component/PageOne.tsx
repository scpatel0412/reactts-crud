import React,{useState} from 'react'
// import {useDispatch,useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {Row,Form,Button,FormGroup,Label,Input} from "reactstrap"
import axios from 'axios';

const PageOne = () => {
    const history:any =useNavigate()
    const [data1, setdata1] = useState<any>({email:"",password:""})
    const [error,setError] = useState<string>("")
    const [res1,setRes1] = useState<object>({})
    const [error1,setError1] = useState<Array<any>>([])

    const HandleSubmit = (e:any) =>{
        e.preventDefault();
        if(data1.email === "" && data1.password ===""){
            setError("Please Fill Data")
        }else{
            axios.post(`http://localhost:8000/api/register-user`,data1)
            .then((res:any) => {
                setRes1(res.data)
                console.log("res==>",res1)
                if(res.data){
                    localStorage.setItem("id",res.data.result._id)
                    localStorage.setItem("email",res.data.result.email)
                    history("/home")
                }
            })
            .catch((err:any)=>{
                if(err.response.data){
                    console.log(err.response.data)
                    setError1(err.response.data)
                }
                else if(err.request.data){
                    console.log(err.request.data)
                }
                else{
                    console.log(err)
                }
            })
        }
    }
    return (
        <div className='container-fluid' style={{background:"#DDDFDF"}}>
         <Row>
          <div className='col-sm-9' style={{backgroundImage : `url(https://unsplash.com/photos/oR0uERTVyD0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fHx8MTY0NTAxNzkyMw&force=true)`,height:"100vh",width:"900px",backgroundRepeat:"no-repeat",backgroundSize:"1200px 800px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>

          </div>
          <div className='col-sm-3' style={{marginTop:"150px",marginLeft:"20px"}}>
          <h1 style={{fontSize:"30px"}}>Register</h1>
          <p style={{color:"red"}}>{error}</p>
          <div>{error1.map((i:any) => {
              return(
                  <div>
                      <p style={{color:"red"}}>{i.msg}</p>
                  </div>
              )
          })}</div>
            <Form onSubmit={HandleSubmit}>
                <FormGroup>
                <Label style={{fontSize:"20px"}}>Email</Label>
                <Input style={{padding:"15px"}} value={data1.email} onChange={(e) => setdata1({...data1,email:e.target.value})} type="text"  placeholder="Enter email" />
                </FormGroup>
                <FormGroup>
                <Label style={{fontSize:"20px"}}>Password</Label>
                <Input style={{padding:"15px"}}  value={data1.pass} onChange={(e) => setdata1({...data1,password:e.target.value})} type="password" placeholder="Enter password"   />
                </FormGroup>
                <Button type="submit" size="lg" style={{background:"#565656",border:"none",paddingLeft:"90px", paddingRight:"90px",marginTop:"30px"}}>Register</Button>
            </Form>
            <hr/>
            <Link to="/login" style={{paddingTop:"20px",textDecoration:"none"}}>Login!!!</Link>
          </div>
           
         </Row>
        </div>
    )
}

export default PageOne