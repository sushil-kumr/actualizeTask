
import './App.css';
import React, {useState,useEffect} from 'react'

const dropDownData = [
  {
    id:1,
    name:"Kilometer",
    calculation:1
  },{
    id:2,
    name:"Meter",
    calculation:1000
  },{
    id:3,
    name:"Centimeter",
    calculation:100000
  }
]

function App() {
  const [text,setText] = useState("")
  const [result,setResult] = useState("")
  const [dropdown,setDropdown] = useState(1)
  const [resultDropdown,setResultDropdown] = useState(2)
  const [isError,setIsError] = useState(false)

  const onTextChange = (e) =>{
    setIsError(false);
    if(isNaN(e.target.value))
      setIsError(true);
    else{
      setText(e.target.value)
    }
  }

  useEffect(()=>{
    calculationProblem();
  },[text,dropdown,resultDropdown])

  const calculationProblem = () =>{
    if(!text){
      return;
    }
    const firstDropdownItem = [...dropDownData].find(item=>dropdown===item.id)
    const resultDropdownItem = [...dropDownData].find(item=>resultDropdown===item.id)
    if(firstDropdownItem.id < resultDropdownItem.id){
      setResult((parseFloat(text) * firstDropdownItem.calculation) * resultDropdownItem.calculation)
    }else if(firstDropdownItem.id > resultDropdownItem.id){
      setResult((parseFloat(text) * resultDropdownItem.calculation) / firstDropdownItem.calculation)
    }else{
      setResult(text)
    }
  }

  return (
    <div className="App">
      <table>
        <tbody>
            <tr>
              <td>
              <input type="text" value={text} onChange={onTextChange} style={{width:"100px"}}/>
              </td>
              <td>
                <span style={{marginLeft:"1px",width:"100px" ,color:isError?"red":"black"}}> {isError?"Only Number allowed!":result}</span>
              </td>
            </tr>
            <tr>
              <td>
                <select style={{width:"100px"}} onChange={(e) => setDropdown(parseInt(e.target.value))} defaultValue={dropdown}>
                  {dropDownData.map(item=><option key={item.id} value ={item.id}>{item.name}</option>)}
                </select>
            </td>
            <td>
                <select style={{width:"100px"}} onChange={(e) => setResultDropdown(parseInt(e.target.value))} defaultValue={resultDropdown}>
                  {dropDownData.map(item=><option key={item.id} value ={item.id}>{item.name}</option>)}
                </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
