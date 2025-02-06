import math
import random
import numpy as np
import torch
class Game:
    def __init__(self,board=[[0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0]],current=1,mini=4,win=0,grid=[0,0,0,0,0,0,0,0,0]) -> None:
        self.board=board
        self.current=current
        self.mini=mini
        self.win=win
        self.grid=grid
    def reset(self):
        self.board=[[0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0]]
        self.current=1
        self.mini=4
        self.win=0
        self.grid=[0,0,0,0,0,0,0,0,0]
    def canmove(self):
        return [index for index, value in enumerate(self.board[self.mini]) if value == 0]    
    def playmove(self,location):
        if location in self.canmove():
            self.board[self.mini][location]=self.current
            self.iswin()
            if 0 not in self.board[self.mini]:
                self.board[self.mini]=[0]*9
            self.current=-self.current
            self.mini=location
    def is_terminal(self):
        """Check if the current state is terminal (win, loss, or draw)"""
        if self.win != 0:
            return True
        return False       
    def iswin(self):
        winning_patterns = [
            [0, 1, 2],  # Row 1
            [3, 4, 5],  # Row 2
            [6, 7, 8],  # Row 3
            [0, 3, 6],  # Column 1
            [1, 4, 7],  # Column 2
            [2, 5, 8],  # Column 3
            [0, 4, 8],  # Diagonal 1
            [2, 4, 6],  # Diagonal 2
        ]
        for n,i in enumerate(self.board):
            if self.grid[n]==0:
                for pattern in winning_patterns:
                    if all(i[j]==self.current for j in pattern):
                        self.grid[self.mini]=self.current
                        break
        for pattern in winning_patterns:
            if all(self.grid[j] == self.current for j in pattern):
                self.win=self.current
                break
        if 0 not in self.grid:
            self.win=2
            
    def get_result(self):
        """Return the result of the game: +1 for player 1 win, -1 for player 2 win, 2 for draw"""
        return self.win
    def display_board(self):

            for r in range(3):
                for i in range(3):
                    insp1=' | '.join(str(x) if x != 0 else '9' for x in self.board[3*r][(3*i):(3*i)+3])
                    insp2=' | '.join(str(x) if x != 0 else '9' for x in self.board[1+(3*r)][(3*i):(3*i)+3])
                    insp3=' | '.join(str(x) if x != 0 else '9' for x in self.board[2+(3*r)][(3*i):(3*i)+3])
                    print(insp1+"  |  "+insp2+"  |  "+insp3)
                print('--'*21)  
    def game_loop(self):
        while self.win == 0 :
            print(self.mini)
            self.display_board()
            location = int(input(f"Player {1 if self.current == 1 else 2}, enter your move (0-8): "))
            if location in self.canmove():
                self.playmove(location)
            else:
                print("Invalid move. Try again.")
        
        self.display_board()
        if self.win != 0:
            print(f"Player {1 if self.win == 1 else 2} wins!")
        else:
            print("It's a tie!")
    def clone(self):
        # Create a deep copy of the game state to ensure the original game is not modified
        new_game = Game(board=[row[:] for row in self.board],  # Copy the 2D list (board)
                        current=self.current,
                        mini=self.mini,
                        win=self.win,
                        grid=self.grid[:])  # Copy the grid list
        return new_game
    def to_tensor(self):
        # Layer 1: The game board (9x9 matrix)
        board_layer = self.board
        
        # Layer 2: Current player (1 or -1) as a single value, broadcasted to 9x9
        current_player_layer = np.full((9, 9), self.current)
        
        # Layer 3: The mini grid number (0-8), broadcasted to 9x9
        mini_layer = np.full((9, 9), self.mini)
        
        # Stack the layers into a 3D tensor (3, 9, 9)
        game_tensor = np.stack([board_layer, current_player_layer, mini_layer], axis=0)
        
        # Convert the numpy array to a PyTorch tensor
        return torch.tensor(game_tensor, dtype=torch.float32)

class MCTSNode:
    def __init__(self, game: Game, parent=None):
        self.game = game  # The game state at this node
        self.parent = parent  # Parent node
        self.children = []  # List of child nodes
        self.visits = 0  # Number of times this node has been visited
        self.value = 0  # The total value (reward) accumulated from simulations

    def is_fully_expanded(self):
        # Returns True if all legal moves have been expanded
        return len(self.children) == len(self.game.canmove())

    def best_child(self, c_param=1.4):
        # Select the best child based on UCB1 (Upper Confidence Bound for Trees)
        children_with_uct = [
            (child, child.value / (child.visits + 1e-6) + c_param * math.sqrt(math.log(self.visits + 1) / (child.visits + 1e-6)))
            for child in self.children
        ]
        return max(children_with_uct, key=lambda x: x[1])[0]
    
    def expand(self):
        # Expand a new child node by making a legal move
        legal_moves = self.game.canmove()
        for move in legal_moves:
            # Clone the current game state, apply the move, and create a new node
            new_game = self.game.clone()  # Make sure `clone()` method is implemented in Game
            new_game.playmove(move)
            child_node = MCTSNode(new_game, self)
            self.children.append(child_node)
    
import time
import random

class MCTS:
    def __init__(self, game: Game, max_duration: float = 120):
        self.root = MCTSNode(game)  # The root of the tree is the current game state
        self.max_duration = max_duration  # Max duration in seconds to run MCTS

    def run(self):
        start_time = time.time()  # Track the start time
        while time.time() - start_time < self.max_duration:  # Run while within time limit
            node = self.tree_policy(self.root)  # Select the node to simulate
            reward = self.default_policy(node.game)  # Simulate the game from that node
            self.backpropagate(node, reward)  # Update the tree with the result of the simulation

    def tree_policy(self, node: MCTSNode):
        while not node.game.is_terminal():  # While the game is not over
            if not node.is_fully_expanded():
                node.expand()  # If the node is not fully expanded, expand it
                return random.choice(node.children)  # Return a randomly chosen child (for expansion)
            else:
                node = node.best_child()  # Otherwise, select the best child based on UCB1
        return node

    def default_policy(self, game: Game):
        # Simulate the game from the given state until it reaches a terminal state
        while not game.is_terminal():
            legal_moves = game.canmove()
            move = random.choice(legal_moves)
            game.playmove(move)
        return game.get_result()  # Return the result of the game (+1, -1, or 2)
    
    def backpropagate(self, node: MCTSNode, reward: int):
        # Backpropagate the result of the simulation up to the root
        while node is not None:
            node.visits += 1
            node.value += reward
            node = node.parent
