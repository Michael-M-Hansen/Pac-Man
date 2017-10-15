# Pac-Man

[Play the live version here](http://www.madhavahansen.com/pacman)

## Instructions

#####
The game plays just like the classic arcade version with some variations on the games visual design. You have to eat up all the white dots to complete each level. When you eat one of the large white dots, the ghosts will turn blue and become vulnerable to Pac-Man! For the rest of the time, the ghosts are deadly to Pac-Man and will take one of his three lives upon contact. Happy hunting!!!

## Controls

1. "n" - new game
2. "c" - start next level
3. arrow keys - change directions


![gameplay screenshot](https://github.com/Madhava-Hansen/Pac-Man/blob/master/assets/images/gameplay_pacman.png)


## Technologies

1. HTML5
2. HTML5 Canvas
3. JavaScript
4. CSS3

## Game Design

I used the principals of object oriented programming while developing this project. My main GamePlay class handles all the game play logic. While the PacMan and Ghost classes handle the logic for each of those characters. In order to track the movement of characters in the game I decided to use a matrix and map numbers and positions on the matrix to know how to render characters, white dots and animations on the canvas.
