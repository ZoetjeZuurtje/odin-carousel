import './style.css'

class Carousel {
  constructor (carouselContainer, autoSlide = false) {
    this.sliderIndex = 0
    this.autoSlide = autoSlide
    this.autoSlideTiming = 5E3
    this.carouselContainer = carouselContainer
    this.slideContainer = carouselContainer.querySelector('.images-container')
    this.imageTracker = carouselContainer.querySelector('.image-tracker')

    carouselContainer.querySelectorAll('.image-tracker > .dot').forEach((element) => element.addEventListener('click', (event) => {
      const i = event.target.dataset.slideIndex
      this.goToSlide(i)
    }))

    carouselContainer.querySelector('.change-carousel-item.arrow-right').addEventListener('click', () => {
      this.increaseIndex()
      this.moveCarousel()
    })
    carouselContainer.querySelector('.change-carousel-item.arrow-left').addEventListener('click', () => {
      this.decreaseIndex()
      this.moveCarousel()
    })

    setInterval(() => {
      if (autoSlide) {
        this.increaseIndex()
        this.moveCarousel()
      }
    }, this.autoSlideTiming)
  }

  increaseIndex () {
    this.sliderIndex++
    if (this.sliderIndex >= this.slideContainer.children.length) {
      this.sliderIndex = 0
    }
  }

  decreaseIndex () {
    this.sliderIndex--
    if (this.sliderIndex < 0) {
      this.sliderIndex = this.slideContainer.children.length - 1
    }
  }

  moveCarousel = () => {
    for (const element of this.slideContainer.children) {
      element.style.transform = `translateX(-${this.sliderIndex * 100}%)`
    }

    for (const element of this.imageTracker.children) {
      element.classList.remove('active')
    }
    this.imageTracker.children[this.sliderIndex].classList.add('active')
  }

  goToSlide (index) {
    this.sliderIndex = index
    this.moveCarousel()
  }
}
const carousel = new Carousel(document.querySelector('.carousel-container'), true)
carousel.autoSlideTiming = 5E3
