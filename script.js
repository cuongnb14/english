// Load English learning data
let englishData = {};

// Load data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        englishData = data;
        initializeApp();
    })
    .catch(error => {
        console.error('Error loading data:', error);
        // Fallback: create a basic structure
        englishData = {
            title: "English Learning Hub",
            sections: []
        };
        initializeApp();
    });

// Initialize the application
function initializeApp() {
    setupNavigation();
    loadSentenceStructures();
    loadPrepositions();
    loadComparisons();
    loadPhrasalVerbs();
    setupPracticeMode();
    setupSlideView();
}

// Setup navigation between sections
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Load sentence structures
function loadSentenceStructures() {
    const structuresSection = englishData.sections?.find(section => 
        section.title === "84 CẤU TRÚC CÂU TRONG TIẾNG ANH"
    );
    
    if (!structuresSection || !structuresSection.structures) return;

    const grid = document.querySelector('.structure-grid');
    grid.innerHTML = '';

    structuresSection.structures.forEach(structure => {
        const card = createStructureCard(structure);
        grid.appendChild(card);
    });
}

// Create structure card
function createStructureCard(structure) {
    const card = document.createElement('div');
    card.className = 'structure-card';
    
    const examples = structure.examples?.map(example => 
        `<div class="example">${example}</div>`
    ).join('') || '';

    card.innerHTML = `
        <div class="structure-id">#${structure.id}</div>
        <div class="structure-formula">${structure.structure}</div>
        <div class="structure-meaning">${structure.meaning || ''}</div>
        ${examples ? `<div class="structure-examples">
            <h4>Examples:</h4>
            ${examples}
        </div>` : ''}
    `;
    
    return card;
}

// Load prepositions
function loadPrepositions() {
    const prepositionsSection = englishData.sections?.find(section => 
        section.title === "CÁCH SỬ DỤNG CÁC GIỚI TỪ"
    );
    
    if (!prepositionsSection) return;

    // Load prepositions
    if (prepositionsSection.prepositions) {
        const grid = document.querySelector('.preposition-grid');
        grid.innerHTML = '';

        prepositionsSection.prepositions.forEach(prep => {
            const card = createPrepositionCard(prep);
            grid.appendChild(card);
        });
    }

    // Load idioms
    if (prepositionsSection.idioms) {
        const idiomGrid = document.querySelector('.idiom-grid');
        idiomGrid.innerHTML = '';

        prepositionsSection.idioms.forEach(idiom => {
            const card = createIdiomCard(idiom);
            idiomGrid.appendChild(card);
        });
    }
}

// Create preposition card
function createPrepositionCard(preposition) {
    const card = document.createElement('div');
    card.className = 'preposition-card';
    
    card.innerHTML = `
        <div class="structure-formula">${preposition.preposition}</div>
        <div class="structure-meaning">${preposition.usage}</div>
    `;
    
    return card;
}

// Create idiom card
function createIdiomCard(idiom) {
    const card = document.createElement('div');
    card.className = 'idiom-card';
    
    card.innerHTML = `
        <div class="idiom-phrase">${idiom.idiom}</div>
        <div class="idiom-meaning">${idiom.meaning}</div>
    `;
    
    return card;
}

// Load comparison structures
function loadComparisons() {
    const comparisonsSection = englishData.sections?.find(section => 
        section.title === "51 CẤU TRÚC SO SÁNH TRONG TIẾNG ANH"
    );
    
    if (!comparisonsSection || !comparisonsSection.comparison_structures) return;

    const grid = document.querySelector('.comparison-grid');
    grid.innerHTML = '';

    comparisonsSection.comparison_structures.forEach(comparison => {
        const card = createComparisonCard(comparison);
        grid.appendChild(card);
    });
}

// Create comparison card
function createComparisonCard(comparison) {
    const card = document.createElement('div');
    card.className = 'comparison-card';
    
    card.innerHTML = `
        <div class="structure-id">#${comparison.id}</div>
        <div class="structure-formula">${comparison.structure}</div>
        <div class="structure-meaning">${comparison.meaning || ''}</div>
    `;
    
    return card;
}

// Load phrasal verbs
function loadPhrasalVerbs() {
    const phrasalSection = englishData.sections?.find(section => 
        section.title === "PHASAL VERBS"
    );
    
    if (!phrasalSection || !phrasalSection.phrasal_verbs) return;

    setupAlphabetNavigation();
    loadPhrasalVerbsByLetter('A'); // Load 'A' by default
}

