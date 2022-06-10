import React, { useState,useEffect } from "react";
import axios from "axios";
const Cards=()=>{
    const [datas,setdatas]=useState([]);
    const[selectedItem,setselectedItem]=useState('');
    
    const handleSelected=(item)=>{
        setselectedItem(item)
    }
    const handleCompare=(ans)=>{
        if(ans === selectedItem )
        {
            alert("Correct")
        }
        else{
            alert("Wrong")
        }
    }
    useEffect(()=>{
        axios.get('http://localhost:5000/getQuestions').then((res)=>{
           setdatas(res.data)
       }).catch((err)=>{
           console.log(err)
         })
         console.log('Getting Data...')
   },[]) 
    return(
        <>
 {
    datas?.map((question)=>{
        return(<>
        <div className="card" style={{width: "18rem"}}>

  <div className="card-body">
    <h5 className="card-title">{question?.question}</h5>
   <p className="card-text">
    <div className="form-check" onClick={()=>handleSelected(question?.option1)}>
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={question?.option1}/>
  <label className="form-check-label" for="exampleRadios1">
    {question.option1}
  </label>
  </div>
   </p>
   <p className="card-text">
    <div className="form-check" onClick={()=>handleSelected(question?.option2)}>
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={question?.option2}/>
  <label className="form-check-label" for="exampleRadios1">
    {question.option2}
  </label>
  </div>
   </p>
   <p className="card-text">
    <div className="form-check" onClick={()=>handleSelected(question?.option3)}>
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={question?.option3}/>
  <label className="form-check-label" for="exampleRadios1">
    {question.option3}
  </label>
  </div>
   </p>
   <a href="#" className="btn btn-primary" onClick={()=>handleCompare(question?.answer)}>Next</a>

  </div>
</div>

 </> )
    })
 }
</>
)
}


export default Cards;