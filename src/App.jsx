import { useState, useCallback, useEffect,useRef } from "react";

function App() {
const [ length ,setLength] = useState(8)
 const [numberAllowed, setNumberAllowed] = useState(false);
 const[ charAllowed, setCharAllowed] = useState(false);
 const[ Password,setPassword] = useState ("")
//hooks
const passwordRef = useRef(null)


 const passwordGenerator  = useCallback(()=>{

  let pass =""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if (numberAllowed) str +="0123456789"
if(charAllowed) str += "!@#$%^&*[]*'~'"
for (let i=1; i<= length; i++)
{
   let char = Math.floor(Math.random()* str.length + 1)
pass += str.charAt(char)
}

setPassword(pass)
 },[length,numberAllowed, charAllowed,setPassword])
 

const copyPasswordClipboard = useCallback(()=>{
passwordRef.current?.select()

////yahan pr jitna aap select karna chahtehain utni range deni hogi
passwordRef.current?.setSelectionRange(0,99);
  window.navigator.clipboard.writeText(Password)
}, [Password])

useEffect(()=>{passwordGenerator()

}, [length,numberAllowed,charAllowed, setPassword,passwordGenerator])
  

  return (  
<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-600">
 <h1 className=" text-whit text-center">PASSWORD GENERATOR</h1>
 <div className=" flex shadow rounded-lg overerflow-hidden mb-4">
< input type="text" value ={Password}
className="outline-none w-full py-1 px-3" placeholder="password"
readonly ref={passwordRef} 
/>
<button  onClick={copyPasswordClipboard}className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0">copy</button>

 </div>

<div className="felx text-sm gap-x-2">
<div className=" flex item-center gap-x-1">
<input type="range" min={6} max={100} value={length}
className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}}
/>
<label>Length:{length}</label>   
   </div>
<div className="flex items-center gap-x-1">
  <input type="checkbox" defaultValue={numberAllowed} id="numberInput" onChange={()=>{
    setNumberAllowed((prev) = !prev);
  }}/>
  <label htmlFor="numberInput">Number</label>


<div className="flex items-center gap-x-1">
  <input type="checkbox" defaultValue={charAllowed} id="charInput" onChange={()=>{
    setCharAllowed((prev) = !prev);
  }}/>
 
  <label htmlFor="characterInput">Character</label>
    </div>
</div>
  </div>
</div>


    );
}

export default App;
