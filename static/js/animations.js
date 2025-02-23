// 数字动画类
class NumberAnimation {
    constructor(element, endValue, duration = 2000, prefix = '', suffix = '') {
        this.element = element;
        this.startValue = 0;
        this.endValue = endValue;
        this.duration = duration;
        this.prefix = prefix;
        this.suffix = suffix;
        this.startTime = null;
    }

    start() {
        this.startTime = performance.now();
        requestAnimationFrame(this.update.bind(this));
    }

    update(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        const progress = (currentTime - this.startTime) / this.duration;

        if (progress < 1) {
            const currentValue = Math.floor(this.endValue * this.easeOutExpo(progress));
            this.element.textContent = this.prefix + this.formatNumber(currentValue) + this.suffix;
            requestAnimationFrame(this.update.bind(this));
        } else {
            this.element.textContent = this.prefix + this.formatNumber(this.endValue) + this.suffix;
        }
    }

    easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// 页面加载动画
class PageTransition {
    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        document.body.appendChild(this.overlay);
    }

    show() {
        this.overlay.style.opacity = '1';
        this.overlay.style.transform = 'scaleY(1)';
    }

    hide() {
        this.overlay.style.transform = 'scaleY(0)';
        setTimeout(() => {
            this.overlay.style.opacity = '0';
        }, 500);
    }
}

// 视差滚动效果
class ParallaxEffect {
    constructor(element, speed = 0.5) {
        this.element = element;
        this.speed = speed;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * this.speed;
            this.element.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// 卡片悬浮效果
class HoverEffect {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        this.element.style.transition = 'transform 0.1s ease';
    }

    handleMouseLeave() {
        this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        this.element.style.transition = 'transform 0.5s ease';
    }
}

// 进度条动画
class ProgressAnimation {
    constructor(element, endValue, duration = 2000) {
        this.element = element;
        this.endValue = endValue;
        this.duration = duration;
    }

    start() {
        this.element.style.width = '0%';
        setTimeout(() => {
            this.element.style.width = this.endValue + '%';
            this.element.style.transition = `width ${this.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        }, 100);
    }
}

// 导出所有动画类
window.UEGAnimations = {
    NumberAnimation,
    PageTransition,
    ParallaxEffect,
    HoverEffect,
    ProgressAnimation
}; 