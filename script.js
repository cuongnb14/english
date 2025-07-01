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
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');
    
    let currentSlideIndex = 0;
    let slideData = [];
    let originalSlideData = [];
    
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
        showSlide(0);
    });
    
    // Exit slide view
    exitSlideBtn.addEventListener('click', () => {
        slideView.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    // Navigation
    prevSlideBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            showSlide(currentSlideIndex - 1);
        }
    });
    
    nextSlideBtn.addEventListener('click', () => {
        if (currentSlideIndex < slideData.length - 1) {
            showSlide(currentSlideIndex + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!slideView.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
                showSlide(currentSlideIndex - 1);
            } else if (e.key === 'ArrowRight' && currentSlideIndex < slideData.length - 1) {
                showSlide(currentSlideIndex + 1);
            } else if (e.key === 'Escape') {
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
                    <div class="structure-examples">
                        <h4>Example Usage:</h4>
                        <div class="example example-highlight">
                            ${generateExampleForComparison(slide.data.structure)}
                        </div>
                    </div>
                `;
                break;
                
            case 'phrasal':
                slideContent = `
                    <div class="phrasal-verb">${slide.data.verb}</div>
                    <div class="phrasal-meaning">${slide.data.meaning}</div>
                    <div class="structure-examples">
                        <h4>Example Usage:</h4>
                        <div class="example example-highlight">
                            ${generateExampleForPhrasal(slide.data.verb)}
                        </div>
                    </div>
                `;
                break;
                
            case 'preposition':
                slideContent = `
                    <div class="structure-formula">${slide.data.preposition}</div>
                    <div class="structure-meaning">${slide.data.usage}</div>
                    <div class="structure-examples">
                        <h4>Example Usage:</h4>
                        <div class="example example-highlight">
                            ${generateExampleForPreposition(slide.data.preposition)}
                        </div>
                    </div>
                `;
                break;
        }
        
        slideCard.innerHTML = slideContent;
    }
    
    // Generate example sentences for different content types
    function generateExampleForComparison(structure) {
        const examples = {
            'as...as': ['She is as tall as her brother.', 'This book is as interesting as that one.', 'He runs as fast as a cheetah.'],
            'more...than': ['This car is more expensive than that one.', 'She is more intelligent than her classmates.', 'Today is more beautiful than yesterday.'],
            'the most': ['This is the most beautiful place I have ever seen.', 'She is the most talented singer in the group.', 'It was the most difficult exam ever.'],
            'better than': ['Coffee is better than tea for staying awake.', 'This solution is better than the previous one.', 'Reading is better than watching TV.'],
            'worse than': ['The weather today is worse than yesterday.', 'His performance was worse than expected.', 'This situation is worse than we thought.'],
            'superior': ['This product is superior to its competitors.', 'Her skills are superior to mine.', 'Quality is superior to quantity.'],
            'inferior': ['This material is inferior to the original.', 'Never feel inferior to others.', 'The copy is inferior to the original artwork.']
        };
        
        // Find matching pattern
        for (const [pattern, exampleList] of Object.entries(examples)) {
            if (structure.toLowerCase().includes(pattern.toLowerCase())) {
                return exampleList[Math.floor(Math.random() * exampleList.length)];
            }
        }
        
        // Default examples
        const defaultExamples = [
            'This example demonstrates the comparison structure.',
            'Compare these two different situations.',
            'Notice the difference in meaning between the options.'
        ];
        return defaultExamples[Math.floor(Math.random() * defaultExamples.length)];
    }
    
    function generateExampleForPhrasal(verb) {
        const examples = {
            'break up': ['They decided to break up after five years.', 'The police broke up the fight.', 'The band broke up in 2010.'],
            'look up': ['Look up the word in the dictionary.', 'Things are looking up for our company.', 'I need to look up his phone number.'],
            'give up': ['Never give up on your dreams.', 'She gave up smoking last year.', 'Don\'t give up so easily!'],
            'put off': ['We had to put off the meeting until tomorrow.', 'Stop putting off your homework.', 'The smell put me off my food.'],
            'turn on': ['Please turn on the lights.', 'Turn on the TV for the news.', 'She turned on her computer.'],
            'turn off': ['Don\'t forget to turn off the gas.', 'Turn off your phone during the movie.', 'He turned off the engine.'],
            'pick up': ['Can you pick up some milk from the store?', 'I\'ll pick you up at 8 PM.', 'She picked up the phone quickly.'],
            'drop off': ['I\'ll drop you off at the airport.', 'Please drop off the keys at reception.', 'Sales dropped off significantly.'],
            'run into': ['I ran into my old friend at the mall.', 'We ran into some problems with the project.', 'The car ran into a tree.'],
            'come across': ['I came across this interesting article.', 'She comes across as very confident.', 'We came across a beautiful lake.']
        };
        
        // Find matching phrasal verb
        for (const [phrase, exampleList] of Object.entries(examples)) {
            if (verb.toLowerCase().includes(phrase.toLowerCase())) {
                return exampleList[Math.floor(Math.random() * exampleList.length)];
            }
        }
        
        // Extract first part of phrasal verb for generic examples
        const verbPart = verb.split(' ')[0].toLowerCase();
        const genericExamples = [
            `Please ${verb.toLowerCase()} when you have time.`,
            `She always ${verb.toLowerCase()} in difficult situations.`,
            `We need to ${verb.toLowerCase()} before it's too late.`,
            `They ${verb.toLowerCase()} every morning.`
        ];
        return genericExamples[Math.floor(Math.random() * genericExamples.length)];
    }
    
    function generateExampleForPreposition(preposition) {
        const examples = {
            'in': ['She lives in New York.', 'The book is in the bag.', 'We\'ll meet in the morning.', 'He\'s interested in music.'],
            'on': ['The cat is on the table.', 'We\'re going on vacation.', 'Turn on the light.', 'He\'s on the phone.'],
            'at': ['Meet me at the station.', 'She\'s good at math.', 'We arrived at 3 PM.', 'Look at that beautiful sunset.'],
            'for': ['This gift is for you.', 'We waited for an hour.', 'She\'s famous for her cooking.', 'Thank you for your help.'],
            'with': ['I went with my friends.', 'Cut it with a knife.', 'She\'s angry with her brother.', 'Mix the flour with water.'],
            'by': ['The book was written by Shakespeare.', 'We travel by train.', 'Sit by the window.', 'The deadline is by Friday.'],
            'from': ['I\'m from Canada.', 'The train leaves from platform 3.', 'This is different from that.', 'We learned from our mistakes.'],
            'to': ['I\'m going to school.', 'Give this to your teacher.', 'Listen to the music.', 'We\'re close to the solution.'],
            'of': ['The color of the sky.', 'A cup of coffee.', 'The capital of France.', 'She\'s afraid of spiders.'],
            'about': ['Tell me about your trip.', 'What are you thinking about?', 'She\'s excited about the party.', 'We talked about the weather.']
        };
        
        // Find matching preposition
        const prep = preposition.toLowerCase().trim();
        if (examples[prep]) {
            const exampleList = examples[prep];
            return exampleList[Math.floor(Math.random() * exampleList.length)];
        }
        
        // Default example
        return `This sentence shows how to use "${preposition}" correctly.`;
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addSearchFeature();
});