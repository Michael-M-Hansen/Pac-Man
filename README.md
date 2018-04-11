# Pac-Man

Play the live version [here](http://www.madhavahansen.com/pacman)

## Instructions

The game plays just like the classic arcade version with some variations on the games visual design. You have to eat up all the white dots to complete each level. When you eat one of the large white dots, the ghosts will turn blue and become vulnerable to Pac-Man! For the rest of the time, the ghosts are deadly to Pac-Man and will take one of his three lives upon contact. Happy hunting!!!

## Controls

1. "n" - Start new game
2. "n" - Start next level
3. "c" - Continue a previously saved game
3. Arrow keys - change directions


![gameplay screenshot](https://github.com/Madhava-Hansen/Pac-Man/blob/master/assets/images/gameplay_pacman.png)


## Technologies

1. HTML5
2. HTML5 Canvas
3. JavaScript
4. CSS3
5. Node.js
6. Webpack

## Local Storage

I've utilized HTML5's localStorage to retain game data in the browsers memory. Players can close their browser and the current state of their game will be saved for the next time they visit my site. I've used JSON to stringify and then parse game data and reload the previous state for a seamless game play experience.

## Game Design

My game uses JavaScript modules to handle each classes logic and state. My object oriented approach has a PacMan class, a GamePlay class, a Ghost class and a Board class. All of these objects are interacting and being tracked on a matrix which is tracking positions and values using integer values to point to the current state of each position on the matrix.

## CSS Sprites

I've utilized CSS Sprites for the ghosts and PacMan animations in order to limit my server requests and optimize page speed loading.
