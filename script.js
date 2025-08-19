class GuitarPracticeApp {
    constructor() {
        this.currentPage = 'practice';
        this.checkboxes = [];
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupPracticeChecklist();
        this.setupFretboard();
        this.setupGenerators();
        this.loadChecklistState();
    }

    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Check for saved theme preference or default to OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        } else if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '🌙';
        }
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
        
        // Listen for OS theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                themeIcon.textContent = e.matches ? '☀️' : '🌙';
            }
        });
    }

    setupNavigation() {
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const page = e.target.dataset.page;
                this.navigateToPage(page);
            });
        });
    }

    navigateToPage(page) {
        const pages = document.querySelectorAll('.page');
        const navTabs = document.querySelectorAll('.nav-tab');
        
        pages.forEach(p => p.classList.remove('active'));
        navTabs.forEach(t => t.classList.remove('active'));
        
        document.getElementById(page).classList.add('active');
        document.querySelector(`[data-page="${page}"]`).classList.add('active');
        
        this.currentPage = page;
    }

    setupPracticeChecklist() {
        this.checkboxes = document.querySelectorAll('#practice input[type="checkbox"]');
        
        this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateProgress();
                this.saveChecklistState();
            });
        });

        document.getElementById('uncheck-all').addEventListener('click', () => {
            this.checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            this.updateProgress();
            this.saveChecklistState();
        });

        this.updateProgress();
    }

    updateProgress() {
        const checkedCount = Array.from(this.checkboxes).filter(cb => cb.checked).length;
        const totalCount = this.checkboxes.length;
        const percentage = (checkedCount / totalCount) * 100;
        
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = `${percentage}%`;
    }

    saveChecklistState() {
        const state = {};
        this.checkboxes.forEach(checkbox => {
            state[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem('practiceChecklist', JSON.stringify(state));
    }

    loadChecklistState() {
        const saved = localStorage.getItem('practiceChecklist');
        if (saved) {
            const state = JSON.parse(saved);
            this.checkboxes.forEach(checkbox => {
                if (state[checkbox.id] !== undefined) {
                    checkbox.checked = state[checkbox.id];
                }
            });
            this.updateProgress();
        }
    }

    setupFretboard() {
        this.createFretboardDiagram();
        document.getElementById('new-note').addEventListener('click', () => {
            this.generateRandomNote();
        });
    }

    createFretboardDiagram() {
        const fretboard = document.getElementById('fretboard-diagram');
        fretboard.innerHTML = '';

        const stringCount = 6;
        const fretCount = 12;
        const stringNames = ['e', 'B', 'G', 'D', 'A', 'E'];
        
        // Create strings
        for (let string = 0; string < stringCount; string++) {
            const stringEl = document.createElement('div');
            stringEl.className = 'string';
            stringEl.style.top = `${30 + (string * 25)}px`;
            fretboard.appendChild(stringEl);
            
            // Add string labels
            const labelEl = document.createElement('div');
            labelEl.className = 'string-label';
            labelEl.textContent = stringNames[string];
            labelEl.style.top = `${25 + (string * 25)}px`;
            fretboard.appendChild(labelEl);
        }

        // Create nut (fret 0)
        const nutEl = document.createElement('div');
        nutEl.className = 'fret';
        nutEl.style.left = '20px';
        fretboard.appendChild(nutEl);

        // Create frets
        for (let fret = 1; fret <= fretCount; fret++) {
            const fretEl = document.createElement('div');
            fretEl.className = 'fret';
            fretEl.style.left = `${20 + (fret * 45)}px`;
            fretboard.appendChild(fretEl);
            
            // Add fret numbers
            const numberEl = document.createElement('div');
            numberEl.className = 'fret-number';
            numberEl.textContent = fret.toString();
            numberEl.style.left = `${20 + (fret * 45) - 22.5}px`;
            fretboard.appendChild(numberEl);
        }
    }

    generateRandomNote() {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const strings = 6;
        const frets = 12;
        
        const randomString = Math.floor(Math.random() * strings);
        const randomFret = Math.floor(Math.random() * frets) + 1;
        
        const existingDot = document.querySelector('.note-dot');
        if (existingDot) {
            existingDot.remove();
        }

        const dot = document.createElement('div');
        dot.className = 'note-dot';
        dot.style.left = `${20 + (randomFret * 45) - 22.5}px`;
        dot.style.top = `${30 + (randomString * 25)}px`;
        
        document.getElementById('fretboard-diagram').appendChild(dot);
    }

    setupGenerators() {
        document.getElementById('generate-arpeggio').addEventListener('click', () => {
            this.generateArpeggio();
        });

        document.getElementById('generate-inversion').addEventListener('click', () => {
            this.generateInversion();
        });

        document.getElementById('generate-tanpura').addEventListener('click', () => {
            this.generateTanpura();
        });

        document.getElementById('generate-solo').addEventListener('click', () => {
            this.generateSolo();
        });

        document.getElementById('generate-standard').addEventListener('click', () => {
            this.generateStandard();
        });
    }

    generateArpeggio() {
        const chordTypes = ['maj7', 'm7', 'dom7', 'm7b5', 'dim7'];
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const positions = ['6th string root', '5th string root', '4th string root'];

        const chord = this.randomChoice(chordTypes);
        const root = this.randomChoice(notes);
        const position = this.randomChoice(positions);

        this.displayResult('arpeggio-result', {
            title: `${root}${chord}`,
            subtitle: `Position: ${position}`,
            detail: 'Arpeggio'
        });
    }

    generateInversion() {
        const chordTypes = ['maj7', 'm7', 'dom7', 'm7b5', 'dim7'];
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        const chord = this.randomChoice(chordTypes);
        const root = this.randomChoice(notes);

        this.displayResult('inversion-result', {
            title: `${root}${chord}`,
            subtitle: '7th Inversion',
            detail: 'Practice all inversions'
        });
    }

    generateTanpura() {
        const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const modes = ['Major', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Minor', 'Locrian', 'Major Pentatonic', 'Minor Pentatonic'];

        const key = this.randomChoice(keys);
        const mode = this.randomChoice(modes);

        this.displayResult('tanpura-result', {
            title: `${key} ${mode}`,
            subtitle: 'Key and Scale',
            detail: 'Practice improvisation'
        });
    }

    generateSolo() {
        const progressions = [
            'ii-V-I in Bb',
            'ii-V-I in C',
            'ii-V-I in F',
            'ii-V-I in G',
            'Blues in C',
            'Blues in F',
            'Blues in Bb',
            'Blues in G',
            'Rhythm changes in C',
            'Rhythm changes in Bb',
            'Rhythm changes in F',
            'Minor ii-V-i in Dm',
            'Minor ii-V-i in Am',
            'Minor ii-V-i in Em',
            'Turnaround in C',
            'Turnaround in F',
            'Modal vamp in Dm',
            'Modal vamp in Am'
        ];

        const progression = this.randomChoice(progressions);

        this.displayResult('solo-result', {
            title: progression,
            subtitle: 'Solo Practice',
            detail: 'Improvise over the changes'
        });
    }

    generateStandard() {
        const standards = [
            'Autumn Leaves',
            'All The Things You Are',
            'Blue Bossa',
            'Summertime',
            'Fly Me To The Moon'
        ];
        const keys = ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'];

        const song = this.randomChoice(standards);
        const key = this.randomChoice(keys);

        this.displayResult('standards-result', {
            title: song,
            subtitle: `Key of ${key}`,
            detail: 'Jazz Standard'
        });
    }

    displayResult(elementId, content) {
        const resultEl = document.getElementById(elementId);
        resultEl.classList.add('has-content');
        
        resultEl.innerHTML = `
            <div class="result-content">
                <div class="result-title">${content.title}</div>
                <div class="result-subtitle">${content.subtitle}</div>
                <div class="result-detail">${content.detail}</div>
            </div>
        `;
    }

    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GuitarPracticeApp();
});