// Setup alphabet navigation
function setupAlphabetNavigation() {
    const alphabetNav = document.querySelector('.alphabet-nav');
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'O', 'P', 'R', 'S', 'T', 'U', 'W'];
    
    alphabetNav.innerHTML = '';
    
    letters.forEach((letter, index) => {
        const btn = document.createElement('button');
        btn.className = 'alphabet-btn';
        btn.textContent = letter;
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.alphabet-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadPhrasalVerbsByLetter(letter);
        });
        
        if (index === 0) btn.classList.add('active'); // Make 'A' active by default
        alphabetNav.appendChild(btn);
    });
}

// Load phrasal verbs by letter
function loadPhrasalVerbsByLetter(letter) {
    const phrasalSection = englishData.sections?.find(section => 
        section.title === "PHASAL VERBS"
    );
    
    if (!phrasalSection || !phrasalSection.phrasal_verbs || !phrasalSection.phrasal_verbs[letter]) {
        document.querySelector('.phrasal-verb-content').innerHTML = '<p>No phrasal verbs found for this letter.</p>';
        return;
    }

    const content = document.querySelector('.phrasal-verb-content');
    const phrasalVerbs = phrasalSection.phrasal_verbs[letter];
    
    content.innerHTML = `
        <div class="phrasal-verb-section">
            <h3>Phrasal Verbs - ${letter}</h3>
            <div class="phrasal-verb-grid">
                ${phrasalVerbs.map(verb => `
                    <div class="phrasal-verb-card">
                        <div class="phrasal-verb">${verb.verb}</div>
                        <div class="phrasal-meaning">${verb.meaning}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Setup practice mode
function setupPracticeMode() {
    const practiceBtn = document.getElementById('practice-btn');
    const practiceContent = document.getElementById('practice-content');
    const nextBtn = document.getElementById('next-practice');
    
    let currentQuestion = 0;
    let practiceQuestions = [];

    practiceBtn.addEventListener('click', () => {
        generatePracticeQuestions();
        practiceContent.classList.remove('hidden');
        practiceBtn.style.display = 'none';
        showQuestion();
    });

    nextBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < practiceQuestions.length) {
            showQuestion();
        } else {
            // End practice
            document.querySelector('.practice-question').textContent = 'Practice completed! Great job!';
            document.querySelector('.practice-options').innerHTML = '';
            nextBtn.textContent = 'Start Again';
            nextBtn.onclick = () => {
                currentQuestion = 0;
                generatePracticeQuestions();
                showQuestion();
                nextBtn.textContent = 'Next';
                nextBtn.onclick = arguments.callee;
            };
        }
    });

    function generatePracticeQuestions() {
        practiceQuestions = [];
        
        // Generate questions from sentence structures
        const structuresSection = englishData.sections?.find(section => 
            section.title === "84 CẤU TRÚC CÂU TRONG TIẾNG ANH"
        );
        
        if (structuresSection && structuresSection.structures) {
            const randomStructures = shuffleArray(structuresSection.structures).slice(0, 10);
            
            randomStructures.forEach(structure => {
                if (structure.examples && structure.examples.length > 0) {
                    practiceQuestions.push({
                        type: 'structure',
                        question: `What does this structure mean: "${structure.structure}"?`,
                        correctAnswer: structure.meaning,
                        options: generateMeaningOptions(structure.meaning, structuresSection.structures),
                        example: structure.examples[0]
                    });
                }
            });
        }
        
        // Generate questions from phrasal verbs
        const phrasalSection = englishData.sections?.find(section => 
            section.title === "PHASAL VERBS"
        );
        
        if (phrasalSection && phrasalSection.phrasal_verbs) {
            const allPhrasalVerbs = [];
            Object.keys(phrasalSection.phrasal_verbs).forEach(letter => {
                allPhrasalVerbs.push(...phrasalSection.phrasal_verbs[letter]);
            });
            
            const randomPhrasalVerbs = shuffleArray(allPhrasalVerbs).slice(0, 5);
            
            randomPhrasalVerbs.forEach(verb => {
                practiceQuestions.push({
                    type: 'phrasal',
                    question: `What does "${verb.verb}" mean?`,
                    correctAnswer: verb.meaning,
                    options: generateMeaningOptions(verb.meaning, allPhrasalVerbs.map(v => ({ meaning: v.meaning })))
                });
            });
        }
        
        practiceQuestions = shuffleArray(practiceQuestions);
    }

    function generateMeaningOptions(correctAnswer, allItems) {
        const options = [correctAnswer];
        const otherMeanings = allItems
            .map(item => item.meaning)
            .filter(meaning => meaning && meaning !== correctAnswer && meaning.trim() !== '');
        
        const shuffledOthers = shuffleArray(otherMeanings);
        
        while (options.length < 4 && shuffledOthers.length > 0) {
            const meaning = shuffledOthers.pop();
            if (!options.includes(meaning)) {
                options.push(meaning);
            }
        }
        
        // Fill with generic options if needed
        while (options.length < 4) {
            options.push(`Option ${options.length}`);
        }
        
        return shuffleArray(options);
    }

    function showQuestion() {
        if (currentQuestion >= practiceQuestions.length) return;
        
        const question = practiceQuestions[currentQuestion];
        document.querySelector('.practice-question').textContent = question.question;
        
        const optionsContainer = document.querySelector('.practice-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => {
                // Disable all buttons
                document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
                
                if (option === question.correctAnswer) {
                    btn.classList.add('correct');
                } else {
                    btn.classList.add('incorrect');
                    // Highlight correct answer
                    document.querySelectorAll('.option-btn').forEach(b => {
                        if (b.textContent === question.correctAnswer) {
                            b.classList.add('correct');
                        }
                    });
                }
            });
            optionsContainer.appendChild(btn);
        });
    }
}

