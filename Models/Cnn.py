import numpy as np
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Conv2D, Flatten, Dense
import random
from Game import Game  # Import the Game module

class CNNBot:
    def __init__(self,epochs=1000, load_path=None,epsilon=1.0, min_epsilon=0.1, decay_rate=0.995,maxmem=1000):
        self.epsilon = epsilon  # Exploration rate
        self.game = Game()  # Create an instance of the Game class
        self.min_epsilon = min_epsilon  # Minimum exploration rate
        self.decay_rate = decay_rate
        self.game_records = []  # Store game records for training
        self.maxmemory=maxmem
        self.epochs=epochs
        if load_path:
            
            self.model = load_model(load_path)
            print("model loaded")
        else:
            self.model = self.build_model()

    def build_model(self):
        model = Sequential()
        model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(9, 9, 3)))
        model.add(Flatten())
        model.add(Dense(64, activation='relu'))
        model.add(Dense(9, activation='linear'))  # Output Q-values
        model.compile(optimizer='adam', loss='mse')
        return model

    def predict_move(self):
        # Extract the current game state
        board_state = self.game.board
        mini_grid = self.game.mini
        current_player = self.game.current
        
        # Prepare the features
        features = np.zeros((9, 9, 3))
        features[:, :, 0] = board_state  # Board state
        features[:, :, 1] = current_player  # Current player
        features[:, :, 2] = mini_grid  # Mini grid number
        
        features = features.reshape(1, 9, 9, 3)  # Reshape for the CNN

        valid_moves = self.can_move(board_state[mini_grid])

        if random.random() < self.epsilon:  # Explore

            return random.choice(valid_moves)
        else:  # Exploit
            #print(f"Predicting with features shape: {features.shape} for player {self.game.current}")

            q_values = self.model.predict(features,verbose=0)
            valid_q_values = [q_values[0][i] for i in valid_moves]
            best_move = valid_moves[np.argmax(valid_q_values)]
            return best_move

    def can_move(self, mini_grid):
        return [index for index, value in enumerate(mini_grid) if value == 0]

    def train_model(self, result):
        states = []
        targets = []

        # Define target values for moves
        for game in self.game_records:
            board_state = game['board']
            mini_grid = game['mini_grid']
            player = game['player']
            move = game['move']

            # Create the 3-channel state representation
            player_grid = np.full((9, 9), player)  # Grid filled with current player
            mini_grid_state = np.zeros((9, 9))
            mini_grid_state[mini_grid // 3 * 3: mini_grid // 3 * 3 + 3, mini_grid % 3 * 3: mini_grid % 3 * 3 + 3] = 1  # Mark mini-grid

            # Stack the channels: (board, player, mini_grid)
            full_state = np.stack([board_state, player_grid, mini_grid_state], axis=-1)

            # Create a target array for the current board state
            target_value = np.zeros(9)  # Initialize target array for the moves
            if result == 1:  # If this game resulted in a win for the current player
                target_value[move] = 1  # Winning move
            elif result == -1:  # If this game resulted in a loss
                target_value[move] = -1  # Losing move

            states.append(full_state)  # Append the 3-channel state
            targets.append(target_value)  # Append the target for the specific move

        # Convert to numpy arrays
        states = np.array(states)
        targets = np.array(targets)

        # Train the model with the collected data
        self.model.fit(states.reshape(-1, 9, 9, 3), targets, epochs=5, verbose=False)

    def play_and_train(self):
        for game_count in range(self.epochs):
            self.game.reset()  # Reset the game for a new round
            moves=0
            while self.game.win == 0 and moves<1000:
                move = self.predict_move()
               
                self.game.playmove(move)
                moves+=1
                # Record the experience after the move
                self.game_records.append({
                    'board': self.game.board.copy(),
                    'mini_grid': self.game.mini,
                    'move': move,
                    'player': self.game.current
                })
            if len(self.game_records) > self.maxmemory:
                    self.game_records.pop(0)  
            # Train the model at the end of the game
            result = self.game.win  # The result of the game (1 for win, -1 for loss)
            if result==0:
                print("this game was too long here is the board and grid:",self.game.grid)
                self.game.display_board()
                continue
            self.train_model(result)
            if self.epsilon > self.min_epsilon:
                self.epsilon *= self.decay_rate  # Decay epsilon
                self.epsilon = max(self.epsilon, self.min_epsilon)  # Ensure it doesn't go below min_epsilon

            # Save the model every 100 games
            if game_count % 5 == 0:
                self.model.save(f'cnn_tictactoe_model_{game_count}.keras')

            # Display the final board and results
            print(f"Player {1 if self.game.win == 1 else 2} wins Game : {game_count}",flush=True)
