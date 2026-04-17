// Force scroll to top on every page load (fixes browser scroll restoration)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

    // 1. Curtain Opening Effect
    const curtain = document.getElementById('curtain-overlay');
    if (curtain) {
        document.documentElement.classList.add('curtain-active');

        setTimeout(() => {
            curtain.classList.add('open');

            setTimeout(() => {
                curtain.style.display = 'none';
                document.documentElement.classList.remove('curtain-active');
                // Unlock scroll — remove inline overflow:hidden from <html>
                document.documentElement.style.overflow = '';
            }, 1500);
        }, 1800);
    }



    // 2. Scroll Reveal — JS adds .scroll-hidden first, then observer adds .visible
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        // Skip the hero — it should always be visible
        if (section.querySelector('.hero') || section.classList.contains('hero')) return;
        section.classList.add('scroll-hidden');
        observer.observe(section);
    });

    // 3. Countdown Timer
    const weddingDate = new Date('April 26, 2026 13:30:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days.toString().padStart(2, '0');
            hoursEl.innerText = hours.toString().padStart(2, '0');
            minutesEl.innerText = minutes.toString().padStart(2, '0');
            secondsEl.innerText = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(timerInterval);
                const timerContainer = document.getElementById('timer');
                if (timerContainer) timerContainer.innerHTML = "DANH CHO HAN PHUC!";
            }
        };

        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    }

    // 4. Music Player
    const musicToggle = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicToggle && audio) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                musicToggle.classList.remove('playing');
            } else {
                audio.play().catch(e => console.log('Autoplay blocked'));
                musicToggle.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });
    }

    // 5. RSVP Form
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(rsvpForm);
            const data = Object.fromEntries(formData.entries());
            console.log('RSVP Received:', data);
            alert('Cảm ơn bạn đã xác nhận tham dự! Hẹn gặp bạn tại lễ cưới.');
            rsvpForm.reset();
        });
    }

    // 6. Gallery Lightbox & Album Logic
    const images = [
        "QUYNH & VIET_/AN_00581.jpg", "QUYNH & VIET_/AN_00616.jpg", "QUYNH & VIET_/AN_00643.jpg", 
        "QUYNH & VIET_/AN_00682.jpg", "QUYNH & VIET_/AN_00740.jpg", "QUYNH & VIET_/AN_00840.jpg", 
        "QUYNH & VIET_/AN_00871.jpg", "QUYNH & VIET_/AN_00917.jpg", "QUYNH & VIET_/AN_00944.jpg", 
        "QUYNH & VIET_/AN_00950.jpg", "QUYNH & VIET_/AN_00983.jpg", "QUYNH & VIET_/AN_00989.jpg", 
        "QUYNH & VIET_/AN_01047.jpg", "QUYNH & VIET_/AN_01185.jpg", "QUYNH & VIET_/AN_01207.jpg", 
        "QUYNH & VIET_/AN_01246.jpg", "QUYNH & VIET_/AN_01342.jpg", "QUYNH & VIET_/AN_01393.jpg", 
        "QUYNH & VIET_/AN_01451.jpg", "QUYNH & VIET_/AN_01521.jpg", "QUYNH & VIET_/AN_01531.jpg", 
        "QUYNH & VIET_/AN_01845.jpg", "QUYNH & VIET_/AN_01873.jpg", "QUYNH & VIET_/AN_01884.jpg", 
        "QUYNH & VIET_/AN_01887.jpg", "QUYNH & VIET_/AN_01990.jpg", "QUYNH & VIET_/AN_02053.jpg", 
        "QUYNH & VIET_/AN_02075.jpg", "QUYNH & VIET_/AN_02089.jpg", "QUYNH & VIET_/AN_02275.jpg", 
        "QUYNH & VIET_/AN_02289.jpg", "QUYNH & VIET_/AN_02339.jpg", "QUYNH & VIET_/AN_02341.jpg", 
        "QUYNH & VIET_/AN_02348.jpg", "QUYNH & VIET_/AN_02362.jpg", "QUYNH & VIET_/AN_02452.jpg", 
        "QUYNH & VIET_/AN_02465.jpg", "QUYNH & VIET_/AN_02486.jpg", "QUYNH & VIET_/AN_02520.jpg", 
        "QUYNH & VIET_/AN_02902.jpg", "QUYNH & VIET_/Album 25x35_01.jpg", "QUYNH & VIET_/Album 25x35_02.jpg",
        "QUYNH & VIET_/Album 25x35_08.jpg", "QUYNH & VIET_/Album 25x35_09.jpg", "QUYNH & VIET_/Album 25x35_10.jpg",
        "QUYNH & VIET_/Album 25x35_12.jpg", "QUYNH & VIET_/Album 25x35_14.jpg", "QUYNH & VIET_/Album 25x35_16.jpg",
        "QUYNH & VIET_/Album 25x35_18.jpg", "QUYNH & VIET_/Album 25x35_20.jpg"
    ];

    let current = 0;

    // Attach to window to make them global for onclick
    window.updateImage = function() {
        const main = document.getElementById("mainImage");
        if (main) main.src = images[current];

        document.querySelectorAll(".album-thumbs img").forEach((img, i) => {
            img.classList.toggle("active", i === current);
            // Auto scroll thumbnail into center — container only, NOT the whole page
            if (i === current) {
                const container = img.parentElement;
                if (container) {
                    const scrollPos = img.offsetLeft - container.offsetWidth / 2 + img.offsetWidth / 2;
                    container.scrollTo({ left: scrollPos, behavior: 'smooth' });
                }
            }
        });
    }

    window.nextImage = function() {
        current = (current + 1) % images.length;
        window.updateImage();
    }

    window.prevImage = function() {
        current = (current - 1 + images.length) % images.length;
        window.updateImage();
    }

    window.setImage = function(idx) {
        current = idx;
        window.updateImage();
    }

    // Dynamic generation of thumbnails
    const thumbsContainer = document.getElementById("thumbs");
    if (thumbsContainer) {
        images.forEach((imgSrc, i) => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.onclick = () => window.setImage(i);
            thumbsContainer.appendChild(img);
        });
    }

    // Swipe Support for Main Image
    const mainBox = document.querySelector(".album-main");
    if (mainBox) {
        let touchstartX = 0;
        let touchendX = 0;
        
        mainBox.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, false);

        mainBox.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleGesture();
        }, false);

        function handleGesture() {
            if (touchendX < touchstartX - 50) window.nextImage();
            if (touchendX > touchstartX + 50) window.prevImage();
        }
    }

    window.updateImage();

});

