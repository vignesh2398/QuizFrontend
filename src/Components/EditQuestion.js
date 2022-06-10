
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const EditQuestion=()=>{
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
        const inUpdated=await axios.put(`http://localhost:5000/updateQuestion/${id}`,question).then((res)=>{
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
        setselected(questionid)
        console.log(selected)
        await axios.get(`http://localhost:5000/getQuestion/${questionid}`).then((res)=>{
            setQuestion({
                question:res.data.question,
                option1:res.data.option1,
                option2:res.data.option2,
                option3:res.data.option3,
                answer:res.data.answer,
            })
            setselected(questionid);
        }).catch((err)=>{
            console.log(err)
        })
    
    }
    const handleDelete=async(questionid)=>{
        setselected(questionid)
        console.log(selected)
        const delete1=await axios.delete(`http://localhost:5000/deleteQuestion/${questionid}`).then((res)=>{
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



    useEffect(()=>{
         axios.get('http://localhost:5000/getQuestions').then((res)=>{
            setdatas(res.data)
        }).catch((err)=>{
            console.log(err)
          })
          console.log('Getting Data...')
    },[counter])
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

                    <a className='btn btn-outline-warning'  onClick={()=>handleSelected(item._id)}>Edit</a>
                  <button type="submit" className="btn btn-primary" onClick={()=>handleDelete(item._id)}>Delete</button>
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
<button type="submit" className="btn btn-primary" onClick={()=>handleUpdate(selected)}>Update</button>
</div>

 </div>
</div>
 </div>
    </>
)
};

export default EditQuestion;