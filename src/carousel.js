import './style.css'

class Carousel {
  constructor (carouselContainer, autoSlide = false) {
    this.sliderIndex = 0
    this.autoSlide = autoSlide
    this.autoSlideTiming = 5E3
    this.carouselContainer = carouselContainer
    this.slideContainer = carouselContainer.querySelector('.images-container')
    this.imageTrackerDots = [];

    this.generateTrackerDots();

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

  generateTrackerDots () {
    for (let i = 0; i < this.slideContainer.children.length; i++) {
      let node = document.createElement('div');
      
      node.classList.add('dot');
      if (i === 0) {
        node.classList.add('active');
      }
      node.dataset.slideIndex = i;
      node.addEventListener('click', (event) => {
        const i = event.target.dataset.slideIndex
        this.goToSlide(i)
      })
      this.imageTrackerDots.push(node);

      this.carouselContainer.querySelector('.image-tracker').appendChild(node)
    }
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

    for (const element of this.imageTrackerDots) {
      element.classList.remove('active')
    }
    this.imageTrackerDots[this.sliderIndex].classList.add('active')
  }

  goToSlide (index) {
    this.sliderIndex = index
    this.moveCarousel()
  }
}
const carousel = new Carousel(document.querySelector('.carousel-container'), true)
carousel.autoSlideTiming = 5E3
