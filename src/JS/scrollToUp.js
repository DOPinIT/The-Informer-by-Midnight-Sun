// Scroll //
import throttle from 'lodash.throttle';

const btnUp = {
  el: document.querySelector('.btn-up'),
  scrolling: false,
  show() {
    if (
      this.el.classList.contains('btn-up_hide') &&
      !this.el.classList.contains('btn-up_hiding')
    ) {
      this.el.classList.remove('btn-up_hide');
      this.el.classList.add('btn-up_hiding');
      window.setTimeout(() => {
        this.el.classList.remove('btn-up_hiding');
      }, 300);
    }
  },
  hide() {
    if (
      !this.el.classList.contains('btn-up_hide') &&
      !this.el.classList.contains('btn-up_hiding')
    ) {
      this.el.classList.add('btn-up_hiding');
      window.setTimeout(() => {
        this.el.classList.add('btn-up_hide');
        this.el.classList.remove('btn-up_hiding');
      }, 300);
    }
  },
  addEventListener() {
    // при прокрутці вікна (window)
    window.addEventListener(
      'scroll',
      throttle(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (this.scrolling && scrollY > 0) {
          return;
        }
        this.scrolling = false;
        // якщо користувач прокрутив біль чим 200px
        if (scrollY > 200) {
          // зробимо .btn-up видною
          this.show();
        } else {
          // в іншому випадку зкриваємо кнопку .btn-up
          this.hide();
        }
      }, 300)
    );
    // при натисканні на кнопку .btn-up
    document.querySelector('.btn-up').onclick = () => {
      this.scrolling = true;
      this.hide();
      // переміститься до верху сторінки
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
  },
};

btnUp.addEventListener();
