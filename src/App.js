import React,{useState,useEffect} from "react"

import axios from "axios"

function App() {
  const URL="https://jsonplaceholder.typicode.com/todos"
 
  const [task,setTask]=useState([])

  function readAPI(){
    axios.get(URL).then((response)=>{
      console.log(response.data)
      
      setTask(response.data);
    })
  }
  function createAPI(){
    axios.post(URL,{
      title:"API has been created"
    }).then((response)=>{
      console.log(response.data)
      setTask([...task,response.data])
    })

  }

  function updateAPI(id){
    axios.put(`${URL}/${id}`,{
      title:"The API has been updated"
    }).then((response)=>{
      setTask(task.map((item)=>{
        
        if(item.id===id){
          item=response.data        
        }
        return item
      }))
      
    })
  }

  function delAPI(id){
    axios.delete(`${URL}/${id}`).then((response)=>{
     
      setTask(task.filter((item)=>item.id!==id)) 
    })
  }

  useEffect(()=>{
    readAPI()
  },[])
  return (
    <div className="App">
    <h1>To-Do List</h1>
      <button onClick={createAPI}>Create</button>
      <div>
        {task.map((item)=>{return(
          <div>
          <p>{item.title}</p>
          <button onClick={()=>updateAPI(item.id)}>update</button>
          <button onClick={()=>delAPI(item.id)}>delete</button>
          </div>
        )})}
      </div>
    </div>
  );
}

export default App;
