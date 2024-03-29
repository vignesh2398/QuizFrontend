import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { url } from '../App';
export const CreateQuestion = () => {
  let navigate = useNavigate();
  let auth = async()=>{
      let token = sessionStorage.getItem('token');
      if(token)
      {
          let res = await axios.get(`${url}/users/verify-token/${token}`)
          if(res.data.statusCode===401)
          {
              sessionStorage.clear();
              navigate('/Login')

          }
      }
      else{
        navigate('/Login')
      }
  }

  useEffect(()=>{
auth()
},[])
const logout=async()=>{
  sessionStorage.clear();
  navigate('/')

}

    const [question,setQuestion]=useState({
        question:'',
        option1:'',
        option2:'',
        option3:'',
        answer:''
    })
    const handleChange=(e)=>
    {
     const name= e.target.name;
     const value= e.target.value;
        
        setQuestion((prevState)=>({
            ...prevState,
            [name]:value
        
        }))
    }

    const handleCreate=async()=>{
      auth()
      const createData=await axios.post('https://quizapivignesh.herokuapp.com/CreateQuestion',question).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
      if(!createData){
        alert('Data Created !!')
        setQuestion({
          question:'',
          option1:'',
          option2:'',
          option3:'',
          answer:''  
      })
      }
      

    }

  return (
      <>
   <div className='container col-md-4 mx-auto mt-5'>

  <div className="form-group">
  
    <input type="email" className="form-control" id="question" name="question" value={question.question} onChange={handleChange} placeholder="Enter Question"/>
    
  </div>
  <div className="form-group">
    <input type="text" className="form-control" id="option1" name="option1" value={question.option1} onChange={handleChange} placeholder="Enter option1"/>
  </div>
  <div className="form-group">
    <input type="text" className="form-control" id="option2" name="option2" value={question.option2} onChange={handleChange} placeholder="Enter option2"/>
  </div>
  <div className="form-group">
    <input type="text" className="form-control" id="option3" name="option3" value={question.option3} onChange={handleChange} placeholder="Enter option3"/>
  </div>
  <div className="form-group">
    <input type="text" className="form-control" id="answer" name="answer" value={question.answer} onChange={handleChange} placeholder="answer"/>
  </div>
  
  
  <button type="submit" className="btn btn-primary" onClick={handleCreate}>Create</button>
  <button type="button" onClick={logout} className="btn btn-primary">Go to Quiz</button>

   </div>
   
      </>
  )
}
