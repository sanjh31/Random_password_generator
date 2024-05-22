
import { useCallback, useEffect, useState} from 'react';
import './App.css'
import { FaCopy , FaCheck } from "react-icons/fa6";


function App() {
const [length,setLength] = useState("8");
const [options, setOptions] = useState({
  useNumbers: false,
  useSymbols: false
})
const [password, setPassword] = useState("");
const [copy , setcopy] = useState(false);

const handlegeneratepassword =useCallback(()=>{
let characterset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz";

if(options.useNumbers) characterset += "1234567890";
if(options.useSymbols) characterset += "!@#$%^^&&~`*"

let Pass = '';
for (let i = 0; i < length; i++) {
  const randomIndex = Math.floor(Math.random() * characterset.length);
  Pass += characterset[randomIndex];
}

setPassword(Pass);
  return Pass;
},[length, options])



const handlecopypassword = useCallback (()=>{
    navigator.clipboard.writeText(password);
    setcopy(true);
    setTimeout(() => setcopy(false), 1000);
  },[password]
)

useEffect(()=>{
  setPassword(handlegeneratepassword());
},[length,options])

const handleToggleOption = useCallback(option => {
setOptions(prevOptions=>({
...prevOptions,
[option]: !prevOptions[option]
  }
));


setPassword(handlegeneratepassword()); // Update password whenever options change
}, []);


const optionLabels = [
{ key: 'useNumbers' , label: 'Numbers' },
  { key: 'useSymbols' , label: 'Symbols' }
];

  return (
    <>
      <div className='container flex items-center flex-col justify-center min-w-full min-h-screen' style={{
        backgroundColor : "#15191B" , 
      }}>
        
      <div className='heading-random-password-generator  text-2xl sm:text-2xl lg:text-4xl  text-white font-Pacific md:mb-5'>Random Password Generator</div>


{/* input-copy-btn */}
      <div className='input-buttons-checks-container mt-5 md:w-3/4 lg:w-2/4  w-11/12 sm:h-full  mx-2' style={{backgroundColor : "#2F3639",}}>
      <div className='input-copybtn m-5 flex'>
      <input type="text" className='py-2 px-3 w-full' value={password} readOnly/>
      
      <button  className='py-2 px-3' onClick={handlecopypassword} style={{backgroundColor: "#3B5FC9",}}>
      {copy ? <FaCheck className='text-white'  style={{backgroundColor : "#3B5FC9" ,}}/> : <FaCopy className='text-white' />}
      </button>
      </div>
     
              

<div className='Ranges section m-5'>
<div className='range'>
<label className='text-white m-0'>Length : {length}</label>
<input type="range"
className='range-style m-0' min="0" max="20"
defaultValue={length}
style={{
  width: '100%',
  appearance: 'none',
  height: '4px',
  background: '#d3d3d3',
  outline: 'none',
  opacity: '1',
  transition: 'opacity .2s',
  borderRadius: '5px',
}}
onChange={(e)=>setLength(e.target.value)}
/>
</div>

{
  optionLabels.map((option)=>{

return(<>
<div className='checked-inputs flex items-center justify-between mt-3'  key={option.key} >
<label  className='text-white text-base '>{option.label}</label>
<input type="checkbox"  className='h-4 w-4 border-gray-300 rounded-sm ' checked={options[option.key]} onChange={() => handleToggleOption(option.key)}/>
</div>
</>
)
  })
}



<div className='GeneratePasswordBtn' >
<button style={{backgroundColor : "#3B5FC9" ,}} className='w-full text-white py-1 mt-3 font-medium' onClick={handlegeneratepassword}>Generate Password</button>
</div>

</div>

</div>

</div>
    
    </>
  )
}

export default App
