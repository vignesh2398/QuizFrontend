
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { useNavigate } from 'react-router-dom'

const EditQuestion=()=>{
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
/*    let navigate = useNavigate();
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
    } */

    const [selected,setselected]=useState([]);
    const[counter,setcounter]=useState([]);
    const [datas,setdatas]=useState([]);
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
    const handleUpdate=async(id)=>{
        auth()
        console.log(id)
        const inUpdated=await axios.put(`https://quizapivignesh.herokuapp.com/updateQuestion/${id}`,question).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
        if(!inUpdated){
            alert('updated')
            setcounter(counter+1);
        }

    }


    const handleSelected=async(questionid)=>{
        auth()
        setselected(questionid._id)
        console.log(questionid)
        
            setQuestion({
                question:questionid.question,
                option1:questionid.option1,
                option2:questionid.option2,
                option3:questionid.option3,
                answer:questionid.answer
            })
            setselected(questionid._id);
    
    }
    const handleDelete=async(questionid)=>{
        auth()
        setselected(questionid)
        console.log(selected)
        const delete1=await axios.delete(`https://quizapivignesh.herokuapp.com/deleteQuestion/${questionid}`).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
        if(!delete1)
        {
            alert("Deleted")
            setcounter(counter+1);
        }
    
    }
    const logout=async()=>{
        sessionStorage.clear();
        navigate('/')

    }



    useEffect(()=>{
         axios.get('https://quizapivignesh.herokuapp.com/getQuestions').then((res)=>{
            setdatas(res.data)
        }).catch((err)=>{
            console.log(err)
          })
          console.log('Getting Data...')
    },[counter])

    /// loign autho
   

return(

    <>
    
    <div className="container d-flex mt-5">
    <div className="col-md-6">
        <ul className="list-group">
        {
            datas?.map((item)=>{
                return(  
                    <>
                    <li className="list-group-item">{item.question}

                    <a className='btn btn-primary btn btn-primary col px-md-5'  onClick={()=>handleSelected(item)}>Edit</a>
                  <button type="submit" className="btn btn-danger col px-md-5 " onClick={()=>handleDelete(item._id)}>Delete</button>
                    </li>
                    
                    </>
                )
            })
        }
</ul>
    </div>
    <div className="col-md-6">

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
<button type="submit" className="btn btn-success" onClick={()=>handleUpdate(selected)}>Update</button>
</div>

 </div>
</div>
 </div>
 <div>

 <button type="button" onClick={logout} className="btn btn-primary">Go to Quiz</button>
 </div>
    </>
)
};

export default EditQuestion;