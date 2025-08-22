import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { stories } from './data/stories'

const app = new Hono()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes
app.get('/api/stories', (c) => {
  const summaries = stories.map(story => ({
    id: story.id,
    title: story.title,
    subtitle: story.subtitle,
    description: story.description,
    thumbnail: story.thumbnail,
    category: story.category
  }))
  return c.json(summaries)
})

app.get('/api/stories/:id', (c) => {
  const id = c.req.param('id')
  const story = stories.find(s => s.id === id)
  
  if (!story) {
    return c.json({ error: 'Story not found' }, 404)
  }
  
  return c.json(story)
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <title>夏夜の怪談 - 八つの不思議な物語</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
            
            body {
                font-family: 'Noto Serif JP', serif;
                background: linear-gradient(to bottom, #0f0f1f, #1a1a2e);
            }
            
            .horror-text {
                text-shadow: 2px 2px 4px rgba(139, 0, 0, 0.8);
            }
            
            .story-card {
                transition: all 0.3s ease;
                background: linear-gradient(135deg, #1a1a2e, #0f0f1f);
                border: 1px solid rgba(139, 0, 0, 0.3);
            }
            
            .story-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(139, 0, 0, 0.5);
                border-color: rgba(139, 0, 0, 0.7);
            }
            
            .typewriter {
                overflow: hidden;
                white-space: pre-wrap;
                animation: typing 0.05s steps(1) forwards;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes flash {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            
            .fade-in {
                animation: fadeIn 1s ease-in;
            }
            
            .shake-effect {
                animation: shake 0.5s ease-in-out;
            }
            
            .flash-effect {
                animation: flash 0.2s ease-in-out;
            }
            
            #novel-container {
                min-height: 100vh;
                background-size: cover;
                background-position: center;
                transition: background-image 1s ease-in-out;
            }
            
            .choice-button {
                background: rgba(20, 20, 40, 0.9);
                border: 2px solid rgba(139, 0, 0, 0.5);
                transition: all 0.3s ease;
            }
            
            .choice-button:hover {
                background: rgba(139, 0, 0, 0.3);
                border-color: rgba(139, 0, 0, 0.9);
                transform: scale(1.05);
            }
            
            .floating {
                animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            /* Mobile Responsive Styles */
            @media (max-width: 768px) {
                .horror-text {
                    font-size: 2rem !important;
                }
                
                #story-text {
                    font-size: 0.95rem !important;
                    line-height: 1.6 !important;
                }
                
                .choice-button {
                    padding: 0.75rem !important;
                    font-size: 0.95rem !important;
                }
                
                #novel-container .text-box {
                    padding: 1rem !important;
                    margin: 0.5rem !important;
                }
                
                .control-btn-group {
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .control-btn {
                    padding: 0.5rem 0.75rem !important;
                    font-size: 0.85rem !important;
                }
            }
            
            @media (max-width: 480px) {
                .horror-text {
                    font-size: 1.75rem !important;
                }
                
                #story-text {
                    font-size: 0.9rem !important;
                }
                
                .story-card {
                    padding: 1rem !important;
                }
                
                .control-btn-text {
                    display: none;
                }
                
                #character-name {
                    font-size: 0.9rem !important;
                }
            }
            
            /* Touch-friendly buttons */
            @media (pointer: coarse) {
                .choice-button, .control-btn {
                    min-height: 44px;
                    min-width: 44px;
                }
            }
            
            /* Prevent text selection on mobile */
            @media (max-width: 768px) {
                body {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            }
        </style>
    </head>
    <body class="bg-gray-900 text-gray-100">
        <!-- Story Selection Screen -->
        <div id="story-selection" class="container mx-auto px-4 py-4 md:py-8">
            <div class="text-center mb-8 md:mb-12 fade-in">
                <h1 class="text-3xl md:text-5xl font-bold horror-text text-red-600 mb-4">
                    <i class="fas fa-ghost mr-3"></i>夏夜の怪談
                </h1>
                <p class="text-lg md:text-xl text-gray-400">八つの不思議な物語</p>
                <div class="mt-4 text-yellow-400 floating">
                    <i class="fas fa-moon text-3xl"></i>
                </div>
            </div>
            
            <div id="stories-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <!-- Stories will be loaded here -->
            </div>
        </div>
        
        <!-- Novel Game Screen -->
        <div id="novel-container" class="hidden relative">
            <div class="absolute inset-0 bg-black bg-opacity-50"></div>
            
            <div class="relative z-10 min-h-screen flex flex-col justify-end">
                <!-- Text Box -->
                <div class="text-box bg-gray-900 bg-opacity-90 border-t-2 border-red-900 p-4 md:p-8 m-2 md:m-4 rounded-lg">
                    <div id="character-name" class="text-red-400 font-bold mb-2 hidden"></div>
                    <div id="story-text" class="text-base md:text-lg leading-relaxed"></div>
                    
                    <!-- Choices -->
                    <div id="choices-container" class="mt-6 space-y-3 hidden">
                        <!-- Choices will be loaded here -->
                    </div>
                    
                    <!-- Controls -->
                    <div class="mt-4 md:mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <button id="back-button" class="control-btn w-full sm:w-auto px-3 md:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                            <i class="fas fa-arrow-left mr-1 md:mr-2"></i><span class="control-btn-text">戻る</span>
                        </button>
                        
                        <div class="control-btn-group flex gap-2 sm:gap-4 w-full sm:w-auto">
                            <button id="auto-button" class="control-btn flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                                <i class="fas fa-play mr-1 md:mr-2"></i><span class="control-btn-text">オート</span>
                            </button>
                            <button id="skip-button" class="control-btn flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                                <i class="fas fa-forward mr-1 md:mr-2"></i><span class="control-btn-text">スキップ</span>
                            </button>
                            <button id="next-button" class="control-btn flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-red-800 hover:bg-red-700 rounded-lg transition">
                                <span class="control-btn-text">次へ</span><i class="fas fa-arrow-right ml-1 md:ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Audio Elements -->
        <audio id="bgm-player" loop></audio>
        <audio id="sfx-player"></audio>
        
        <script src="/static/js/novel-engine.js"></script>
    </body>
    </html>
  `)
})

export default app