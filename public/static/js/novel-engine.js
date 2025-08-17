// Novel Engine for Summer Horror Stories - Enhanced Version
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
        this.loadedImages = new Set();
        this.imageCache = {};
        
        this.initializeEventListeners();
        this.loadStories();
        this.preloadCommonAssets();
    }
    
    preloadCommonAssets() {
        // Preload common images
        const commonImages = [
            '/static/images/school_hallway.jpg',
            '/static/images/toilet.jpg',
            '/static/images/placeholder.svg'
        ];
        
        commonImages.forEach(src => {
            const img = new Image();
            img.onload = () => {
                this.imageCache[src] = img;
                this.loadedImages.add(src);
            };
            img.onerror = () => {
                console.warn(`Failed to preload image: ${src}`);
            };
            img.src = src;
        });
    }
    
    preloadStoryAssets(story) {
        const imagesToLoad = new Set();
        
        // Collect all unique images from the story
        story.scenes.forEach(scene => {
            if (scene.background) {
                imagesToLoad.add(scene.background);
            }
        });
        
        // Preload images
        const loadPromises = Array.from(imagesToLoad).map(src => {
            if (this.loadedImages.has(src)) {
                return Promise.resolve();
            }
            
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    this.imageCache[src] = img;
                    this.loadedImages.add(src);
                    resolve();
                };
                img.onerror = () => {
                    console.warn(`Failed to load image: ${src}`);
                    resolve(); // Resolve anyway to not block
                };
                img.src = src;
            });
        });
        
        return Promise.all(loadPromises);
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
                    e.preventDefault();
                    this.nextScene();
                } else if (e.key === 'Escape') {
                    this.exitStory();
                } else if (e.key === 'a' || e.key === 'A') {
                    this.toggleAutoMode();
                } else if (e.key === 's' || e.key === 'S') {
                    this.toggleSkipMode();
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
            this.displayError('ストーリーの読み込みに失敗しました。');
        }
    }
    
    displayError(message) {
        const grid = document.getElementById('stories-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="col-span-full text-center text-red-400">
                    <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-red-800 hover:bg-red-700 rounded-lg">
                        再読み込み
                    </button>
                </div>
            `;
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
            
            // Use actual thumbnails if available, otherwise use placeholder
            const thumbnailSrc = this.getImagePath(story.thumbnail) || '/static/images/placeholder.svg';
            
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
    
    getImagePath(path) {
        if (!path) return null;
        
        // Check if the image exists by trying to match with actual files
        const actualImages = {
            '/static/images/hanako_thumb.jpg': '/static/images/hanako.jpg',
            '/static/images/stairs_thumb.jpg': '/static/images/school_hallway.jpg',
            '/static/images/music_thumb.jpg': '/static/images/music_room.jpg',
            '/static/images/sea_thumb.jpg': '/static/images/beach.jpg',
            '/static/images/mountain_thumb.jpg': '/static/images/camp.jpg',
            '/static/images/obon_thumb.jpg': '/static/images/obon_night.jpg',
            '/static/images/kuchisake_thumb.jpg': '/static/images/kuchisake.jpg',
            '/static/images/teketeke_thumb.jpg': '/static/images/teketeke.jpg',
            '/static/images/beethoven.jpg': '/static/images/music_room.jpg',
            '/static/images/void.jpg': '/static/images/dark_forest.jpg'
        };
        
        return actualImages[path] || path;
    }
    
    async startStory(storyId) {
        try {
            const response = await fetch(`/api/stories/${storyId}`);
            this.currentStory = await response.json();
            this.currentSceneIndex = 0;
            this.sceneHistory = [];
            
            // Show loading indicator
            document.getElementById('story-selection').classList.add('hidden');
            document.getElementById('novel-container').classList.remove('hidden');
            
            const textElement = document.getElementById('story-text');
            textElement.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin text-4xl"></i><p class="mt-4">読み込み中...</p></div>';
            
            // Preload story assets
            await this.preloadStoryAssets(this.currentStory);
            
            // Start from the first scene
            this.playScene(this.currentStory.scenes[0]);
        } catch (error) {
            console.error('Failed to load story:', error);
            this.displayError('ストーリーの読み込みに失敗しました。');
        }
    }
    
    playScene(scene) {
        if (!scene) {
            this.endStory();
            return;
        }
        
        this.currentScene = scene;
        this.sceneHistory.push(scene.id);
        
        // Update background with fallback
        if (scene.background) {
            const actualPath = this.getImagePath(scene.background);
            this.updateBackground(actualPath || '/static/images/placeholder.svg');
        }
        
        // Play BGM with error handling
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
        
        // Check if this is an ending scene (no nextScene and no choices)
        const isEnding = !scene.nextScene && (!scene.choices || scene.choices.length === 0);
        
        if (isEnding) {
            // This is an ending - show completion after text is displayed
            setTimeout(() => {
                this.showEndingOptions();
            }, this.skipMode ? 100 : (scene.text.length * this.typewriterSpeed + 1000));
            document.getElementById('next-button').classList.add('hidden');
            document.getElementById('choices-container').classList.add('hidden');
        } else if (scene.choices && scene.choices.length > 0) {
            // Show choices
            this.displayChoices(scene.choices);
            document.getElementById('next-button').classList.add('hidden');
        } else if (scene.nextScene) {
            // Show next button
            document.getElementById('choices-container').classList.add('hidden');
            document.getElementById('next-button').classList.remove('hidden');
        } else {
            // Fallback - should not happen but just in case
            document.getElementById('next-button').classList.add('hidden');
            document.getElementById('choices-container').classList.add('hidden');
            setTimeout(() => this.showEndingOptions(), 2000);
        }
    }
    
    displayText(text) {
        const textElement = document.getElementById('story-text');
        textElement.innerHTML = '';
        
        if (this.skipMode) {
            textElement.textContent = text;
            if (this.autoMode && this.currentScene && this.currentScene.nextScene) {
                setTimeout(() => this.nextScene(), 1500);
            }
        } else {
            // Typewriter effect
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    textElement.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    if (this.autoMode && this.currentScene && this.currentScene.nextScene) {
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
        
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button w-full p-4 rounded-lg text-left';
            button.innerHTML = `<i class="fas fa-chevron-right mr-2"></i>${choice.text}`;
            button.style.animationDelay = `${index * 0.1}s`;
            button.classList.add('fade-in');
            button.addEventListener('click', () => this.makeChoice(choice));
            container.appendChild(button);
        });
    }
    
    makeChoice(choice) {
        const nextScene = this.currentStory.scenes.find(s => s.id === choice.nextScene);
        if (nextScene) {
            this.playScene(nextScene);
        } else {
            console.warn(`Scene not found: ${choice.nextScene}`);
            this.endStory();
        }
    }
    
    nextScene() {
        if (this.currentScene && this.currentScene.nextScene) {
            const nextScene = this.currentStory.scenes.find(s => s.id === this.currentScene.nextScene);
            if (nextScene) {
                this.playScene(nextScene);
            } else {
                console.warn(`Next scene not found: ${this.currentScene.nextScene}`);
                this.endStory();
            }
        } else {
            this.endStory();
        }
    }
    
    goBack() {
        if (this.sceneHistory.length > 1) {
            this.sceneHistory.pop(); // Remove current scene
            const previousSceneId = this.sceneHistory[this.sceneHistory.length - 1];
            const previousScene = this.currentStory.scenes.find(s => s.id === previousSceneId);
            if (previousScene) {
                this.sceneHistory.pop(); // Remove it again so playScene can add it back
                this.playScene(previousScene);
            }
        } else {
            this.exitStory();
        }
    }
    
    exitStory() {
        // Return to story selection
        document.getElementById('novel-container').classList.add('hidden');
        document.getElementById('story-selection').classList.remove('hidden');
        
        // Stop BGM
        if (this.bgmPlayer) {
            this.bgmPlayer.pause();
            this.bgmPlayer.src = '';
        }
        
        // Reset state
        this.currentStory = null;
        this.currentScene = null;
        this.sceneHistory = [];
        this.autoMode = false;
        this.skipMode = false;
        
        // Reset UI
        const autoButton = document.getElementById('auto-button');
        if (autoButton) {
            autoButton.classList.remove('bg-red-800');
            autoButton.classList.add('bg-gray-800');
            autoButton.innerHTML = '<i class="fas fa-play mr-2"></i>オート';
        }
        
        const skipButton = document.getElementById('skip-button');
        if (skipButton) {
            skipButton.classList.remove('bg-red-800');
            skipButton.classList.add('bg-gray-800');
        }
    }
    
    showEndingOptions() {
        const textElement = document.getElementById('story-text');
        const currentText = textElement.textContent;
        
        // Add ending options below the final text
        textElement.innerHTML = `
            <div class="mb-6">${currentText}</div>
            <div class="text-center py-4 fade-in border-t border-gray-700">
                <p class="text-lg text-red-400 mb-4">〜 終 〜</p>
                <button onclick="novelEngine.exitStory()" class="px-6 py-3 bg-red-800 hover:bg-red-700 rounded-lg transition mr-4">
                    <i class="fas fa-home mr-2"></i>物語選択へ戻る
                </button>
                <button onclick="novelEngine.restartStory()" class="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                    <i class="fas fa-redo mr-2"></i>最初から読む
                </button>
            </div>
        `;
        
        document.getElementById('choices-container').classList.add('hidden');
        document.getElementById('next-button').classList.add('hidden');
        document.getElementById('character-name').classList.add('hidden');
        
        // Stop auto mode
        this.autoMode = false;
        this.skipMode = false;
    }
    
    endStory() {
        this.showEndingOptions();
    }
    
    restartStory() {
        if (this.currentStory) {
            this.sceneHistory = [];
            this.playScene(this.currentStory.scenes[0]);
        }
    }
    
    updateBackground(backgroundUrl) {
        const container = document.getElementById('novel-container');
        // Check if image is cached
        if (this.imageCache[backgroundUrl]) {
            container.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${backgroundUrl}')`;
        } else {
            // Use placeholder while loading
            container.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/static/images/placeholder.svg')`;
            // Load the actual image
            const img = new Image();
            img.onload = () => {
                container.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('${backgroundUrl}')`;
            };
            img.src = backgroundUrl;
        }
    }
    
    playBGM(bgmUrl) {
        if (!this.bgmPlayer) return;
        
        try {
            if (bgmUrl === null) {
                this.bgmPlayer.pause();
                this.bgmPlayer.src = '';
            } else if (bgmUrl) {
                const actualPath = this.getAudioPath(bgmUrl);
                if (this.bgmPlayer.src !== actualPath) {
                    this.bgmPlayer.src = actualPath;
                    this.bgmPlayer.volume = 0.3;
                    this.bgmPlayer.play().catch(e => {
                        console.log('BGM autoplay prevented:', e);
                    });
                }
            }
        } catch (error) {
            console.error('Error playing BGM:', error);
        }
    }
    
    getAudioPath(path) {
        // Map to actual audio files
        const actualAudio = {
            '/static/audio/bgm_dark.mp3': '/static/audio/bgm_suspense.mp3',
            '/static/audio/bgm_piano.mp3': '/static/audio/bgm_suspense.mp3',
            '/static/audio/bgm_wave.mp3': '/static/audio/bgm_suspense.mp3',
            '/static/audio/bgm_forest.mp3': '/static/audio/bgm_suspense.mp3',
            '/static/audio/bgm_obon.mp3': '/static/audio/bgm_suspense.mp3',
            '/static/audio/bgm_urban.mp3': '/static/audio/bgm_suspense.mp3',
            '/static/audio/bgm_tension.mp3': '/static/audio/bgm_suspense.mp3',
            '/static/audio/bgm_horror.mp3': '/static/audio/bgm_suspense.mp3',
            '/static/audio/ghost_voice.mp3': '/static/audio/scream.mp3',
            '/static/audio/monster_voice.mp3': '/static/audio/scream.mp3',
            '/static/audio/horror_scream.mp3': '/static/audio/scream.mp3',
            '/static/audio/teketeke.mp3': '/static/audio/creak.mp3',
            '/static/audio/thunder.mp3': '/static/audio/creak.mp3',
            '/static/audio/elise.mp3': '/static/audio/bgm_suspense.mp3'
        };
        
        return actualAudio[path] || path;
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
                if (effect.sound && this.sfxPlayer) {
                    try {
                        const actualPath = this.getAudioPath(effect.sound);
                        this.sfxPlayer.src = actualPath;
                        this.sfxPlayer.volume = 0.5;
                        this.sfxPlayer.play().catch(e => {
                            console.log('SFX autoplay prevented:', e);
                        });
                    } catch (error) {
                        console.error('Error playing SFX:', error);
                    }
                }
                break;
        }
    }
    
    toggleAutoMode() {
        this.autoMode = !this.autoMode;
        const button = document.getElementById('auto-button');
        if (button) {
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
    }
    
    toggleSkipMode() {
        this.skipMode = !this.skipMode;
        const button = document.getElementById('skip-button');
        if (button) {
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
}

// Initialize the novel engine when the page loads
let novelEngine;
document.addEventListener('DOMContentLoaded', () => {
    novelEngine = new NovelEngine();
});