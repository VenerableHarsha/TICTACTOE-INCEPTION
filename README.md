# TicTacToe Inception

## Description
TicTacToe Inception is a unique twist on the classic TicTacToe game. It features two gameplay modes:
- **Player vs Player (PvP)**
- **Player vs AI (PvAI)** with selectable difficulty levels: **Easy** and **Hard**

## Prerequisites
Ensure you have the following installed on your system:

- [Python](https://www.python.org/downloads/) (version 3.12 or higher)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for frontend dependencies)

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/tictactoe-inception.git
cd tictactoe-inception
```

### 2. Install Backend Dependencies
```sh
cd .\server\
pip install -r requirements.txt
```

### 3. Install Frontend Dependencies
```sh
cd .\bigxox\
npm install
```

## Running the Game

### 1. Start the Backend Server
```sh
cd .\server\
python -m uvicorn Modelapi:app --reload
```

### 2. Start the Frontend Server
```sh
cd .\bigxox\
npm start
```

## Usage
Once both servers are running, open `http://localhost:3000` (or the specified port) in your browser to play the game.

## Contributing
Feel free to submit pull requests or report issues. Follow the standard Git workflow:
```sh
git checkout -b feature-branch
git commit -m "Your message"
git push origin feature-branch
```