// Utility function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Search functionality
function addSearchFeature() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;
        
        // Search through all sections
        const results = [];
        
        englishData.sections?.forEach(section => {
            if (section.structures) {
                section.structures.forEach(structure => {
                    if (structure.structure.toLowerCase().includes(query) ||
                        structure.meaning?.toLowerCase().includes(query) ||
                        structure.examples?.some(ex => ex.toLowerCase().includes(query))) {
                        results.push({ type: 'structure', data: structure, section: section.title });
                    }
                });
            }
            
            if (section.phrasal_verbs) {
                Object.keys(section.phrasal_verbs).forEach(letter => {
                    section.phrasal_verbs[letter].forEach(verb => {
                        if (verb.verb.toLowerCase().includes(query) ||
                            verb.meaning.toLowerCase().includes(query)) {
                            results.push({ type: 'phrasal', data: verb, section: section.title });
                        }
                    });
                });
            }
        });
        
        displaySearchResults(results, query);
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

function displaySearchResults(results, query) {
    // Create or update search results section
    let resultsSection = document.getElementById('search-results');
    if (!resultsSection) {
        resultsSection = document.createElement('section');
        resultsSection.id = 'search-results';
        resultsSection.className = 'content-section';
        document.querySelector('.container').insertBefore(resultsSection, document.querySelector('.practice-panel'));
    }
    
    // Hide all other sections and show search results
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    resultsSection.classList.add('active');
    
    if (results.length === 0) {
        resultsSection.innerHTML = `
            <h2>Search Results</h2>
            <p>No results found for "${query}"</p>
        `;
        return;
    }
    
    resultsSection.innerHTML = `
        <h2>Search Results for "${query}" (${results.length} found)</h2>
        <div class="search-results-grid">
            ${results.map(result => {
                if (result.type === 'structure') {
                    return `
                        <div class="structure-card">
                            <div class="structure-id">#${result.data.id}</div>
                            <div class="structure-formula">${result.data.structure}</div>
                            <div class="structure-meaning">${result.data.meaning || ''}</div>
                            ${result.data.examples ? `<div class="structure-examples">
                                <h4>Examples:</h4>
                                ${result.data.examples.map(ex => `<div class="example">${ex}</div>`).join('')}
                            </div>` : ''}
                        </div>
                    `;
                } else if (result.type === 'phrasal') {
                    return `
                        <div class="phrasal-verb-card">
                            <div class="phrasal-verb">${result.data.verb}</div>
                            <div class="phrasal-meaning">${result.data.meaning}</div>
                        </div>
                    `;
                }
                return '';
            }).join('')}
        </div>
    `;
}

