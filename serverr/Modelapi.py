from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from keras.models import load_model
import uvicorn
import logging
import random
from Game import Game,MCTS
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
# i have redefined what a list and grid are, grid is the current big xox and mini is the number of the small grid where to play 
class MoveRequest(BaseModel):
    board: list
    mini:int
    grid: list
    player: int

def can_move(mini_grid):
    return [index for index, value in enumerate(mini_grid) if value == 0]

# Prediction function
def predict_move(board_state,mini_grid,current_player):
    # Prepare the features
    features = np.zeros((9, 9, 3))
    logger.debug("board state %s",board_state)
    features[:, :, 0] = board_state  # Board state
    features[:, :, 1] = current_player  # Current player
    features[:, :, 2] = mini_grid  # Mini grid number
    
    features = features.reshape(1, 9, 9, 3)  # Reshape for the CNN
    
    valid_moves = can_move(board_state[mini_grid])
    logger.debug("moves %s",valid_moves)
    logger.debug("small grid %s",board_state[mini_grid])

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
    
    move = predict_move(request.board, request.mini, request.player)
    logger.debug("moves %s",move)
    return {"move": move}
@app.post("/predict-model2")
def get_move2(request: MoveRequest):
    game=Game(board=request.board,current=request.player,mini=request.mini,grid=request.grid)
    mcts = MCTS(game,max_duration=1)
    mcts.run()
    move = mcts.root.best_child(c_param=0).game.mini
    logger.debug("moves %s",move)
    return {"move": move}
if __name__ == '__main__':  # Fixed the entry point
    uvicorn.run("Modelapi:app", host="127.0.0.1", port=8000, reload=True)
