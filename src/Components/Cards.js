import React, { useState,useEffect } from "react";
import axios from "axios";
const Cards=()=>{
    const [datas,setdatas]=useState([]);
    const[selectedItem,setselectedItem]=useState('');
    const [index,setindex]=useState(0);
    const [point,setpoint]=useState(0);
    const handleSelected=(item)=>{
        setselectedItem(item)
    }
    const handleCompare=(ans)=>{
      console.log("selected",selectedItem)
      if(selectedItem){

        if(ans === selectedItem  )
        {
            alert("Answer submited")
            setindex(index+1)
            console.log(index)
            setpoint(point+1)
            setselectedItem('')

        }
        else{
            alert("Answer submited")
            setindex(index+1)
            setselectedItem('')
        }
      }
      else{
        alert("please select answer")
      }
    }

    const tryagain=()=>{
      setpoint(0)
      setindex(0)
    }
    useEffect(()=>{
        axios.get('https://quizapivignesh.herokuapp.com/getQuestions').then((res)=>{
           setdatas(res.data)
       }).catch((err)=>{
           console.log(err)
         })
         console.log('Getting Data...Card')
   },[]) 
   console.log("value",datas[index])
    return(
      <>
<div className="col-md-4 mx-auto mt-5" style={{marginTop:'18%'}}>
 {

   datas[index] ?<>
        <div className="card" style={{width: "18rem"}}>

  <div className="card-body text-left ">
    <h5 className="card-title ">{index+1}{"."}{datas[index]?.question}</h5>
   <p className="card-text ">
    <div className="form-check" onClick={()=>handleSelected(datas[index]?.option1)}>
      <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={datas[index]?.option1}/>
  <label className="form-check-label text-xl-start" for="exampleRadios1">
    {datas[index].option1}
  </label>
  </div>
   </p>
   <p className="card-text">
    <div className="form-check" onClick={()=>handleSelected(datas[index]?.option2)}>
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={datas[index]?.option2}/>
  <label className="form-check-label" for="exampleRadios1">
    {datas[index].option2}
  </label>
  </div>
   </p>
   <p className="card-text">
    <div className="form-check" onClick={()=>handleSelected(datas[index]?.option3)}>
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={datas[index]?.option3}/>
  <label className="form-check-label" for="exampleRadios1">
    {datas[index].option3}
  </label>
  </div>
   </p>
   <a href="#" className="btn btn-primary" onClick={()=>handleCompare(datas[index]?.answer)}>Submit</a>

  </div>
   
</div>

  
 </>:
 <div>

 <p className="text-success">Congo</p>
 <p className="text-success">Your score is:{point}</p>
 <a href="#" className="btn btn-primary" onClick={tryagain}>Try again</a>
 
 </div>
 }

 </div>
</>
)
}

export default Cards;

