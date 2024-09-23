# main.py

from Cnn import CNNBot  # Import the CNNBot class from your cnn_model file
from tensorflow.keras.losses import MeanSquaredError

def main():
    bot = CNNBot(epochs=950,load_path='cnn_tictactoe_model_50.keras')
    bot.play_and_train()  # Train the bot for 1000 games
main()
