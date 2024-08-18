let isScrolling = false;
let isMouseMoving = false;

// Обработчик прокрутки
function onScroll() {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(() => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const maxScaleFactor = 6; // Максимальное увеличение размера градиента
      const gradientContainer = document.querySelector('.main__gradient-container');
      
      const initialLeft = 100; 
      const initialTop = 100; 

      // Вычисление целевой позиции центра по оси X
      const centeredLeftPosition = (window.innerWidth - gradientContainer.offsetWidth) / 2;

      // Прогресс смещения от начального положения до центра
      const scrollableHeight = window.innerHeight - initialTop;
      const progressToCenter = Math.min(scrollPosition / scrollableHeight, 1);

      // Новая позиция left с учетом прогресса и смещения
      const newLeft =  progressToCenter * (centeredLeftPosition - initialLeft);

      // Увеличение размера градиентного круга
      const scaleValue = 1 + (scrollPosition / maxScroll) * (maxScaleFactor - 1);

      // Применение стилей с учетом трансформации, только по оси X
      gradientContainer.style.transform = `translateX(${newLeft}px) rotate(200deg) scale(${scaleValue})`;
      gradientContainer.style.top = `${initialTop}px`; 

      isScrolling = false;
    });
  }
}

// Обработчик движения мыши
function onMouseMove(e) {
  if (!isMouseMoving) {
    isMouseMoving = true;
    requestAnimationFrame(() => {
      const gradientContainer = document.querySelector('.main__gradient-container');
      const glow = document.querySelector('.main__glow');

      const containerRect = gradientContainer.getBoundingClientRect();
      const mouseX = e.clientX - (containerRect.left + containerRect.width / 2);
      const mouseY = e.clientY - (containerRect.top + containerRect.height / 2);

      const parallaxFactor = 2; // Уменьшен фактор параллакса для большей амплитуды движения
      const glowX = -mouseX / parallaxFactor; // Инвертируем направление движения по X
      const glowY = -mouseY / parallaxFactor; // Инвертируем направление движения по Y

      glow.style.transform = `translate(calc(-50% + ${glowX}px), calc(-50% + ${glowY}px))`;

      isMouseMoving = false;
    });
  }
}

// Оптимизация частоты вызовов
let scrollTimeout;
document.addEventListener('scroll', () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(onScroll, 10); // Устанавливаем задержку в 10 мс
});

document.addEventListener('mousemove', onMouseMove);
