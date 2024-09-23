from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from keras.models import load_model
import uvicorn

# Load your trained model
model = load_model("C:\\Users\\harsh\\Documents\\tictadc\\botsnotingot\\cnn_tictactoe_model_945.keras")

app = FastAPI()

# Define the input data model
class MoveRequest(BaseModel):
    board: list
    grid: int
    player: int
def can_move(mini_grid):
        return [index for index, value in enumerate(mini_grid) if value == 0]

# Prediction function
def predict_move(board_state,current_player,mini_grid ):

        
        # Prepare the features
        features = np.zeros((9, 9, 3))
        features[:, :, 0] = board_state  # Board state
        features[:, :, 1] = current_player  # Current player
        features[:, :, 2] = mini_grid  # Mini grid number
        
        features = features.reshape(1, 9, 9, 3)  # Reshape for the CNN
        valid_moves = can_move(board_state[mini_grid])
        q_values = model.predict(features,verbose=0)
        valid_q_values = [q_values[0][i] for i in valid_moves]
        best_move = valid_moves[np.argmax(valid_q_values)]
        return best_move

"""
example api call 
{
  "board": [
    [0, 0, 1, -1, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, -1, 0],
    [0, 0, 1, 0, 0, 0, 0, -1, 1],
    [1, -1, 0, 1, 0, -1, 0, 1, 0],
    [-1, 1, 0, 0, 0, 0, 1, 0, -1],
    [0, 0, 0, -1, 0, 1, 0, 0, 1],
    [0, 1, -1, 0, 1, 0, 0, -1, 0],
    [0, 0, 0, 0, 0, 1, -1, 1, 0],
    [1, 0, 0, -1, 0, 0, 0, 0, -1]
  ],
  "grid": 2,
  "player": 1
}

"""
# FastAPI route to get the move
@app.post("/predict")
def get_move(request: MoveRequest):
    move = predict_move(request.board, request.grid, request.player)
    return {"move": move}


if __name__ == 'main':
    uvicorn.run("Modelapi:app", host="127.0.0.1", port=8000, reload=True)