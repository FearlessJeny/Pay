document.querySelectorAll('.whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        let card = this.closest('.profile-card');
        let img = card.querySelector('img');
        let altText = img.getAttribute('alt'); // <-- берём ALT из фото

        let phone = this.getAttribute('data-phone');
        let baseText = "Привет! Смотри фото:"; // твой текст
        let text = `${baseText} ${altText}`;

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    });
});



document.querySelectorAll('.panorama-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const images = JSON.parse(this.getAttribute('data-images'));
        let current = 0;

        // Создаём модалку
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <span class="close">&times;</span>
            <span class="prev">&#10094;</span>
            <img src="${images[current]}" alt="panorama">
            <span class="next">&#10095;</span>
        `;
        document.body.appendChild(modal);

        const modalImg = modal.querySelector('img');

        function showImage(index) {
            modalImg.src = images[index];
        }

        modal.querySelector('.close').onclick = () => modal.remove();
        modal.querySelector('.prev').onclick = () => {
            current = (current - 1 + images.length) % images.length;
            showImage(current);
        }
        modal.querySelector('.next').onclick = () => {
            current = (current + 1) % images.length;
            showImage(current);
        }

        // Свайп для телефонов
        let startX = 0;
        modalImg.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
        modalImg.addEventListener('touchend', e => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) { // свайп влево
                current = (current + 1) % images.length;
                showImage(current);
            } else if (endX - startX > 50) { // свайп вправо
                current = (current - 1 + images.length) % images.length;
                showImage(current);
            }
        });
    });
});



document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        const descBlock = document.querySelector(`#product-descriptions .description[data-id="${id}"]`);
        const description = descBlock ? descBlock.innerHTML : "Описание отсутствует";

        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.classList.add('modal-description');
        modal.innerHTML = `
            <div class="content">
                <span class="close">&times;</span>
                <p>${description}</p>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close').onclick = () => modal.remove();
    });
});
