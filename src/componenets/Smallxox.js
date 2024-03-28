import { useDispatch, useSelector } from "react-redux";
import Box from "./Box";
import { mark_x_or_O_in_flag } from "./utilities/sliceofstore/cartSlice";
import { useState, useEffect } from "react";

export const Smallxox = (props) => {
    const dispatch = useDispatch();
    const [player, setPlayer] = useState({winner:"",iswinner:false});//set function which will chnage when either of the player wins
    const matrix = useSelector(store => store.cart.inceptionmat);//subscribing to 9x9 matrix
    const flagof = useSelector(state => state.cart.who_won_flag);//subscribing to who_one_flag
    /// so if lets say is wins the first smallbox componenet who_won flag will become=['x',"","","","","",,,,,,,,,,,,,,,] and vise versa
    

    useEffect(() => {
        function check(arr1) {
            if (flagof[props.indexofsmall] === '') {
                const newarray = arr1[props.indexofsmall];
                const temp = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
                for (let i in temp) {
                    if (newarray[temp[i][0]] + newarray[temp[i][1]] + newarray[temp[i][2]] === 3) {
                        dispatch(mark_x_or_O_in_flag([props.indexofsmall, "X"]));
                        setPlayer({
                            winner:"X",
                            iswinner:true
                        });
                        console.log("X is winner");
                        break;
                    }
                    if (newarray[temp[i][0]] + newarray[temp[i][1]] + newarray[temp[i][2]] === 18) {
                        dispatch(mark_x_or_O_in_flag([props.indexofsmall, "O"]));
                        setPlayer({
                            winner:"O",
                            iswinner:true
                        });
                        console.log("O is winner");
                        break;
                    }
                }
            }
        }
        check(matrix);
    }, [matrix, flagof, dispatch, props.indexofsmall]);

    return (
        <div>
            {player.iswinner&&<label> {player.winner} won</label>}
            <div className="grid grid-cols-3 w-44">
                {
                    Array(9).fill().map((_, i) => (
                        <Box key={i} indexofbox={[props.indexofsmall, i]} />
                    ))
                }
            </div>
        </div>
    );
};
