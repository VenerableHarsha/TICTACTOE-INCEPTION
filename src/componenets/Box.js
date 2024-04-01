import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markxoro, nexturn, set_xox_index } from "./utilities/sliceofstore/cartSlice";

const Box = (props) => {
    
    const flag = useSelector((store) => store.cart.flag);
    const currentindex = useSelector((store) => store.cart.index_of_small_xox);
    const inceptionmat = useSelector((store) => store.cart.inceptionmat); // Get the inceptionmat from Redux store
    const dispatch = useDispatch();
    const array = props.indexofbox;
   

    const [x_or_y, setxy] = useState("");
    const [color, setcolor] = useState("w-10 h-10  shadow-xl border-4  rounded-lg   m-2 cursor-pointer text-center font-bold text-3xl");
   useEffect(()=>{
    function emptybox(){
        setxy("");
    }
    emptybox();
   },[props.fillcheck])
   
    return (
        <div className={color} onClick={() => {
            if (props.indexofbox[0] === currentindex) {
                const [row, col] = array;
                // Check if the corresponding cell in inceptionmat is empty (has a value of 0)
                if (inceptionmat[row][col] === 0) {
                    if (flag) {
                        dispatch(markxoro(array));
                        dispatch(nexturn());
                        
                        setxy("X");
                        setcolor("w-10 h-10  shadow-xl border-4  rounded-lg   m-2 cursor-pointer text-center font-bold text-3xl text-yellow-400");
                        dispatch(set_xox_index(props.indexofbox[1]));
                        
                    } else {
                        dispatch(markxoro(array));
                        dispatch(nexturn());
                        setxy("O");
                        setcolor("w-10 h-10  shadow-xl border-4  rounded-lg   m-2 cursor-pointer text-center font-bold text-3xl text-purple-600");
                        dispatch(set_xox_index(props.indexofbox[1]));
                       
                    }
                } else {
                    alert("This box is already occupied. Choose another one.");
                }
            } else {
                alert("Wrong grid! Put your move on the highlighted grid.");
            }
        }}>{x_or_y}</div>
    );
};

export default Box;
