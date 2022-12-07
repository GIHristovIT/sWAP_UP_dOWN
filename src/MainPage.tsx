
import React from "react";
import {motion} from "framer-motion"
import "./styles.css";

function MainPage() {

    const [listArray, setListArray] = React.useState([{id: "Item Zero", label:"A"},
    {id: "First Item", label:"B"},
    {id: "Second Item", label:"C"},
    {id: "Thirth Item", label:"D"},
    {id: "Fourth Item", label:"E"},])

    const[rotate, setRotate] = React.useState(false)
    //animate={{rotate: rotate? 360:0}}  Adding this will rotate any motion element
    const[move, setMove] = React.useState(false)

  const goUpFunc = (idto:string) => { 
    setRotate(!rotate);
    setMove(!move);  
    let index=listArray.findIndex(obj => obj.id === idto);  
    if (index===0) {console.log(listArray); return}
    else{      
        let tmpArr = [{id:"",label:""}];  
        tmpArr.splice(0, tmpArr.length) 
            for(let i=0; i<index-1; i++){
            tmpArr.push(listArray[i])
        }   
            tmpArr.push(listArray[index])  
            tmpArr.push(listArray[index-1])  
            for(let i=index+1; i<listArray.length; i++){
                tmpArr.push(listArray[i])
            }   
            setListArray(tmpArr)         
    }    
                               }

                               const goDownFunc = (idto:string) => {  
                                setRotate(!rotate);  
                                setMove(!move);  
                                let index=listArray.findIndex(obj => obj.id === idto);                                
                                if (index===listArray.length-1) {console.log(listArray); return}
                                else{      
                                   
                                    let tmpArr = [{id:"",label:""}];  
                                    tmpArr.splice(0, tmpArr.length) 
                                 
                                        for(let i=0; i<index; i++){                                          
                                         tmpArr.push(listArray[i]) 
                                        }  
                                         tmpArr.push(listArray[index+1]) 
                                         tmpArr.push(listArray[index])  

                                         for(let i=index+2; i<listArray.length; i++){                                          
                                            tmpArr.push(listArray[i]) 
                                           } 
                                           setListArray(tmpArr)   
                                              
                                }    
                                                           }
    
      
  

  return (
    // goes up 200px and enlarges from initial 0 (invisible) to 1 = 100%, the whole duration is 2 seconds. OnHoverEnlarges 10%
    // on Drag enlarges with 20%. Drags only on y scale and the movement is limited
    <motion.div animate={{y: -150, scale:1, rotate:[0,200,200,0]}} whileHover={{scale: 1.1}} style={{display:"flex"}}
     transition={{type: "tween", duration:2}}     
     initial={{scale:0}}
     drag="y"
     dragConstraints={{bottom:50, top:10}}
     whileDrag={{scale : 1.2}} 
     className="example-container"> 
     {/* надписът се мести ляво дясно при промяна стойността на move като чака 1 секунда */}
        {/* <motion.div animate={{x: move? 200: -200}}  transition={{delay:1}}>tri momi</motion.div> */}
     <ul>
        {listArray.map((item)=>{
            // Swings 200 degrees and back repeat twice, takes 1 second
            return <motion.li animate={{rotate:[0,200,200,0]}} transition={{repeat:2,duration:1}}
             key={item.id}
             style={{display:"flex", justifyContent:"space-between"}}>
                <div style={{display:"flex"}}>
                <span style={{fontStyle:"italic",marginRight:5}}>Id:</span> 
                <span style={{marginRight:10, color:"red" }}>{item.id} </span>
                <span style={{fontStyle:"italic"}}>Label: </span>
                <span style={{marginRight:10, color:"blue" }}>{item.label}</span>
                </div>
                <div style={{display:"flex"}}>
                <motion.input style={{marginLeft:20}}  
                animate={{x:move ? 1: -1}} 
                transition={{type:"spring", bounce:1}}
                type="button" value="Go UP" className="button-up" onClick={() =>goUpFunc(item.id)}>                    
                </motion.input>
                <motion.input style={{marginLeft:10}} 
                animate={{x:move ? 1: -1}} 
                transition={{type:"spring", bounce:1}}
                type="button" value="Go Down" className="button-down" onClick={() =>goDownFunc(item.id)}>                    
                </motion.input>
                </div>
                </motion.li>   
                           
        }
        )  }  
     </ul>
    </motion.div>
  );
}

export default MainPage;