// Setup slide view functionality
function setupSlideView() {
    const slideViewBtn = document.getElementById('slide-view-btn');
    const slideView = document.getElementById('slide-view');
    const exitSlideBtn = document.getElementById('exit-slide-btn');
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    const shuffleBtn = document.getElementById('shuffle-slides-btn');
    const autoplayBtn = document.getElementById('autoplay-btn');
    const speedSelector = document.getElementById('speed-selector');
    const progressFill = document.getElementById('progress-fill');
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');
    
    let currentSlideIndex = 0;
    let slideData = [];
    let originalSlideData = [];
    let autoplayTimer = null;
    let progressTimer = null;
    let isAutoPlaying = false;
    
    // Enter slide view
    slideViewBtn.addEventListener('click', () => {
        generateSlideData();
        if (slideData.length > 0) {
            slideView.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            showSlide(0);
        }
    });
    
    // Shuffle slides
    shuffleBtn.addEventListener('click', () => {
        slideData = shuffleArray([...originalSlideData]);
        stopAutoplay();
        showSlide(0);
    });
    
    // Auto-play functionality
    autoplayBtn.addEventListener('click', () => {
        if (isAutoPlaying) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });
    
    // Speed selector change
    speedSelector.addEventListener('change', () => {
        if (isAutoPlaying) {
            stopAutoplay();
            startAutoplay();
        }
    });
    
    // Exit slide view
    exitSlideBtn.addEventListener('click', () => {
        stopAutoplay();
        slideView.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    // Navigation
    prevSlideBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            stopAutoplay();
            showSlide(currentSlideIndex - 1);
        }
    });
    
    nextSlideBtn.addEventListener('click', () => {
        if (currentSlideIndex < slideData.length - 1) {
            stopAutoplay();
            showSlide(currentSlideIndex + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!slideView.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
                stopAutoplay();
                showSlide(currentSlideIndex - 1);
            } else if (e.key === 'ArrowRight' && currentSlideIndex < slideData.length - 1) {
                stopAutoplay();
                showSlide(currentSlideIndex + 1);
            } else if (e.key === ' ') { // Spacebar to toggle autoplay
                e.preventDefault();
                if (isAutoPlaying) {
                    stopAutoplay();
                } else {
                    startAutoplay();
                }
            } else if (e.key === 'Escape') {
                stopAutoplay();
                slideView.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    function generateSlideData() {
        slideData = [];
        
        // Add slides from sentence structures
        const structuresSection = englishData.sections?.find(section => 
            section.title === "84 CẤU TRÚC CÂU TRONG TIẾNG ANH"
        );
        
        if (structuresSection && structuresSection.structures) {
            structuresSection.structures.forEach(structure => {
                slideData.push({
                    type: 'structure',
                    data: structure,
                    title: 'Sentence Structure'
                });
            });
        }
        
        // Add slides from comparisons
        const comparisonsSection = englishData.sections?.find(section => 
            section.title === "51 CẤU TRÚC SO SÁNH TRONG TIẾNG ANH"
        );
        
        if (comparisonsSection && comparisonsSection.comparison_structures) {
            comparisonsSection.comparison_structures.forEach(comparison => {
                slideData.push({
                    type: 'comparison',
                    data: comparison,
                    title: 'Comparison Structure'
                });
            });
        }
        
        // Add slides from phrasal verbs
        const phrasalSection = englishData.sections?.find(section => 
            section.title === "PHASAL VERBS"
        );
        
        if (phrasalSection && phrasalSection.phrasal_verbs) {
            Object.keys(phrasalSection.phrasal_verbs).forEach(letter => {
                phrasalSection.phrasal_verbs[letter].forEach(verb => {
                    slideData.push({
                        type: 'phrasal',
                        data: verb,
                        title: 'Phrasal Verb'
                    });
                });
            });
        }
        
        // Add slides from prepositions
        const prepositionsSection = englishData.sections?.find(section => 
            section.title === "CÁCH SỬ DỤNG CÁC GIỚI TỪ"
        );
        
        if (prepositionsSection && prepositionsSection.prepositions) {
            prepositionsSection.prepositions.forEach(prep => {
                slideData.push({
                    type: 'preposition',
                    data: prep,
                    title: 'Preposition Usage'
                });
            });
        }
        
        // Store original order and shuffle for random presentation
        originalSlideData = [...slideData];
        slideData = shuffleArray(slideData);
    }
    
    function showSlide(index) {
        if (index < 0 || index >= slideData.length) return;
        
        currentSlideIndex = index;
        const slide = slideData[index];
        const slideCard = document.querySelector('.slide-card');
        
        // Update counters
        currentSlideSpan.textContent = index + 1;
        totalSlidesSpan.textContent = slideData.length;
        
        // Update navigation buttons
        prevSlideBtn.disabled = index === 0;
        nextSlideBtn.disabled = index === slideData.length - 1;
        
        // Generate slide content based on type
        let slideContent = '';
        
        switch (slide.type) {
            case 'structure':
                const examples = slide.data.examples?.map((example, idx) => {
                    const isHighlight = idx === 0 || Math.random() > 0.7;
                    return `<div class="example ${isHighlight ? 'example-highlight' : ''}">${example}</div>`;
                }).join('') || '';
                
                slideContent = `
                    <div class="structure-id">#${slide.data.id}</div>
                    <div class="structure-formula">${slide.data.structure}</div>
                    <div class="structure-meaning">${slide.data.meaning || ''}</div>
                    ${examples ? `<div class="structure-examples">
                        <h4>Examples:</h4>
                        ${examples}
                    </div>` : ''}
                `;
                break;
                
            case 'comparison':
                slideContent = `
                    <div class="structure-id">#${slide.data.id}</div>
                    <div class="structure-formula">${slide.data.structure}</div>
                    <div class="structure-meaning">${slide.data.meaning || ''}</div>
                `;
                break;
                
            case 'phrasal':
                const phrasalExamples = slide.data.examples ? slide.data.examples.map(example => 
                    `<div class="example">${example}</div>`
                ).join('') : '';
                slideContent = `
                    <div class="phrasal-verb">${slide.data.verb}</div>
                    <div class="phrasal-meaning">${slide.data.meaning}</div>
                    ${phrasalExamples ? `<div class="examples-section">${phrasalExamples}</div>` : ''}
                `;
                break;
                
            case 'preposition':
                const prepositionExamples = slide.data.examples ? slide.data.examples.map(example => 
                    `<div class="example">${example}</div>`
                ).join('') : '';
                slideContent = `
                    <div class="structure-formula">${slide.data.preposition}</div>
                    <div class="structure-meaning">${slide.data.usage}</div>
                    ${prepositionExamples ? `<div class="examples-section">${prepositionExamples}</div>` : ''}
                `;
                break;
        }
        
        slideCard.innerHTML = slideContent;
        
        // Reset progress bar
        resetProgressBar();
    }
    
    // Auto-play functions
    function startAutoplay() {
        if (slideData.length === 0) return;
        
        isAutoPlaying = true;
        autoplayBtn.textContent = '⏸️ Pause';
        autoplayBtn.classList.add('playing');
        autoplayBtn.title = 'Pause Auto-play';
        
        const speed = parseInt(speedSelector.value);
        startProgressBar(speed);
        
        autoplayTimer = setTimeout(() => {
            goToNextSlide();
        }, speed);
    }
    
    function stopAutoplay() {
        if (!isAutoPlaying) return;
        
        isAutoPlaying = false;
        autoplayBtn.textContent = '▶️ Play';
        autoplayBtn.classList.remove('playing');
        autoplayBtn.title = 'Start Auto-play';
        
        if (autoplayTimer) {
            clearTimeout(autoplayTimer);
            autoplayTimer = null;
        }
        
        stopProgressBar();
    }
    
    function goToNextSlide() {
        if (currentSlideIndex < slideData.length - 1) {
            showSlide(currentSlideIndex + 1);
            if (isAutoPlaying) {
                startAutoplay();
            }
        } else {
            // Loop back to first slide or stop autoplay
            showSlide(0);
            if (isAutoPlaying) {
                startAutoplay();
            }
        }
    }
    
    function startProgressBar(duration) {
        progressFill.classList.add('auto-playing');
        progressFill.style.transitionDuration = duration + 'ms';
        progressFill.style.width = '100%';
    }
    
    function stopProgressBar() {
        progressFill.classList.remove('auto-playing');
        progressFill.style.transitionDuration = '0.3s';
        progressFill.style.width = '0%';
    }
    
    function resetProgressBar() {
        progressFill.style.width = '0%';
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addSearchFeature();
});