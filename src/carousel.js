import './style.css'

let imageIndex = 0
const imageContainer = document.querySelector('.images-container')
const imageTracker = document.querySelector('.image-tracker')

function moveCarousel () {
  for (const element of imageContainer.children) {
    element.style.transform = `translateX(-${imageIndex * 100}%)`
  }

  for (const element of imageTracker.children) {
    element.classList.remove('active')
  }
  imageTracker.children[imageIndex].classList.add('active')
}

function skipToSlide (event) {
  const slideIndex = +event.target.dataset.slideIndex
  imageIndex = slideIndex
  moveCarousel()
}

document.querySelectorAll('.image-tracker > .dot').forEach(element => element.addEventListener('click', skipToSlide))
document.querySelector('.carousel .change-carousel-item.arrow-left').addEventListener('click', (_) => {
  imageIndex--
  if (imageIndex < 0) {
    imageIndex = imageContainer.children.length - 1
  }
  moveCarousel()
})
document.querySelector('.carousel .change-carousel-item.arrow-right').addEventListener('click', (_) => {
  imageIndex++
  if (imageIndex >= imageContainer.children.length) {
    imageIndex = 0
  }
  moveCarousel()
})
