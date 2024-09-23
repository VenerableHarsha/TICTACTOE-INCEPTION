class Game:
    def __init__(self) -> None:
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
