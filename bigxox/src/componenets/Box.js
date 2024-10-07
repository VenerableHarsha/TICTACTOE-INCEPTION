
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markxoro, nexturn, set_xox_index, set_ai_move,flag_for_ai,setter_for_ai} from "../utilities/sliceofstore/cartSlice";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Box = (props) => {
    const dispatch = useDispatch();
    const ai_ka_mover=useSelector((store)=>store.cart.ai_ka_moves)
    const ai_ka_flag=useSelector((store)=>store.cart.flag_for_ai)
    const [flag2,setflag2]=useState(false);
   console.log(ai_ka_flag)

    
    const flag = useSelector((store) => store.cart.flag);
    const currentindex = useSelector((store) => store.cart.index_of_small_xox);
    const inceptionmat = useSelector((store) => store.cart.inceptionmat);
    const array = props.indexofbox;
    const [ai_move, set_aimove] = useState(null); // ai move will be stored here
    const [x_or_y, setxy] = useState("");
    const [color, setcolor] = useState("w-12 h-12 shadow-sm bg-black m-1 cursor-pointer text-center font-bold text-3xl hover:bg-slate-700");

    // API call to get the AI move
    const make_apiall_to_ai = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    board: inceptionmat,
                    grid: array[0],
                    player: 1
                }),
            });
            const data = await res.json();
            const { move } = data;
           // var move=Math.floor(Math.random() * 9);
            console.log("AI move received:", move);
            setflag2(!flag2);
           // set_aimove(move); // set the ai_move state
            dispatch(set_ai_move(move))
            dispatch(setter_for_ai());
            //dispatch(markxoro(array));
        } catch (err) {
            console.log("Error occurred:", err);
        }
    };

    // Effect to check for ai_move and update state accordingly
    useEffect(() => {
        if(ai_move==7)
        {
            console.log("yes ganduuuuu")
        }
        // if(ai_ka_mover==7)
        // {
        //     setxy("X");
        //     setcolor("w-12 h-12 bg-black m-1 cursor-pointer text-center font-bold text-3xl text-yellow-400 brightness-150 pt-1");
        // }
        console.log("taha");
        const [row,col]=array
        console.log("thus id for ",currentindex)
        console.log("this is",ai_ka_mover)
        console.log("Value of cuurentinde1",props.indexofbox[0])
        console.log("Value of index2",props.indexofbox[1])
        if (currentindex === props.indexofbox[0] && props.indexofbox[1] === ai_ka_mover) {
        setTimeout(() => {
            
                console.log("yeah i got executed noigga")
                dispatch(markxoro([currentindex,ai_ka_mover]));
                dispatch(nexturn());
                setxy("O");
                setcolor("w-12 h-12 shadow-xl bg-black m-1 cursor-pointer text-center font-bold text-3xl text-purple-700 brightness-150 pt-1");
                dispatch(set_xox_index(ai_ka_mover));
               
            
        }, 3000); }
        
    }, [ai_ka_flag]);

    // Socket logic
    //console.log(ai_move)
   
    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         if (props.indexofbox[0] === data.message[0] && props.indexofbox[1] === data.message[1]) {
    //             if (flag) {
    //                 dispatch(markxoro(array));
    //                 dispatch(nexturn());
    //                 setxy("X");
    //                 setcolor("w-12 h-12 bg-black m-1 cursor-pointer text-center font-bold text-3xl text-yellow-400 brightness-150 pt-1");
    //                 dispatch(set_xox_index(props.indexofbox[1]));
    //             } else {
    //                 dispatch(markxoro(array));
    //                 dispatch(nexturn());
    //                 setxy("O");
    //                 setcolor("w-12 h-12 shadow-xl bg-black m-1 cursor-pointer text-center font-bold text-3xl text-purple-700 brightness-150 pt-1");
    //                 dispatch(set_xox_index(props.indexofbox[1]));
    //             }
    //             alert("Received message: " + flag);
    //         }
    //     });

    //     // Cleanup the event listener when the component unmounts
    //     return () => {
    //         socket.off("receive_message");
    //     };
    // }, [socket, props.indexofbox, flag, dispatch, array]);

    // Main onClick logic
    return (
        <div className={color} onClick={() => {
            socket.emit("send_message", { message: props.indexofbox, flag });
           
            if (props.indexofbox[0] === currentindex) {
                const [row, col] = array;
                if (inceptionmat[row][col] === 0) {
                    if (flag) {
                        dispatch(markxoro(array));
                        dispatch(nexturn());
                        setxy("X");
                        setcolor("w-12 h-12 bg-black m-1 cursor-pointer text-center font-bold text-3xl text-yellow-400 brightness-150 pt-1");
                        dispatch(set_xox_index(props.indexofbox[1]));
                        make_apiall_to_ai();
                    } else {
                        dispatch(markxoro(array));
                        dispatch(nexturn());
                        setxy("O");
                        setcolor("w-12 h-12 shadow-xl bg-black m-1 cursor-pointer text-center font-bold text-3xl text-purple-700 brightness-150 pt-1");
                        dispatch(set_xox_index(props.indexofbox[1]));
                    }
                } else {
                    alert("This box is already occupied. Choose another one.");
                }
            } else {
                alert("Wrong grid! Put your move on the highlighted grid.");
            }
        }}>
            {x_or_y}
        </div>
    );
};

export default Box;
