const carousel = document.querySelector('.carousel')
const firstImg = carousel.querySelectorAll('img')[0]
const arrowIcons = document.querySelectorAll('.wrapper i')
let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  positionDiff

let firstImgWidth = firstImg.clientWidth + 14
let scrollWidth = carousel.scrollWidth - carousel.clientWidth

const showHideIcons = () => {
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block'
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? 'none' : 'block'
}

const autoSlide = () => {
  positionDiff = Math.abs(positionDiff)
  let firstImgWidth = firstImg.clientWidth + 14
  let valDifference = firstImgWidth - positionDiff

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff)
  }
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff
}

arrowIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
    setTimeout(() => showHideIcons(), 60)
  })
})

const dragging = e => {
  if (!isDragStart) return
  e.preventDefault()
  carousel.classList.add('dragging')
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
  carousel.scrollLeft = prevScrollLeft - positionDiff
  showHideIcons()
}

const dragStart = e => {
  isDragStart = true
  prevPageX = e.pageX || e.touches[0].pageX
  prevScrollLeft = carousel.scrollLeft
}

const dragStop = () => {
  isDragStart = false
  carousel.classList.remove('dragging')
  autoSlide()
}

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('touchstart', dragging)

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('touchmove', dragStart)

carousel.addEventListener('mouseup', dragStop)
carousel.addEventListener('mouseleave', dragStop)
carousel.addEventListener('touchend', dragStop)
