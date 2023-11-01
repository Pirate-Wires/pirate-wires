/* eslint-disable */
import { gsap } from 'gsap';
import isMobile from 'ismobilejs';

export class ScrollBasedAnims {
  constructor(options = {}) {
    const mobile = isMobile(window.navigator).any;
    if(mobile && !document.body.classList.contains("touch")) {
      document.body.classList.add('touch');
    }

    this.bindMethods();

    this.el = document.documentElement;

    this.thisPagesTLs = [];
    this.offsetVal = 0;
    this.body = document.body;
    this.direction = 'untouched';
    this.transitioning = false;
    this.isMobile = false;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.header = document.getElementById('header');

    const {
      dataFromElems = document.querySelectorAll('[data-from]'),
      dataHeroFromElems = document.querySelectorAll('[data-h-from]'),
      heroMeasureEl = document.querySelector('.hero-measure-el'),
      scrollBasedElems = document.querySelectorAll('[data-entrance]'),
      threshold = 0.01,
    } = options;

    this.dom = {
      el: this.el,
      dataFromElems: dataFromElems,
      dataHeroFromElems: dataHeroFromElems,
      scrollBasedElems: scrollBasedElems,
      heroMeasureEl: heroMeasureEl,
    };

    this.dataFromElems = null;
    this.dataHeroFromElems = null;
    this.scrollBasedElems = null;

    this.raf = null;

    this.state = {
      resizing: false,
    };

    let startingScrollTop = this.el.scrollTop;
    this.data = {
      threshold: threshold,
      current: startingScrollTop,
      target: 0,
      last: startingScrollTop,
      ease: 0.12,
      height: 0,
      max: 0,
      scrollY: startingScrollTop,
    };

    let length = this.dom.scrollBasedElems.length;

    for (let i = 0; i < length; i++) {
      const entranceEl = this.dom.scrollBasedElems[i];
      const entranceType = entranceEl.dataset.entrance;
      const entranceTL = new gsap.timeline({ paused: true });
      let staggerEls;

      switch (entranceType) {
        case 'stagger-fade':
          staggerEls = entranceEl.querySelectorAll('.s-el');

          entranceTL
            .fromTo(staggerEls, { y: 25 }, {duration: 0.6, stagger: 0.06, y: 0, ease: 'sine.inOut', force3D: true,}, 0)
            .fromTo(staggerEls, { opacity: 0 }, { duration: 0.58, stagger: 0.06, clearProps: 'transform', opacity: 1, ease: 'sine.inOut', force3D: true,}, 0.02
            );

          this.thisPagesTLs.push(entranceTL);
          break;

        case 'basic-fade':
          entranceTL
            .fromTo(entranceEl, { y: 25 }, { duration: 0.6, y: 0, ease: 'sine.inOut', force3D: true })
            .fromTo(entranceEl, { opacity: 0 }, {duration: 0.58, opacity: 1, clearProps: 'transform', ease: 'sine.inOut', force3D: true,}, 0.02);

          this.thisPagesTLs.push(entranceTL);
          break;
      }
    }

    this.init();
  }

  bindMethods() {
    ['run', 'event', 'resize'].forEach(
      (fn) => (this[fn] = this[fn].bind(this))
    );
  }

  init() {
    this.on();
  }

  on() {
    document.addEventListener('scroll', this.event, true);
    this.getBounding();
    this.getCache();
    this.requestAnimationFrame();
  }

