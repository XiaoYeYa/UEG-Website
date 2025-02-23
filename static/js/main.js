document.addEventListener('DOMContentLoaded', () => {
    // 添加页面载入动画
    document.body.classList.add('loaded');

    // 更新实时数据
    updateLiveData();
    setInterval(updateLiveData, 5000);

    // 添加滚动动画
    const scrollElements = document.querySelectorAll('.scroll-animate');
    window.addEventListener('scroll', () => {
        scrollElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    });
});

// 更新实时数据
function updateLiveData() {
    // 模拟实时数据更新
    const now = new Date();
    const engineStatus = document.querySelector('.status');
    const progressBar = document.querySelector('.progress');
    const flightData = document.querySelector('.flight-data');

    if (engineStatus && progressBar && flightData) {
        // 随机生成发动机状态
        const statusValue = Math.random();
        if (statusValue > 0.95) {
            engineStatus.textContent = '警告：性能波动';
            engineStatus.style.color = 'var(--warning-color)';
            progressBar.style.width = '75%';
            progressBar.style.backgroundColor = 'var(--warning-color)';
        } else {
            engineStatus.textContent = '运行正常';
            engineStatus.style.color = 'var(--success-color)';
            progressBar.style.width = '92%';
            progressBar.style.backgroundColor = 'var(--success-color)';
        }

        // 更新飞行数据
        const speed = (12.5 + Math.random() * 0.5).toFixed(2);
        const distance = (147570000 - Math.random() * 1000).toFixed(0);
        flightData.innerHTML = `
            <li>当前速度: ${speed} km/s</li>
            <li>距离木星: ${distance} km</li>
            <li>预计到达时间: 2044-07-15</li>
        `;
    }
}

// 检查元素是否在视口中
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 添加警告消息自动消失
const alerts = document.querySelectorAll('.alert');
alerts.forEach(alert => {
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}); 