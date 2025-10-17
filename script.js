document.addEventListener('DOMContentLoaded', () => {
    // --- Universal Functions ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', e => {
        // ✨ UPDATED: Changed from e.pageY/pageX to e.clientY/clientX
        // This positions the cursor relative to the visible screen, not the whole page, fixing the scroll issue.
        cursor.setAttribute("style", `top: ${e.clientY}px; left: ${e.clientX}px;`);
    });

    const heartsContainer = document.querySelector('.hearts-container');
    if (heartsContainer) {
        for (let i = 0; i < 20; i++) { createHeart(); }
        for (let i = 0; i < 20; i++) { createSparkle(); }
    }
    function createHeart() {
        const heart = document.createElement('div'); heart.className = 'heart'; heart.innerHTML = '🩷'; heart.style.left = `${Math.random() * 100}vw`; heart.style.animationDuration = `${Math.random() * 5 + 5}s`; heart.style.animationDelay = `${Math.random() * 5}s`; heartsContainer.appendChild(heart);
    }
    function createSparkle() {
        const sparkle = document.createElement('div'); sparkle.className = 'sparkle'; sparkle.style.left = `${Math.random() * 100}vw`; sparkle.style.top = `${Math.random() * 100}vh`; sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`; sparkle.style.animationDelay = `${Math.random() * 3}s`; heartsContainer.appendChild(sparkle);
    }
    const loveButton = document.getElementById('loveButton');
    if (loveButton) { loveButton.addEventListener('click', () => { for (let i = 0; i < 10; i++) { createBurstEmoji(); } }); }
    function createBurstEmoji() {
        const emoji = document.createElement('div'); emoji.className = 'burst-emoji'; emoji.innerHTML = '💖'; document.body.appendChild(emoji); emoji.addEventListener('animationend', () => { emoji.remove(); });
    }

    // --- Page-Specific Logic ---
    const envelope = document.getElementById('envelope');
    if (envelope) {
        const letter = document.getElementById('letter');
        const letterTextElement = document.getElementById('letterText');
        const closeLetterBtn = document.getElementById('close-letter');
        
        const originalHTML = letterTextElement.innerHTML;
        letterTextElement.innerHTML = ''; 

        envelope.addEventListener('click', () => {
            document.body.classList.add('no-scroll');
            envelope.classList.add('open');
            letter.classList.add('show');
            
            document.querySelector('.click-hint').style.display = 'none';
            document.getElementById('navbar').classList.add('visible');
            document.getElementById('music-toggle').style.display = 'block';

            const music = document.getElementById('background-music');
            music.play().catch(error => console.log("Autoplay blocked:", error));
            
            letterTextElement.innerHTML = '';
            let i = 0;
            function typeWriter() {
                if (i < originalHTML.length) {
                    if (originalHTML.charAt(i) === '<') {
                        const closingTagIndex = originalHTML.indexOf('>', i);
                        if (closingTagIndex !== -1) {
                            const tag = originalHTML.substring(i, closingTagIndex + 1);
                            letterTextElement.innerHTML += tag;
                            i = closingTagIndex + 1;
                        } else {
                            letterTextElement.innerHTML += originalHTML.charAt(i);
                            i++;
                        }
                    } else {
                        letterTextElement.innerHTML += originalHTML.charAt(i);
                        i++;
                    }
                    setTimeout(typeWriter, 50);
                }
            }
            setTimeout(typeWriter, 500); 
        });

        closeLetterBtn.addEventListener('click', () => {
            document.body.classList.remove('no-scroll');
            letter.classList.remove('show');
            envelope.classList.remove('open');
            document.querySelector('.click-hint').style.display = 'block';
        });
        
        const musicToggle = document.getElementById('music-toggle');
        const backgroundMusic = document.getElementById('background-music');
        musicToggle.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play(); musicToggle.textContent = '🔊';
            } else {
                backgroundMusic.pause(); musicToggle.textContent = '🔇';
            }
        });
    }

    // (The rest of the script is unchanged)
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');
        galleryItems.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.dataset.caption;
            });
        });
        const closeLightbox = () => { lightbox.style.display = 'none'; };
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { closeLightbox(); }
        });
    }

    const birthdayContainer = document.querySelector('.birthday-container');
    if (birthdayContainer) {
        const confettiContainer = document.getElementById('confetti-container');
        const emojiContainer = document.querySelector('.floating-emojis');
        const replayBtn = document.getElementById('replay-animation');
        const emojis = ['🎉', '💕', '🎂', '🎁', '✨', '🥳', '💖', '🌸'];
        const colors = ['#ffc0cb', '#e6e6fa', '#ffdab9', '#ffffff'];
        function createConfetti() {
            const confetti = document.createElement('div'); confetti.className = 'confetti'; confetti.style.left = `${Math.random() * 100}vw`; confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; const piece = document.createElement('div'); piece.style.width = `${Math.random() * 10 + 5}px`; piece.style.height = `${Math.random() * 10 + 5}px`; piece.style.backgroundColor = 'inherit'; confetti.appendChild(piece); confettiContainer.appendChild(confetti); setTimeout(() => { confetti.remove(); }, 5000);
        }
        function createFloatingEmoji() {
            const emoji = document.createElement('div'); emoji.className = 'emoji'; emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)]; emoji.style.left = `${Math.random() * 100}vw`; emoji.style.animationDuration = `${Math.random() * 5 + 8}s`; emojiContainer.appendChild(emoji); setTimeout(() => { emoji.remove(); }, 13000);
        }
        function runAnimations() {
            confettiContainer.innerHTML = ''; emojiContainer.innerHTML = ''; for (let i = 0; i < 100; i++) { createConfetti(); } for (let i = 0; i < 30; i++) { createFloatingEmoji(); }
        }
        runAnimations();
        replayBtn.addEventListener('click', runAnimations);
        const musicToggle = document.getElementById('music-toggle');
        const birthdayMusic = document.getElementById('birthday-music');
        musicToggle.addEventListener('click', () => {
            if (birthdayMusic.paused) {
                birthdayMusic.play(); musicToggle.textContent = '🔊';
            } else {
                birthdayMusic.pause(); musicToggle.textContent = '🔇';
            }
        });
    }
});