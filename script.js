document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = 'var(--navbar-height)';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(4, 6, 11, 0.95)';
        navLinks.style.padding = '2rem';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.padding = '0';
            navLinks.style.background = 'transparent';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealSections = document.querySelectorAll('.reveal-section');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const revealOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    // 4. Interactive Quiz Logic
    const quizData = [
        {
            question: "Which accounting approach is considered 'rules-based'?",
            options: ["IFRS", "US GAAP", "Both", "Neither"],
            correct: 1 // US GAAP
        },
        {
            question: "Under which standard is the LIFO inventory valuation method prohibited?",
            options: ["US GAAP", "IFRS", "Local Standards", "None of the above"],
            correct: 1 // IFRS
        },
        {
            question: "How are research and development costs generally treated under US GAAP?",
            options: ["Expensed as incurred", "Capitalized completely", "Capitalized if criteria is met", "Ignored"],
            correct: 0 // Expensed as incurred
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const quizBlock = document.getElementById('quiz-block');
    const quizResult = document.getElementById('quiz-result');
    const scoreText = document.getElementById('score-text');
    const retryBtn = document.getElementById('retry-btn');

    function loadQuestion() {
        const currentData = quizData[currentQuestionIndex];
        questionText.textContent = `${currentQuestionIndex + 1}. ${currentData.question}`;
        
        optionsContainer.innerHTML = '';
        currentData.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => selectAnswer(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function selectAnswer(selectedIndex, btnElement) {
        // Disable all buttons
        const allButtons = optionsContainer.querySelectorAll('.option-btn');
        allButtons.forEach(btn => btn.disabled = true);

        const currentData = quizData[currentQuestionIndex];
        
        if (selectedIndex === currentData.correct) {
            btnElement.classList.add('correct');
            score++;
        } else {
            btnElement.classList.add('wrong');
            // Highlight the correct one
            allButtons[currentData.correct].classList.add('correct');
        }

        // Wait a bit, then move to next
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 1200);
    }

    function showResults() {
        quizBlock.classList.add('hidden');
        quizResult.classList.remove('hidden');
        scoreText.textContent = score;
    }

    retryBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        quizResult.classList.add('hidden');
        quizBlock.classList.remove('hidden');
        loadQuestion();
    });

    // Init Quiz
    loadQuestion();
});
