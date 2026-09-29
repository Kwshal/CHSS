const squaresElements = document.querySelectorAll('.square')

let color = 'white'
let count = 0

Array.from(squaresElements).forEach(square => {
     square.classList.add(color)
     if (count % 8 !== 7) {
          color = color === 'white' ? 'black' : 'white'
     }
     count++
})