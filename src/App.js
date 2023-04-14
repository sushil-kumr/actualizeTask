
import './App.css';
import React, {useState,useEffect} from 'react'

// this JSON for all option data with calculation value, calculation value used for common the calculation at end
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
  const [text,setText] = useState("") // Input Text
  const [result,setResult] = useState("") // Result Text
  const [dropdown,setDropdown] = useState(1) // first dropdown/select
  const [resultDropdown,setResultDropdown] = useState(2) // result dropdown/select
  const [isError,setIsError] = useState(false) // for Error if user enter non numbers

  // this method to validate the error and setting the text value
  const onTextChange = (e) =>{
    setIsError(false);
    if(isNaN(e.target.value))
      setIsError(true);
    else{
      setText(e.target.value)
    }
  }

  // this for update lifecycle for text,dropdown,resultDropdown
  useEffect(()=>{
    calculationProblem();
  },[text,dropdown,resultDropdown])

  // This for calculation based on all the values
  const calculationProblem = () =>{
    if(!text){
      return;
    }
    const firstDropdownItem = [...dropDownData].find(item=>dropdown===item.id) // id for order based and find out the calculation value
    const resultDropdownItem = [...dropDownData].find(item=>resultDropdown===item.id)
    // First condition for check the order
    if(firstDropdownItem.id < resultDropdownItem.id){
      setResult((parseFloat(text) * firstDropdownItem.calculation) * resultDropdownItem.calculation)
    }
    // Second condition for check the order
    else if(firstDropdownItem.id > resultDropdownItem.id){
      setResult((parseFloat(text) * resultDropdownItem.calculation) / firstDropdownItem.calculation)
    }
    // last condition 
    else{
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
