from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from keras.models import load_model
import uvicorn
import logging
import random
logging.basicConfig(level=logging.DEBUG,  # Set the logging level to DEBUG
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

logger = logging.getLogger(__name__)

# Load your trained model
model = load_model(".\cnn_tictactoe_model_945.keras")

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify which origins are allowed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Define the input data model
class MoveRequest(BaseModel):
    board: list
    grid: int
    player: int

def can_move(mini_grid):
    return [index for index, value in enumerate(mini_grid) if value == 0]

# Prediction function
def predict_move(board_state, current_player, mini_grid):
    # Prepare the features
    features = np.zeros((9, 9, 3))
    features[:, :, 0] = board_state  # Board state
    features[:, :, 1] = current_player  # Current player
    features[:, :, 2] = mini_grid  # Mini grid number
    
    features = features.reshape(1, 9, 9, 3)  # Reshape for the CNN
    logger.debug(board_state[mini_grid])
    valid_moves = can_move(board_state[mini_grid])
    logger.debug("moves %s",valid_moves)
    q_values = model.predict(features, verbose=0)
    if random.random() < 0.1:  # Explore
            logger.debug("random")
            return random.choice(valid_moves)
    else:  # Exploit
            #print(f"Predicting with features shape: {features.shape} for player {self.game.current}")

            q_values = model.predict(features,verbose=0)
            valid_q_values = [q_values[0][i] for i in valid_moves]
            best_move = valid_moves[np.argmax(valid_q_values)]
            return best_move

# FastAPI route to get the move
@app.post("/predict")
def get_move(request: MoveRequest):
    logger.debug("grid %s",request.grid)
    move = predict_move(request.board, request.grid, request.player)
    logger.debug(move)
    return {"move": move}

if __name__ == '__main__':  # Fixed the entry point
    uvicorn.run("Modelapi:app", host="127.0.0.1", port=8000, reload=True)