  event() {
    if (this.data.transitioning) { return }
    this.data.scrolling = true;
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.data.scrolling = false;
    }, 300);
  }

  run() {
    if (this.state.resizing || this.transitioning) return;
    this.data.scrollY = this.el.scrollTop;
    if (this.isMobile) {
      this.data.current = this.data.scrollY;
    } else {
      this.data.current += Math.round(
        (this.data.scrollY - this.data.current) * this.data.ease
      );
    }

    this.getDirection();
    this.data.last = this.data.current;
    this.checkScrollBasedLoadins();
    this.animateDataHeroFromElems();
    this.animateDataFromElems();
    this.hideShowHeader();
    this.playPauseVideos();
    this.requestAnimationFrame();
  }

  getDirection() {
    if (this.data.last - this.data.scrollY < 0) {
      // DOWN
      if (this.direction === 'down' || this.data.scrollY <= 0) {
        return;
      }
      this.direction = 'down';
    } else if (this.data.last - this.data.scrollY > 0) {
      // UP
      if (this.direction === 'up') {
        return;
      }
      this.direction = 'up';
    }
  }

  playPauseVideos(force = false) {
    if ((this.direction === 'untouched' && !force) || this.videosDataLength === 0) return;
    for (let i = 0; i < this.videosDataLength; i++) {
      let data = this.videosData[i];
      let { isVisible } = this.isVisible(data, 50);
      if (isVisible) {
        if (!data.playing) {
          data.el.play();
          data.playing = true;
        }
      } else if (!isVisible && data.playing) {
        data.el.pause();
        data.el.currentTime = 0;
        data.playing = false;
      }
    }
  }

  getVideos() {
    let playPauseVideos = document.querySelectorAll('video.auto');
    this.videosData = [];
    for (let i = 0; i < playPauseVideos.length; i++) {
      const video = playPauseVideos[i];
      let stickyVideo = video.classList.contains('sticky-video');
      if (stickyVideo) {
        video.defaultPlaybackRate = 0.5;
        video.playbackRate = 0.5;
      }

      let bounds = video.getBoundingClientRect();
      this.videosData.push({
        el: video,
        playing: false,
        top: bounds.top + this.data.scrollY,
        bottom: bounds.bottom + this.data.scrollY,
      });
    }
    this.videosDataLength = this.videosData.length;
  }

  getScrollBasedSections() {
    if (!this.dom.scrollBasedElems) return;
    this.scrollBasedElems = [];
    let length = this.dom.scrollBasedElems.length;
    for (let i = 0; i < length; i++) {
      if (i < this.offsetVal) {continue;}
      let el = this.dom.scrollBasedElems[i];
      const bounds = el.getBoundingClientRect();
      this.scrollBasedElems.push({
        el: el,
        played: false,
        top: bounds.top + this.data.scrollY,
        bottom: bounds.bottom + this.data.scrollY,
        height: bounds.bottom - bounds.top,
        offset: this.windowWidth < 768 ? el.dataset.offsetMobile * this.windowHeight : el.dataset.offset * this.windowHeight,
      });
    }
  }

  getDataFromElems() {
    if (!this.dom.dataFromElems) return;

    this.dataFromElems = [];

    let useMobile = this.windowWidth < 768;

    let length = this.dom.dataFromElems.length;
    for (let i = 0; i < length; i++) {
      let el = this.dom.dataFromElems[i];

      let from, to, dur;
      const bounds = el.getBoundingClientRect();
      const tl = new gsap.timeline({ paused: true });

      if (useMobile) {
        from = el.dataset.mobileFrom ? JSON.parse(el.dataset.mobileFrom) : JSON.parse(el.dataset.from);
        to = el.dataset.mobileTo ? JSON.parse(el.dataset.mobileTo) : JSON.parse(el.dataset.to);
        if (el.dataset.mobileDur) {
          dur = el.dataset.mobileDur;
        } else {
          dur = el.dataset.dur ? el.dataset.dur : 1;
        }
      } else {
        from = JSON.parse(el.dataset.from);
        to = JSON.parse(el.dataset.to);
        dur = el.dataset.dur ? el.dataset.dur : 1;
      }

      to.force3D = true;

      tl.fromTo(el, 1, from, to);

      this.dataFromElems.push({
        el: el,
        tl: tl,
        top: bounds.top + this.data.scrollY + (el.dataset.delay ? this.windowHeight * parseFloat(el.dataset.delay) : 0),
        bottom: bounds.bottom + this.data.scrollY + (el.dataset.delay ? this.windowHeight * parseFloat(el.dataset.delay) : 0),
        height: bounds.bottom - bounds.top,
        from: from,
        duration: dur,
        progress: {
          current: 0,
        },
      });
    }
  }

  getHeroMeasureEl() {
    if (!this.dom.heroMeasureEl) return;
    const el = this.dom.heroMeasureEl;
    const bounds = el.getBoundingClientRect();
    let timeline = false;

    let heroMedia = document.getElementById('hero-media');
    const heroContent = document.querySelectorAll('.hero-content');

    timeline = new gsap.timeline({ paused: true });
    timeline
      .fromTo(heroMedia, { scale: 1 }, { scale: 1.2, ease: 'none' })
      .fromTo(heroContent, { scale: 1 }, { scale: 1.2, ease: 'none' }, 0);

    this.heroMeasureData = {
      tl: timeline,
      top: bounds.top + this.data.scrollY,
      bottom: bounds.bottom + this.data.scrollY,
      height: bounds.bottom - bounds.top,
      progress: {
        current: 0,
      },
    };
  }

  animateDataHeroFromElems() {
    if (this.direction === 'untouched' || !this.heroMeasureData) return;
    const { isVisible } = this.isVisible(this.heroMeasureData, 100);
    if (!isVisible) return;
    let percentageThrough = parseFloat(
      (this.data.current / this.heroMeasureData.height).toFixed(3)
    );

    if (percentageThrough <= 0.007) {
      percentageThrough = 0;
    } else if (percentageThrough >= 1) {
      percentageThrough = 1;
    }

    this.heroMeasureData.tl.progress(percentageThrough);
  }

  animateDataFromElems() {
    if (this.direction === 'untouched' || !this.dataFromElems) return;

    let length = this.dataFromElems.length;
    for (let i = 0; i < length; i++) {
      let data = this.dataFromElems[i];

      const { isVisible, start, end } = this.isVisible(data, 100);

      if (isVisible) {
        this.intersectRatio(data, start, end);

        data.tl.progress(data.progress.current);
      }
    }
  }

  checkScrollBasedLoadins() {
    if (this.direction === 'untouched' || !this.scrollBasedElems) {
      return;
    }
    if (this.thisPagesTLs.length !== this.offsetVal) {
      let length = this.scrollBasedElems.length;
      for (let i = 0; i < length; i++) {
        let data = this.scrollBasedElems[i];

        if (data.played) {
          continue;
        }

        if (this.data.scrollY + data.offset > data.top) {
          this.thisPagesTLs[i].play();
          this.offsetVal++;
          data.played = true;
        }
      }
    }
  }

  intersectRatio(data, top, bottom) {
    const start = top - this.data.height;

    if (start > 0) {
      return;
    }
    const end = (this.data.height + bottom + data.height) * data.duration;
    data.progress.current = Math.abs(start / end);
    data.progress.current = Math.max(0, Math.min(1, data.progress.current));
  }

  isVisible(bounds, offset) {
    const threshold = !offset ? this.data.threshold : offset;
    const start = bounds.top - this.data.current;
    const end = bounds.bottom - this.data.current;
    const strictStart = bounds.top - this.data.scrollY;
    const strictEnd = bounds.bottom - this.data.scrollY;
    const isVisible = strictStart < threshold + this.data.height && strictEnd > -threshold;
    return {
      isVisible,
      start,
      end,
    };
  }

  requestAnimationFrame() {
    this.raf = requestAnimationFrame(this.run);
  }

  cancelAnimationFrame() {
    cancelAnimationFrame(this.raf);
  }

  getCache() {
    this.getVideos();
    this.getScrollBasedSections();
    this.getDataFromElems();
    this.getHeroMeasureEl();
    gsap.to(this.header, {y: 0, autoAlpha: 1, ease: 'sine.inOut', duration: 0.4, force3D: true});
  }

  hideShowHeader() {
    if (this.direction === 'untouched') {
      return;
    }

    if (this.direction === 'down' && !this.headerScrolled && this.data.scrollY >= 100) {
      this.headerScrolled = true;
      gsap.to(this.header, {y: -30, autoAlpha: 0, ease: 'sine.inOut', duration: 0.3, force3D: true});
    } else if (this.direction === 'up' && this.headerScrolled) {
      gsap.to(this.header, {y: 0, autoAlpha: 1, ease: 'sine.inOut', duration: 0.3, force3D: true});
      this.headerScrolled = false;
    }
  }

  getBounding() {
    this.data.height = this.windowHeight;
    this.data.max = Math.floor(this.el.getBoundingClientRect().height - this.data.height + this.data.scrollY);
  }

  resize(omnibar = false) {
    if (this.state.resizing) {
      return;
    }
    this.state.resizing = true;
    if (!omnibar) {
      this.getCache();
      this.getBounding();
    }
    this.state.resizing = false;
  }

  scrollTo(val, dur = 1, ease = 'expo.inOut', fn = false) {
    this.state.scrollingTo = true;
    gsap.to(this.el, {
      scrollTop: val,
      duration: dur,
      ease: ease,
      onComplete: () => {
        this.state.scrollingTo = false;
        if (fn) fn();
      },
    });
  }

  destroy() {
    this.transitioning = true;
    console.log("destroying")
    document.removeEventListener('scroll', this.event, true);

    this.state.rafCancelled = true;
    this.cancelAnimationFrame();

    this.resize = null;

    this.dom = null;
    this.data = null;
    this.raf = null;
  }
}
