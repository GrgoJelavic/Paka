document.addEventListener('DOMContentLoaded', () => {

    const scoreDisplay = document.getElementById('score')

    const infoBox = document.querySelector('.infoBox')
    const timer = document.querySelector('.timer')
    const start = document.querySelector('.start')
    const highScore = document.querySelector('.highScore')
    const left = document.querySelector('.left')
    const up = document.querySelector('.up')
    const right = document.querySelector('.right')
    const down = document.querySelector('.down')

    const width = 24
    const grid = document.querySelector('.grid')
    const layout = [
            1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1,
            1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
            1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 4,
            1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1,
            1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1,
            1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1,
            1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
            1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 4, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
            1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, , 1, 0, 1, 0, 1,
            1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1,
            1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1,
            4, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1,
            1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1
        ]
        // 0 - food
        // 1 - wall
        // 2 - ghost-lair
        // 3 - powerball
        // 4 - empty

    const squares = []

    let score = 0
    let food = 299
    let time = 0
    let countUpid
    let highScoreNumber = 0
    let highScoreTime = 0
    start.innerHTML = 'Start!'
    start.style.backgroundColor = '#f2524e'
    scoreDisplay.innerHTML = 0
    infoBox.innerHTML = 'RUN!'

    //create your board
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)

            //add layout to the board
            if (layout[i] === 0) {
                squares[i].classList.add('food')
            } else if (layout[i] === 1) {
                squares[i].classList.add('wall')
            } else if (layout[i] === 2) {
                squares[i].classList.add('ghost-lair')
            } else if (layout[i] === 3) {
                squares[i].classList.add('power-star')
            }
        }
    }
    createBoard()

    // timer
    countUpid = setInterval(countUp, 1000)
        // counts up the time for the timer
    function countUp() {
        time = time + 1
        timer.innerHTML = time
    }

    //create Characters
    //draw paka on the board
    let pakaCurrentIndex = 25
    squares[pakaCurrentIndex].classList.add('paka', 'paka--right')

    //move paka
    function movePaka(e) {
        squares[pakaCurrentIndex].classList.remove('paka', 'paka--left', 'paka--right', 'paka--up', 'paka--down')
        switch (e.keyCode) {
            case 37:
                if (
                    pakaCurrentIndex % width !== 0 &&
                    !squares[pakaCurrentIndex - 1].classList.contains('wall') &&
                    !squares[pakaCurrentIndex - 1].classList.contains('ghost-lair')
                )
                    pakaCurrentIndex -= 1

                if ((pakaCurrentIndex - 1) === 119) //left upper portal
                    pakaCurrentIndex = 142
                if ((pakaCurrentIndex - 1) === 431) //left bottom portal
                    pakaCurrentIndex = 454
                squares[pakaCurrentIndex].classList.add('paka--left')
                left.classList.add('active')
                setTimeout(() => left.classList.remove('active'), 100)
                break
            case 38:
                if (
                    pakaCurrentIndex - width >= 0 &&
                    !squares[pakaCurrentIndex - width].classList.contains('wall') &&
                    !squares[pakaCurrentIndex - width].classList.contains('ghost-lair')
                )
                    pakaCurrentIndex -= width

                if ((pakaCurrentIndex) === 18) //top right portal
                    pakaCurrentIndex = 546
                if ((pakaCurrentIndex) === 5) //top left portal
                    pakaCurrentIndex = 533
                squares[pakaCurrentIndex].classList.add('paka--up')
                up.classList.add('active')
                setTimeout(() => up.classList.remove('active'), 100)
                break
            case 39:
                if (
                    pakaCurrentIndex % width < width - 1 &&
                    !squares[pakaCurrentIndex + 1].classList.contains('wall') &&
                    !squares[pakaCurrentIndex + 1].classList.contains('ghost-lair')
                )
                    pakaCurrentIndex += 1
                if ((pakaCurrentIndex + 1) === 144) //right upper portal
                    pakaCurrentIndex = 121
                if ((pakaCurrentIndex + 1) === 456) //right bottom portal
                    pakaCurrentIndex = 433
                squares[pakaCurrentIndex].classList.add('paka--right')
                right.classList.add('active')
                setTimeout(() => right.classList.remove('active'), 100)
                break
            case 40:
                if (
                    pakaCurrentIndex + width < width * width &&
                    !squares[pakaCurrentIndex + width].classList.contains('wall') &&
                    !squares[pakaCurrentIndex + width].classList.contains('ghost-lair')
                )
                    pakaCurrentIndex += width
                if ((pakaCurrentIndex) === 557) //bottom right portal
                    pakaCurrentIndex = 29

                if ((pakaCurrentIndex) === 570) //bottom left portal
                    pakaCurrentIndex = 42
                squares[pakaCurrentIndex].classList.add('paka--down')
                down.classList.add('active')
                setTimeout(() => down.classList.remove('active'), 100)
                break
            default:
                squares[pakaCurrentIndex].classList.add('paka', 'paka--right')

        }
        squares[pakaCurrentIndex].classList.add('paka')
        foodEaten()
        powerStarEaten()
        checkForGameOver()
        checkForWin()
    }
    document.addEventListener('keydown', movePaka)


    //This event listener prevents the arrow keys from scrolling
    document.addEventListener('keydown', preventDefultScroll)

    // Preventing arrow keys from scrolling
    function preventDefultScroll(e) {
        if ([32, 37, 38, 39, 40, 16].indexOf(e.keyCode) > -1) {
            e.preventDefault()
        }
    }

    // what happens when food is eaten
    function foodEaten() {
        if (squares[pakaCurrentIndex].classList.contains('food')) {
            score++
            food--
            scoreDisplay.innerHTML = score
            squares[pakaCurrentIndex].classList.remove('food')
        }
    }

    //what happens when paka eat power-star
    function powerStarEaten() {
        if (squares[pakaCurrentIndex].classList.contains('power-star')) {
            // score += 100
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000)
            squares[pakaCurrentIndex].classList.remove('power-star')
        }
    }

    //make the ghosts stop flashing
    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
    }

    //create ghosts using Constructors
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.isScared = false
            this.timerId = NaN
        }
    }

    //all my ghosts
    ghosts = [
        new Ghost('donki', 276, 400),
        new Ghost('funki', 275, 200),
        new Ghost('monki', 299, 300),
        new Ghost('junki', 300, 350)
    ]

    //draw my ghosts onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
    })

    //move the Ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    function moveGhost(ghost) {
        const directions = [-1, +1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function() {
            //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
            if (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
                !squares[ghost.currentIndex + direction].classList.contains('wall')) {
                //remove the ghosts classes
                squares[ghost.currentIndex].classList.remove(ghost.className)
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                    //move into that space
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
                    //else find a new random direction ot go in
            } else direction = directions[Math.floor(Math.random() * directions.length)]

            //if the ghost is currently scared
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }

            //if the ghost is currently scared and pacman is on it
            if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = ghost.startIndex
                score += 100
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', 'scared-ghost')
            }

            //top left portal/
            if ((ghost.currentIndex) === 5) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = 533
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }
            //top right portal//
            if ((ghost.currentIndex) === 18) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = 546
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', 'scared-ghost')
            }
            //left top portal//
            if ((ghost.currentIndex - 1) === 119) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = 142
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', 'scared-ghost')
            }
            //left bottom portal//
            if ((ghost.currentIndex - 1) === 431) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = 454
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', 'scared-ghost')
            }
            //right top portal//
            if ((ghost.currentIndex + 1) === 144) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = 121
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', 'scared-ghost')
            }
            //right bottom portal//
            if ((ghost.currentIndex + 1) === 456) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = 433
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', 'scared-ghost')

            }
            // bottom left portal//
            if ((ghost.currentIndex) === 557) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = 29
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', 'scared-ghost')
            }
            //bottom right portal//
            if ((ghost.currentIndex) === 570) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = 42
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost', 'scared-ghost')
            }
            checkForGameOver()
        }, ghost.speed)
    }

    //get the coordinates of paka or ghosts on the grid with X and Y axis - USE THIS MAKE BETTER GHOSTS MOVES ??
    function getCoordinates(index) {
        return [index % width, Math.floor(index / width)]
    }

    //check for a game over
    function checkForGameOver() {
        if (squares[pakaCurrentIndex].classList.contains('ghost') &&
            !squares[pakaCurrentIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown', movePaka)

            ghosts.forEach(ghost => squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost'))
            squares[pakaCurrentIndex].classList.remove('paka')

            squares[pakaCurrentIndex].classList.add('game-over')

            clearInterval(countUpid)

            start.innerHTML = 'Play Again?'
            infoBox.innerHTML = 'YOU LOSE!'

            if (score > highScoreNumber) {
                highScoreNumber = score
                highScoreTime = time
            }
            highScore.innerHTML = `${highScoreNumber}ps in ${highScoreTime}s`
            time = time + 0
        }
    }

    //check for a win - more is when this score is reached
    function checkForWin() {
        if (food === 0) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown', movePaka)

            ghosts.forEach(ghost => squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost'))
            ghosts.forEach(ghost => squares[ghost.currentIndex].classList.add('paka-win-ghosts'))
            squares[pakaCurrentIndex].classList.add('paka-win')
            clearInterval(countUpid)

            start.innerHTML = 'Play Again?'
            infoBox.innerHTML = 'YOU WIN!'

            if (score > highScoreNumber) {
                highScoreNumber = score
                highScoreTime = time
            }
            highScore.innerHTML = `${highScoreNumber}ps in ${highScoreTime}s`
            time = time + 0

        }
    }
})


// //get the coordinates of paka or ghosts on the grid with X and Y axis
// function getCoordinates(index) {
//     return [index % widfth, Math.floor(index / width)]
// }
// console.log(getCoordinates(pakaCurrentIndex))


//     // eventlistner to start the game
// start.addEventListener('click', () => {
//     // if it says start run the game for the first time.
//     if (start.innerHTML === 'Start') {
//         startGame()
//         document.addEventListener('keyup', movePaka)
//         start.innerHTML = 'RUN!'
//         infoBox.innerHTML = 'great job!'
//         start.style.backgroundColor = 'red'
//             // if it says play again? run the game 1st > time
//     } else if (start.innerHTML === 'Play Again?') {
//         countUpid = setInterval(countUp, 1000)
//         startGame()
//     }
// })
//
// -----------TO CHANGE:---------------
//
// onclick = "window.location.reload()" -> delete & insert -> onclick = "startGame()""
// startGame and Pause game functions
// 
// improve ghost moves (not only random) - better logic to chase paka (and run towards when power-star is eaten)