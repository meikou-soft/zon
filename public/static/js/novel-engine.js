// Novel Engine for Summer Horror Stories
class NovelEngine {
    constructor() {
        this.currentStory = null;
        this.currentScene = null;
        this.currentSceneIndex = 0;
        this.sceneHistory = [];
        this.autoMode = false;
        this.skipMode = false;
        this.typewriterSpeed = 50;
        this.bgmPlayer = document.getElementById('bgm-player');
        this.sfxPlayer = document.getElementById('sfx-player');
        
        this.initializeEventListeners();
        this.loadStories();
    }
    
    initializeEventListeners() {
        document.getElementById('back-button').addEventListener('click', () => this.goBack());
        document.getElementById('next-button').addEventListener('click', () => this.nextScene());
        document.getElementById('auto-button').addEventListener('click', () => this.toggleAutoMode());
        document.getElementById('skip-button').addEventListener('click', () => this.toggleSkipMode());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.currentStory) {
                if (e.key === 'Enter' || e.key === ' ') {
                    this.nextScene();
                } else if (e.key === 'Escape') {
                    this.exitStory();
                }
            }
        });
    }
    
    async loadStories() {
        try {
            const response = await fetch('/api/stories');
            const stories = await response.json();
            this.displayStories(stories);
        } catch (error) {
            console.error('Failed to load stories:', error);
        }
    }
    
    displayStories(stories) {
        const grid = document.getElementById('stories-grid');
        grid.innerHTML = '';
        
        const categoryIcons = {
            school: 'fa-school',
            sea: 'fa-water',
            mountain: 'fa-mountain',
            obon: 'fa-fire',
            urban: 'fa-city'
        };
        
        const categoryColors = {
            school: 'text-purple-400',
            sea: 'text-blue-400',
            mountain: 'text-green-400',
            obon: 'text-orange-400',
            urban: 'text-red-400'
        };
        
        stories.forEach((story, index) => {
            const card = document.createElement('div');
            card.className = 'story-card rounded-lg p-6 cursor-pointer';
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
            
            card.innerHTML = `
                <div class="text-center mb-4">
                    <i class="fas ${categoryIcons[story.category]} text-4xl ${categoryColors[story.category]}"></i>
                </div>
                <h3 class="text-xl font-bold text-red-400 mb-2">${story.title}</h3>
                <p class="text-sm text-gray-500 mb-3">${story.subtitle}</p>
                <p class="text-gray-300 text-sm">${story.description}</p>
                <div class="mt-4 text-center">
                    <button class="px-4 py-2 bg-red-800 hover:bg-red-700 rounded-lg transition">
                        <i class="fas fa-book-open mr-2"></i>読む
                    </button>
                </div>
            `;
            
            card.addEventListener('click', () => this.startStory(story.id));
            grid.appendChild(card);
        });
    }
    
    async startStory(storyId) {
        try {
            const response = await fetch(`/api/stories/${storyId}`);
            this.currentStory = await response.json();
            this.currentSceneIndex = 0;
            this.sceneHistory = [];
            
            // Hide selection screen, show novel screen
            document.getElementById('story-selection').classList.add('hidden');
            document.getElementById('novel-container').classList.remove('hidden');
            
            // Start from the first scene
            this.playScene(this.currentStory.scenes[0]);
        } catch (error) {
            console.error('Failed to load story:', error);
        }
    }
    
    playScene(scene) {
        if (!scene) {
            this.endStory();
            return;
        }
        
        this.currentScene = scene;
        this.sceneHistory.push(scene.id);
        
        // Update background
        if (scene.background) {
            this.updateBackground(scene.background);
        }
        
        // Play BGM
        if (scene.bgm !== undefined) {
            this.playBGM(scene.bgm);
        }
        
        // Apply effects
        if (scene.effects) {
            scene.effects.forEach(effect => this.applyEffect(effect));
        }
        
        // Display character name
        const charName = document.getElementById('character-name');
        if (scene.character) {
            charName.textContent = scene.character;
            charName.classList.remove('hidden');
        } else {
            charName.classList.add('hidden');
        }
        
        // Display text with typewriter effect
        this.displayText(scene.text);
        
        // Display choices or next button
        if (scene.choices && scene.choices.length > 0) {
            this.displayChoices(scene.choices);
            document.getElementById('next-button').classList.add('hidden');
        } else {
            document.getElementById('choices-container').classList.add('hidden');
            document.getElementById('next-button').classList.remove('hidden');
        }
    }
    
    displayText(text) {
        const textElement = document.getElementById('story-text');
        textElement.innerHTML = '';
        
        if (this.skipMode) {
            textElement.textContent = text;
        } else {
            // Typewriter effect
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    textElement.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    if (this.autoMode) {
                        setTimeout(() => this.nextScene(), 3000);
                    }
                }
            }, this.typewriterSpeed);
        }
    }
    
    displayChoices(choices) {
        const container = document.getElementById('choices-container');
        container.innerHTML = '';
        container.classList.remove('hidden');
        
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button w-full p-4 rounded-lg text-left';
            button.innerHTML = `<i class="fas fa-chevron-right mr-2"></i>${choice.text}`;
            button.addEventListener('click', () => this.makeChoice(choice));
            container.appendChild(button);
        });
    }
    
    makeChoice(choice) {
        const nextScene = this.currentStory.scenes.find(s => s.id === choice.nextScene);
        this.playScene(nextScene);
    }
    
    nextScene() {
        if (this.currentScene && this.currentScene.nextScene) {
            const nextScene = this.currentStory.scenes.find(s => s.id === this.currentScene.nextScene);
            this.playScene(nextScene);
        } else {
            this.endStory();
        }
    }
    
    goBack() {
        if (this.sceneHistory.length > 1) {
            this.sceneHistory.pop(); // Remove current scene
            const previousSceneId = this.sceneHistory[this.sceneHistory.length - 1];
            const previousScene = this.currentStory.scenes.find(s => s.id === previousSceneId);
            this.sceneHistory.pop(); // Remove it again so playScene can add it back
            this.playScene(previousScene);
        } else {
            this.exitStory();
        }
    }
    
    exitStory() {
        // Return to story selection
        document.getElementById('novel-container').classList.add('hidden');
        document.getElementById('story-selection').classList.remove('hidden');
        
        // Stop BGM
        this.bgmPlayer.pause();
        this.bgmPlayer.src = '';
        
        // Reset state
        this.currentStory = null;
        this.currentScene = null;
        this.sceneHistory = [];
        this.autoMode = false;
        this.skipMode = false;
    }
    
    endStory() {
        // Show completion message
        const textElement = document.getElementById('story-text');
        textElement.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-book text-4xl text-red-400 mb-4"></i>
                <p class="text-xl mb-4">物語は終わりました</p>
                <button onclick="novelEngine.exitStory()" class="px-6 py-3 bg-red-800 hover:bg-red-700 rounded-lg transition">
                    <i class="fas fa-home mr-2"></i>物語選択へ戻る
                </button>
            </div>
        `;
        
        document.getElementById('choices-container').classList.add('hidden');
        document.getElementById('next-button').classList.add('hidden');
        document.getElementById('character-name').classList.add('hidden');
    }
    
    updateBackground(backgroundUrl) {
        const container = document.getElementById('novel-container');
        // Create a dark gradient overlay for better text readability
        container.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${backgroundUrl}')`;
    }
    
    playBGM(bgmUrl) {
        if (bgmUrl === null) {
            this.bgmPlayer.pause();
            this.bgmPlayer.src = '';
        } else if (bgmUrl && this.bgmPlayer.src !== bgmUrl) {
            this.bgmPlayer.src = bgmUrl;
            this.bgmPlayer.volume = 0.3;
            this.bgmPlayer.play().catch(e => console.log('BGM autoplay prevented:', e));
        }
    }
    
    applyEffect(effect) {
        const container = document.getElementById('novel-container');
        
        switch (effect.type) {
            case 'shake':
                container.classList.add('shake-effect');
                setTimeout(() => container.classList.remove('shake-effect'), effect.duration || 500);
                break;
                
            case 'flash':
                container.classList.add('flash-effect');
                setTimeout(() => container.classList.remove('flash-effect'), effect.duration || 200);
                break;
                
            case 'fade':
                container.style.transition = `opacity ${effect.duration || 1000}ms`;
                container.style.opacity = '0';
                setTimeout(() => {
                    container.style.opacity = '1';
                }, 100);
                break;
                
            case 'sound':
                if (effect.sound) {
                    this.sfxPlayer.src = effect.sound;
                    this.sfxPlayer.volume = 0.5;
                    this.sfxPlayer.play().catch(e => console.log('SFX autoplay prevented:', e));
                }
                break;
        }
    }
    
    toggleAutoMode() {
        this.autoMode = !this.autoMode;
        const button = document.getElementById('auto-button');
        if (this.autoMode) {
            button.classList.add('bg-red-800');
            button.classList.remove('bg-gray-800');
            button.innerHTML = '<i class="fas fa-pause mr-2"></i>オート中';
        } else {
            button.classList.remove('bg-red-800');
            button.classList.add('bg-gray-800');
            button.innerHTML = '<i class="fas fa-play mr-2"></i>オート';
        }
    }
    
    toggleSkipMode() {
        this.skipMode = !this.skipMode;
        const button = document.getElementById('skip-button');
        if (this.skipMode) {
            button.classList.add('bg-red-800');
            button.classList.remove('bg-gray-800');
            this.typewriterSpeed = 0;
        } else {
            button.classList.remove('bg-red-800');
            button.classList.add('bg-gray-800');
            this.typewriterSpeed = 50;
        }
    }
}

// Initialize the novel engine when the page loads
const novelEngine = new NovelEngine();