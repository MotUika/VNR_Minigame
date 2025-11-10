// Game JavaScript cho Người Lính Cụ Hồ - Tây Bắc 1954

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.lives = 3;
        this.gameRunning = false; // Will start after name input
        this.keys = {};
        this.animationFrame = 0;
        this.playerName = '';
        
        // Camera system
        this.camera = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            smoothing: 0.1
        };
        
        // World dimensions (4x larger)
        this.worldWidth = 4800;
        this.worldHeight = 600;
        
        // End gate position
        this.endGate = {
            x: 4650,
            y: 380,
            width: 100,
            height: 170,
            reached: false
        };
        
        // Game objects
        this.player = new Player(100, 450);
        this.enemies = [];
        this.bullets = [];
        this.platforms = [];
        this.collectibles = [];
        this.movingPlatforms = [];
        this.historyItems = [];
        this.killCount = 0;
        
        // Background elements
        this.mountains = [];
        this.trees = [];
        this.clouds = [];
        
        this.initBackground();
        this.initPlatforms();
        this.initEventListeners();
        this.showNameInputModal();
        this.gameLoop();
    }
    
    initBackground() {
        // Tạo núi (nhiều hơn cho map lớn)
        for (let i = 0; i < 25; i++) {
            this.mountains.push({
                x: i * 200 - 100,
                y: 300 + Math.random() * 100,
                width: 300 + Math.random() * 100,
                height: 200 + Math.random() * 50,
                color: `hsl(${120 + Math.random() * 20}, ${30 + Math.random() * 20}%, ${25 + Math.random() * 15}%)`,
                parallax: 0.3 + Math.random() * 0.2
            });
        }
        
        // Tạo cây (nhiều hơn cho map lớn)
        for (let i = 0; i < 60; i++) {
            this.trees.push({
                x: i * 80 + Math.random() * 40,
                y: 480 + Math.random() * 20,
                height: 60 + Math.random() * 40,
                width: 8 + Math.random() * 6,
                parallax: 0.8
            });
        }
        
        // Tạo mây (nhiều hơn)
        for (let i = 0; i < 20; i++) {
            this.clouds.push({
                x: i * 250 + Math.random() * 100,
                y: 50 + Math.random() * 100,
                width: 60 + Math.random() * 40,
                height: 30 + Math.random() * 20,
                speed: 0.5 + Math.random() * 0.5,
                parallax: 0.1
            });
        }
    }
    
    initPlatforms() {
        // Tạo các platform cho map lớn (4800px)
        this.platforms = [
            { x: 0, y: 550, width: this.worldWidth, height: 50 }, // Ground
            
            // Section 1 (0-1200)
            { x: 300, y: 450, width: 200, height: 20 },
            { x: 600, y: 350, width: 150, height: 20 },
            { x: 850, y: 400, width: 180, height: 20 },
            { x: 450, y: 250, width: 120, height: 20 },
            { x: 750, y: 200, width: 200, height: 20 },
            
            // Section 2 (1200-2400)
            { x: 1300, y: 480, width: 150, height: 20 },
            { x: 1550, y: 380, width: 200, height: 20 },
            { x: 1850, y: 320, width: 180, height: 20 },
            { x: 2100, y: 420, width: 160, height: 20 },
            { x: 1650, y: 220, width: 120, height: 20 },
            { x: 2000, y: 180, width: 180, height: 20 },
            { x: 2300, y: 350, width: 150, height: 20 },
            
            // Section 3 (2400-3600)
            { x: 2500, y: 460, width: 140, height: 20 },
            { x: 2750, y: 360, width: 180, height: 20 },
            { x: 3050, y: 280, width: 160, height: 20 },
            { x: 3350, y: 390, width: 200, height: 20 },
            { x: 2800, y: 200, width: 140, height: 20 },
            { x: 3150, y: 150, width: 160, height: 20 },
            { x: 3450, y: 480, width: 120, height: 20 },
            
            // Section 4 (3600-4800)
            { x: 3700, y: 420, width: 180, height: 20 },
            { x: 4000, y: 320, width: 200, height: 20 },
            { x: 4300, y: 250, width: 160, height: 20 },
            { x: 4050, y: 180, width: 140, height: 20 },
            { x: 4400, y: 400, width: 200, height: 20 },
            { x: 4650, y: 480, width: 150, height: 20 }
        ];
        
        // Tạo collectibles cho map lớn
        this.collectibles = [
            // Section 1
            { x: 350, y: 420, collected: false },
            { x: 650, y: 320, collected: false },
            { x: 900, y: 370, collected: false },
            { x: 500, y: 220, collected: false },
            { x: 800, y: 170, collected: false },
            
            // Section 2
            { x: 1350, y: 450, collected: false },
            { x: 1600, y: 350, collected: false },
            { x: 1900, y: 290, collected: false },
            { x: 2150, y: 390, collected: false },
            { x: 1700, y: 190, collected: false },
            { x: 2050, y: 150, collected: false },
            
            // Section 3
            { x: 2550, y: 430, collected: false },
            { x: 2800, y: 330, collected: false },
            { x: 3100, y: 250, collected: false },
            { x: 3400, y: 360, collected: false },
            { x: 2850, y: 170, collected: false },
            { x: 3200, y: 120, collected: false },
            
            // Section 4
            { x: 3750, y: 390, collected: false },
            { x: 4050, y: 290, collected: false },
            { x: 4350, y: 220, collected: false },
            { x: 4100, y: 150, collected: false },
            { x: 4450, y: 370, collected: false },
            { x: 4700, y: 450, collected: false }
        ];
        
        // Moving platforms
        this.movingPlatforms = [
            { x: 1100, y: 300, width: 120, height: 20, startX: 1000, endX: 1300, speed: 1, direction: 1 },
            { x: 2000, y: 400, width: 100, height: 20, startX: 1900, endX: 2200, speed: 1.5, direction: 1 },
            { x: 3200, y: 350, width: 140, height: 20, startX: 3100, endX: 3400, speed: 0.8, direction: 1 },
            { x: 4500, y: 300, width: 120, height: 20, startX: 4400, endX: 4600, speed: 1.2, direction: 1 }
        ];
        
        // Spawn enemies
        this.spawnEnemies();
    }
    
    spawnEnemies() {
        this.enemies = [
            // Section 1 (3 enemies)
            new Enemy(400, 425, 'patrol'),
            new Enemy(700, 325, 'guard'),
            new Enemy(950, 375, 'patrol'),
            
            // Section 2 (3 enemies)
            new Enemy(1650, 355, 'guard'),
            new Enemy(1950, 295, 'patrol'),
            new Enemy(2200, 395, 'chase'),
            
            // Section 3 (3 enemies)
            new Enemy(2850, 335, 'patrol'),
            new Enemy(3150, 255, 'chase'),
            new Enemy(3450, 365, 'patrol'),
            
            // Section 4 (3 enemies)
            new Enemy(4100, 295, 'chase'),
            new Enemy(4400, 225, 'guard'),
            new Enemy(4550, 375, 'patrol')
        ];
    }
    
    initEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.keys[e.code] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            this.keys[e.code] = false;
        });
    }
    
    showNameInputModal() {
        const modal = document.getElementById('nameInputModal');
        const nameInput = document.getElementById('playerNameInput');
        const startBtn = document.getElementById('startGameBtn');
        
        nameInput.focus();
        
        const startGame = () => {
            const name = nameInput.value.trim();
            if (name.length > 0) {
                this.playerName = name;
                document.getElementById('playerNameDisplay').textContent = name;
                modal.classList.add('hidden');
                this.gameRunning = true;
                this.updateScore();
            } else {
                nameInput.style.borderColor = '#ff0000';
                nameInput.placeholder = 'Vui lòng nhập tên!';
                setTimeout(() => {
                    nameInput.style.borderColor = '#ffd700';
                }, 1000);
            }
        };
        
        startBtn.addEventListener('click', startGame);
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') startGame();
        });
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Update player
        this.player.update(this.keys, [...this.platforms, ...this.movingPlatforms]);
        
        // Check end gate collision
        if (!this.endGate.reached && this.checkCollision(this.player, this.endGate)) {
            this.endGate.reached = true;
            this.completeGame();
            return;
        }
        
        // Update camera
        this.updateCamera();
        
        // Update minimap position
        this.updateScore();
        
        // Handle shooting
        if (this.keys[' '] || this.keys['Space']) {
            this.player.shoot(this.bullets);
        }
        
        // Update moving platforms
        this.movingPlatforms.forEach(platform => {
            platform.x += platform.speed * platform.direction;
            if (platform.x <= platform.startX || platform.x >= platform.endX) {
                platform.direction *= -1;
            }
        });
        
        // Update enemies
        this.enemies.forEach(enemy => {
            enemy.update([...this.platforms, ...this.movingPlatforms], this.player);
        });
        
        // Update history items
        this.historyItems.forEach(item => {
            item.update();
        });
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.update();
            
            // Check bullet-enemy collision
            for (let i = this.enemies.length - 1; i >= 0; i--) {
                const enemy = this.enemies[i];
                if (this.checkCollision(bullet, enemy)) {
                    const enemyX = enemy.x;
                    const enemyY = enemy.y;
                    
                    this.enemies.splice(i, 1);
                    this.bullets.splice(this.bullets.indexOf(bullet), 1);
                    this.score += 100;
                    this.killCount++;
                    
                    // Drop history item every 3 kills
                    if (this.killCount % 3 === 0) {
                        const historyId = Math.floor(this.killCount / 3); // 1, 2, 3, ...
                        this.historyItems.push(new HistoryItem(enemyX, enemyY, historyId));
                    }
                    
                    this.updateScore();
                    return false;
                }
            }
            
            return bullet.x < this.worldWidth && bullet.x > 0;
        });
        
        // Check player-enemy collision
        this.enemies.forEach(enemy => {
            if (this.checkCollision(this.player, enemy)) {
                this.takeDamage();
            }
        });
        
        // Check history item collection
        this.historyItems.forEach(item => {
            if (!item.collected && this.checkCollision(this.player, item)) {
                item.collected = true;
                this.showHistoryPopup(item.historyId);
            }
        });
        
        // Check collectible collection
        this.collectibles.forEach(collectible => {
            if (!collectible.collected && 
                this.checkCollision(this.player, {...collectible, width: 20, height: 20})) {
                collectible.collected = true;
                this.score += 50;
                this.updateScore();
            }
        });
        
        // Update clouds
        this.clouds.forEach(cloud => {
            cloud.x += cloud.speed;
            if (cloud.x > this.worldWidth + 200) cloud.x = -cloud.width;
        });
        
        // Check if player falls
        if (this.player.y > 600) {
            this.takeDamage();
        }
        
        // Spawn new enemies periodically
        if (this.enemies.length < 8 && Math.random() < 0.003) {
            const spawnX = this.player.x + 800 + Math.random() * 400;
            if (spawnX < this.worldWidth - 100) {
                this.enemies.push(new Enemy(spawnX, 525, 'patrol'));
            }
        }
        
        // Update animation frame
        this.animationFrame += 0.05;
    }
    
    updateCamera() {
        // Camera follows player with some offset
        this.camera.targetX = this.player.x - this.canvas.width / 2;
        this.camera.targetY = this.player.y - this.canvas.height / 2;
        
        // Smooth camera movement
        this.camera.x += (this.camera.targetX - this.camera.x) * this.camera.smoothing;
        this.camera.y += (this.camera.targetY - this.camera.y) * this.camera.smoothing;
        
        // Clamp camera to world bounds
        this.camera.x = Math.max(0, Math.min(this.camera.x, this.worldWidth - this.canvas.width));
        this.camera.y = Math.max(-100, Math.min(this.camera.y, 100)); // Allow some vertical movement
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'linear-gradient(180deg, #87CEEB 0%, #228B22 100%)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Save context for camera transformation
        this.ctx.save();
        this.ctx.translate(-this.camera.x, -this.camera.y);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.3, '#98D8E8');
        gradient.addColorStop(0.6, '#90EE90');
        gradient.addColorStop(0.8, '#228B22');
        gradient.addColorStop(1, '#1C3A1C');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.worldWidth, 600);
        
        // Draw mountains with parallax
        this.mountains.forEach(mountain => {
            const parallaxX = mountain.x - this.camera.x * mountain.parallax;
            this.ctx.fillStyle = mountain.color;
            this.ctx.beginPath();
            this.ctx.moveTo(parallaxX, 600);
            this.ctx.lineTo(parallaxX + mountain.width/2, mountain.y);
            this.ctx.lineTo(parallaxX + mountain.width, 600);
            this.ctx.closePath();
            this.ctx.fill();
        });
        
        // Draw clouds with parallax
        this.clouds.forEach(cloud => {
            const parallaxX = cloud.x - this.camera.x * cloud.parallax;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(parallaxX, cloud.y, cloud.width/3, 0, Math.PI * 2);
            this.ctx.arc(parallaxX + cloud.width/3, cloud.y, cloud.width/4, 0, Math.PI * 2);
            this.ctx.arc(parallaxX + cloud.width/2, cloud.y, cloud.width/3, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw trees with parallax
        this.trees.forEach(tree => {
            const parallaxX = tree.x - this.camera.x * tree.parallax;
            // Trunk
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(parallaxX, tree.y, tree.width, tree.height);
            
            // Leaves
            this.ctx.fillStyle = '#228B22';
            this.ctx.beginPath();
            this.ctx.arc(parallaxX + tree.width/2, tree.y, tree.width * 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw platforms
        [...this.platforms, ...this.movingPlatforms].forEach(platform => {
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            
            // Add grass texture on top
            if (platform.height > 15) {
                this.ctx.fillStyle = '#228B22';
                this.ctx.fillRect(platform.x, platform.y, platform.width, 10);
            }
        });
        
        // Draw history items
        this.historyItems.forEach(item => {
            item.draw(this.ctx);
        });
        
        // Draw collectibles (enhanced stars)
        this.collectibles.forEach(collectible => {
            if (!collectible.collected) {
                // Floating animation
                const float = Math.sin(this.animationFrame * 2) * 3;
                const sparkle = Math.sin(this.animationFrame * 3) * 0.3 + 1;
                
                // Glow effect
                this.ctx.shadowColor = '#FFD700';
                this.ctx.shadowBlur = 10;
                
                // Draw star with sparkle effect
                this.ctx.fillStyle = '#FFD700';
                this.ctx.strokeStyle = '#FFA500';
                this.ctx.lineWidth = 2;
                this.ctx.save();
                this.ctx.translate(collectible.x + 10, collectible.y + 10 + float);
                this.ctx.scale(sparkle, sparkle);
                this.drawStar(0, 0, 10, 5);
                this.ctx.restore();
                
                // Reset shadow
                this.ctx.shadowBlur = 0;
                
                // Add sparkles around the star
                for (let i = 0; i < 3; i++) {
                    const angle = this.animationFrame * 2 + i * (Math.PI * 2 / 3);
                    const sparkleX = collectible.x + 10 + Math.cos(angle) * 15;
                    const sparkleY = collectible.y + 10 + float + Math.sin(angle) * 10;
                    
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(this.animationFrame * 4 + i) * 0.3})`;
                    this.ctx.beginPath();
                    this.ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        });
        
        // Draw game objects
        this.player.draw(this.ctx);
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.bullets.forEach(bullet => bullet.draw(this.ctx));
        
        // Draw end gate
        this.drawEndGate();
        
        // Restore context
        this.ctx.restore();
    }
    
    drawStar(x, y, radius, points) {
        const angle = Math.PI / points;
        this.ctx.beginPath();
        for (let i = 0; i < 2 * points; i++) {
            const r = i % 2 === 0 ? radius : radius * 0.5;
            const currX = x + Math.cos(i * angle - Math.PI / 2) * r;
            const currY = y + Math.sin(i * angle - Math.PI / 2) * r;
            if (i === 0) this.ctx.moveTo(currX, currY);
            else this.ctx.lineTo(currX, currY);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    
    drawEndGate() {
        const gate = this.endGate;
        
        // Gate glow effect
        if (!gate.reached) {
            this.ctx.shadowColor = '#FFD700';
            this.ctx.shadowBlur = 20;
        }
        
        // Gate pillars
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(gate.x, gate.y, 15, gate.height);
        this.ctx.fillRect(gate.x + gate.width - 15, gate.y, 15, gate.height);
        
        // Gate arch
        this.ctx.beginPath();
        this.ctx.arc(gate.x + gate.width / 2, gate.y + 20, gate.width / 2, Math.PI, 0);
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fill();
        this.ctx.strokeStyle = '#654321';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Gate door
        const gradient = this.ctx.createLinearGradient(gate.x + 15, 0, gate.x + gate.width - 15, 0);
        gradient.addColorStop(0, '#228B22');
        gradient.addColorStop(0.5, '#32CD32');
        gradient.addColorStop(1, '#228B22');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(gate.x + 15, gate.y + 20, gate.width - 30, gate.height - 20);
        
        // Vietnamese star on gate
        this.ctx.fillStyle = '#FFD700';
        this.ctx.strokeStyle = '#DA251D';
        this.ctx.lineWidth = 2;
        this.ctx.save();
        this.ctx.translate(gate.x + gate.width / 2, gate.y + gate.height / 2);
        this.drawStar(0, 0, 25, 5);
        this.ctx.restore();
        
        // Gate text
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CHIẾN THẮNG', gate.x + gate.width / 2, gate.y - 10);
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
        this.ctx.textAlign = 'left';
    }
    
    completeGame() {
        this.gameRunning = false;
        this.saveScore();
        this.showVictoryScreen();
    }
    
    saveScore() {
        // Get existing leaderboard
        let leaderboard = JSON.parse(localStorage.getItem('vnr_leaderboard') || '[]');
        
        // Add new score
        leaderboard.push({
            name: this.playerName,
            score: this.score,
            date: new Date().toISOString()
        });
        
        // Sort by score (descending)
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Keep only top 10
        leaderboard = leaderboard.slice(0, 10);
        
        // Save to localStorage
        localStorage.setItem('vnr_leaderboard', JSON.stringify(leaderboard));
    }
    
    showVictoryScreen() {
        const screen = document.getElementById('victoryScreen');
        document.getElementById('victoryPlayerName').textContent = this.playerName;
        document.getElementById('victoryScore').textContent = this.score;
        
        // Load and display leaderboard
        const leaderboard = JSON.parse(localStorage.getItem('vnr_leaderboard') || '[]');
        const leaderboardList = document.getElementById('leaderboardList');
        
        if (leaderboard.length === 0) {
            leaderboardList.innerHTML = '<p style="color: #fff; text-align: center;">Chưa có điểm nào</p>';
        } else {
            leaderboardList.innerHTML = leaderboard.map((entry, index) => {
                const rankClass = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
                const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
                return `
                    <div class="leaderboard-item ${rankClass}">
                        <span class="leaderboard-rank">${medal}${index + 1}</span>
                        <span class="leaderboard-name">${entry.name}</span>
                        <span class="leaderboard-score">${entry.score} điểm</span>
                    </div>
                `;
            }).join('');
        }
        
        screen.classList.remove('hidden');
    }
    
    showHistoryPopup(historyId) {
        // Get random quiz question
        const quizQuestion = QUIZ_DATA[Math.floor(Math.random() * QUIZ_DATA.length)];
        
        // Create popup elements with quiz
        const popup = document.createElement('div');
        popup.className = 'history-popup';
        popup.innerHTML = `
            <div class="history-popup-content">
                <div class="history-popup-header">
                    <h3>Câu Hỏi Lịch Sử Việt Nam</h3>
                    <button class="history-popup-close">&times;</button>
                </div>
                <div class="history-popup-body">
                    <p class="quiz-question">${quizQuestion.question}</p>
                    <div class="quiz-options">
                        ${quizQuestion.options.map((option, index) => `
                            <button class="quiz-option" data-index="${index}">
                                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                                <span class="option-text">${option}</span>
                            </button>
                        `).join('')}
                    </div>
                    <div class="quiz-result hidden"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Pause game
        this.gameRunning = false;
        
        let answered = false;
        
        // Close popup handlers
        const closeBtn = popup.querySelector('.history-popup-close');
        const closePopup = () => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
                this.gameRunning = true;
            }
        };
        
        // Handle answer selection
        const optionButtons = popup.querySelectorAll('.quiz-option');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (answered) return;
                
                answered = true;
                const selectedIndex = parseInt(btn.dataset.index);
                const isCorrect = selectedIndex === quizQuestion.correct;
                
                // Mark correct and incorrect answers
                optionButtons.forEach((optBtn, idx) => {
                    optBtn.disabled = true;
                    if (idx === quizQuestion.correct) {
                        optBtn.classList.add('correct');
                    } else if (idx === selectedIndex && !isCorrect) {
                        optBtn.classList.add('incorrect');
                    }
                });
                
                // Show result
                const resultDiv = popup.querySelector('.quiz-result');
                resultDiv.classList.remove('hidden');
                
                if (isCorrect) {
                    const bonusPoints = 50;
                    this.score += bonusPoints;
                    this.updateScore();
                    resultDiv.innerHTML = `
                        <p class="result-correct">✓ Chính xác! +${bonusPoints} điểm</p>
                        <p class="result-explanation">Bạn đã trả lời đúng câu hỏi lịch sử!</p>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <p class="result-incorrect">✗ Không chính xác</p>
                        <p class="result-explanation">Đáp án đúng là: <strong>${String.fromCharCode(65 + quizQuestion.correct)}</strong></p>
                    `;
                }
                
                // Auto close after showing result
                setTimeout(closePopup, 4000);
            });
        });
        
        closeBtn.addEventListener('click', closePopup);
        popup.addEventListener('click', (e) => {
            if (e.target === popup) closePopup();
        });
        
        // Auto close after 30 seconds if no answer
        setTimeout(() => {
            if (!answered) closePopup();
        }, 30000);
    }
    
    checkCollision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }
    
    takeDamage() {
        this.lives--;
        this.updateLives();
        this.player.x = 100;
        this.player.y = 450;
        this.player.velocityX = 0;
        this.player.velocityY = 0;
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        
        // Update progress
        const progress = Math.floor((this.player.x / this.worldWidth) * 100);
        document.getElementById('progress').textContent = progress;
        
        // Update minimap
        const minimapPlayer = document.getElementById('minimapPlayer');
        const minimapProgress = document.getElementById('minimapProgress');
        
        if (minimapPlayer && minimapProgress) {
            const playerPercent = (this.player.x / this.worldWidth) * 100;
            minimapPlayer.style.left = playerPercent + '%';
            minimapProgress.style.width = playerPercent + '%';
        }
    }
    
    updateLives() {
        document.getElementById('lives').textContent = this.lives;
    }
    
    gameOver() {
        this.gameRunning = false;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOver').classList.remove('hidden');
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 35;
        this.height = 45;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = 15;
        this.grounded = false;
        this.facingRight = true;
        this.shootCooldown = 0;
        this.animationFrame = 0;
        this.walkCycle = 0;
        this.bounceOffset = 0;
    }
    
    update(keys, platforms) {
        // Horizontal movement
        if (keys['a'] || keys['ArrowLeft']) {
            this.velocityX = -this.speed;
            this.facingRight = false;
            this.walkCycle += 0.3;
        } else if (keys['d'] || keys['ArrowRight']) {
            this.velocityX = this.speed;
            this.facingRight = true;
            this.walkCycle += 0.3;
        } else {
            this.velocityX *= 0.8; // Friction
            this.walkCycle = 0;
        }
        
        // Jumping
        if ((keys['w'] || keys['ArrowUp']) && this.grounded) {
            this.velocityY = -this.jumpPower;
            this.grounded = false;
        }
        
        // Gravity
        this.velocityY += 0.8;
        
        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Platform collision
        this.grounded = false;
        platforms.forEach(platform => {
            if (this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.y < platform.y + platform.height &&
                this.y + this.height > platform.y) {
                
                // Top collision
                if (this.velocityY > 0 && this.y < platform.y) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.grounded = true;
                }
                // Bottom collision
                else if (this.velocityY < 0 && this.y > platform.y) {
                    this.y = platform.y + platform.height;
                    this.velocityY = 0;
                }
            }
        });
        
        // Screen boundaries (world bounds)
        if (this.x < 0) this.x = 0;
        if (this.x > 4800 - this.width) this.x = 4800 - this.width;
        
        // Update shoot cooldown
        if (this.shootCooldown > 0) this.shootCooldown--;
        
        // Animation updates
        this.animationFrame += 0.1;
        this.bounceOffset = Math.sin(this.animationFrame) * 1;
    }
    
    shoot(bullets) {
        if (this.shootCooldown <= 0) {
            const bulletX = this.facingRight ? this.x + this.width : this.x;
            bullets.push(new Bullet(bulletX, this.y + this.height/2, this.facingRight));
            this.shootCooldown = 20;
        }
    }
    
    draw(ctx) {
        ctx.save();
        
        // Walking animation bounce
        const walkBounce = Math.abs(Math.sin(this.walkCycle)) * 2;
        const totalBounce = this.bounceOffset + (this.velocityX !== 0 ? walkBounce : 0);
        
        // Flip horizontally if facing left
        if (!this.facingRight) {
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }
        
        const centerX = this.x + this.width / 2;
        const centerY = this.y + totalBounce;
        
        // NGƯỜI LÍNH CỤ HỒ - CHIBI CHARACTER DRAWING
        
        // Head (bigger for chibi style) - skin color with gradient
        const headGradient = ctx.createRadialGradient(centerX, centerY + 8, 0, centerX, centerY + 8, 16);
        headGradient.addColorStop(0, '#FFDBAC');
        headGradient.addColorStop(1, '#E6C2A6');
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 8, 16, 0, Math.PI * 2);
        ctx.fill();
        
        // Head outline
        ctx.strokeStyle = '#C49484';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Eyes (big chibi eyes)
        // Left eye
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(centerX - 6, centerY + 6, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Left pupil
        ctx.fillStyle = '#2B1810';
        ctx.beginPath();
        ctx.arc(centerX - 6, centerY + 7, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Left eye shine
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY + 5.5, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Right eye
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(centerX + 6, centerY + 6, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Right pupil
        ctx.fillStyle = '#2B1810';
        ctx.beginPath();
        ctx.arc(centerX + 6, centerY + 7, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Right eye shine
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(centerX + 7, centerY + 5.5, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Nose (tiny chibi nose)
        ctx.fillStyle = '#E6C2A6';
        ctx.beginPath();
        ctx.arc(centerX, centerY + 10, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Mouth (small smile)
        ctx.strokeStyle = '#B85450';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 12, 3, 0, Math.PI);
        ctx.stroke();
        
        // MŨ TAI BÈO (Vietnamese military field hat)
        // Hat crown (main part)
        ctx.fillStyle = '#2F5233'; // Military green
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 2, 20, 14, 0, 0, Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#1C3A1C';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Hat brim (tai bèo - wide brim)
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 8, 26, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1C3A1C';
        ctx.stroke();
        
        // Hat band
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(centerX - 20, centerY + 4, 40, 3);
        
        // Red star on hat
        ctx.fillStyle = '#FF0000';
        this.drawStar(ctx, centerX, centerY - 2, 6, 5);
        
        // ÁO XANH (Blue/Green military uniform)
        const bodyGradient = ctx.createLinearGradient(centerX - 12, centerY + 20, centerX + 12, centerY + 35);
        bodyGradient.addColorStop(0, '#4682B4'); // Steel blue
        bodyGradient.addColorStop(0.5, '#2E8B57'); // Sea green  
        bodyGradient.addColorStop(1, '#228B22'); // Forest green
        ctx.fillStyle = bodyGradient;
        ctx.fillRect(centerX - 12, centerY + 20, 24, 18);
        
        // Uniform outline
        ctx.strokeStyle = '#1C3A1C';
        ctx.lineWidth = 1;
        ctx.strokeRect(centerX - 12, centerY + 20, 24, 18);
        
        // Uniform buttons
        ctx.fillStyle = '#FFD700';
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY + 24 + i * 4, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Collar
        ctx.strokeStyle = '#1C3A1C';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 8, centerY + 20);
        ctx.lineTo(centerX - 4, centerY + 16);
        ctx.lineTo(centerX + 4, centerY + 16);
        ctx.lineTo(centerX + 8, centerY + 20);
        ctx.stroke();
        
        // Sleeves and arms
        const armWaveLeft = Math.sin(this.walkCycle) * 0.5;
        const armWaveRight = Math.sin(this.walkCycle + Math.PI) * 0.5;
        
        // Left arm
        ctx.save();
        ctx.translate(centerX - 14, centerY + 24);
        ctx.rotate(armWaveLeft);
        ctx.fillStyle = bodyGradient;
        ctx.fillRect(-3, -2, 6, 12);
        ctx.strokeStyle = '#1C3A1C';
        ctx.strokeRect(-3, -2, 6, 12);
        
        // Left hand
        ctx.fillStyle = '#FFDBAC';
        ctx.beginPath();
        ctx.arc(0, 10, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        
        // Right arm (holding weapon)
        ctx.save();
        ctx.translate(centerX + 14, centerY + 24);
        ctx.rotate(armWaveRight);
        ctx.fillStyle = bodyGradient;
        ctx.fillRect(-3, -2, 6, 12);
        ctx.strokeStyle = '#1C3A1C';
        ctx.strokeRect(-3, -2, 6, 12);
        
        // Right hand
        ctx.fillStyle = '#FFDBAC';
        ctx.beginPath();
        ctx.arc(0, 10, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        
        // Pants (continued uniform)
        ctx.fillStyle = bodyGradient;
        ctx.fillRect(centerX - 10, centerY + 38, 20, 12);
        ctx.strokeStyle = '#1C3A1C';
        ctx.strokeRect(centerX - 10, centerY + 38, 20, 12);
        
        // Legs with DÉP RÂU (traditional sandals)
        const legWaveLeft = Math.sin(this.walkCycle) * 0.3;
        const legWaveRight = Math.sin(this.walkCycle + Math.PI) * 0.3;
        
        // Left leg
        ctx.save();
        ctx.translate(centerX - 6, centerY + 38);
        ctx.rotate(legWaveLeft);
        ctx.fillStyle = '#FFDBAC'; // Bare legs
        ctx.fillRect(-2, 0, 4, 12);
        ctx.strokeStyle = '#C49484';
        ctx.strokeRect(-2, 0, 4, 12);
        
        // Left dép râu (traditional sandal)
        ctx.fillStyle = '#8B4513'; // Brown leather
        ctx.fillRect(-4, 10, 8, 3);
        // Sandal straps
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-2, 10);
        ctx.lineTo(0, 8);
        ctx.lineTo(2, 10);
        ctx.stroke();
        ctx.restore();
        
        // Right leg
        ctx.save();
        ctx.translate(centerX + 6, centerY + 38);
        ctx.rotate(legWaveRight);
        ctx.fillStyle = '#FFDBAC'; // Bare legs
        ctx.fillRect(-2, 0, 4, 12);
        ctx.strokeStyle = '#C49484';
        ctx.strokeRect(-2, 0, 4, 12);
        
        // Right dép râu (traditional sandal)
        ctx.fillStyle = '#8B4513'; // Brown leather
        ctx.fillRect(-4, 10, 8, 3);
        // Sandal straps
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-2, 10);
        ctx.lineTo(0, 8);
        ctx.lineTo(2, 10);
        ctx.stroke();
        ctx.restore();
        
        // SÚNG DÀI (Long rifle - AK-47 style)
        if (this.facingRight) {
            // Rifle body
            ctx.fillStyle = '#4A4A4A';
            ctx.fillRect(centerX + 16, centerY + 20, 18, 4);
            ctx.strokeStyle = '#2F2F2F';
            ctx.strokeRect(centerX + 16, centerY + 20, 18, 4);
            
            // Rifle barrel
            ctx.fillStyle = '#333333';
            ctx.fillRect(centerX + 32, centerY + 21, 8, 2);
            
            // Rifle stock
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(centerX + 12, centerY + 18, 6, 8);
            ctx.strokeStyle = '#654321';
            ctx.strokeRect(centerX + 12, centerY + 18, 6, 8);
            
            // Magazine
            ctx.fillStyle = '#2F2F2F';
            ctx.fillRect(centerX + 20, centerY + 24, 6, 8);
            
            // Trigger guard
            ctx.strokeStyle = '#4A4A4A';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX + 20, centerY + 22, 3, 0, Math.PI);
            ctx.stroke();
        } else {
            // Rifle body (flipped)
            ctx.fillStyle = '#4A4A4A';
            ctx.fillRect(centerX - 34, centerY + 20, 18, 4);
            ctx.strokeStyle = '#2F2F2F';
            ctx.strokeRect(centerX - 34, centerY + 20, 18, 4);
            
            // Rifle barrel
            ctx.fillStyle = '#333333';
            ctx.fillRect(centerX - 40, centerY + 21, 8, 2);
            
            // Rifle stock
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(centerX - 18, centerY + 18, 6, 8);
            ctx.strokeStyle = '#654321';
            ctx.strokeRect(centerX - 18, centerY + 18, 6, 8);
            
            // Magazine
            ctx.fillStyle = '#2F2F2F';
            ctx.fillRect(centerX - 26, centerY + 24, 6, 8);
            
            // Trigger guard
            ctx.strokeStyle = '#4A4A4A';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX - 20, centerY + 22, 3, 0, Math.PI);
            ctx.stroke();
        }
        
        // Cheek blush (chibi style)
        ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
        ctx.beginPath();
        ctx.ellipse(centerX - 12, centerY + 12, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(centerX + 12, centerY + 12, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
    
    drawStar(ctx, x, y, radius, points) {
        const angle = Math.PI / points;
        ctx.beginPath();
        for (let i = 0; i < 2 * points; i++) {
            const r = i % 2 === 0 ? radius : radius * 0.5;
            const currX = x + Math.cos(i * angle - Math.PI / 2) * r;
            const currY = y + Math.sin(i * angle - Math.PI / 2) * r;
            if (i === 0) ctx.moveTo(currX, currY);
            else ctx.lineTo(currX, currY);
        }
        ctx.closePath();
        ctx.fill();
    }
}

class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.type = type;
        this.velocityX = type === 'patrol' ? -1 : 0;
        this.velocityY = 0;
        this.direction = -1;
        this.patrolDistance = 150;
        this.startX = x;
        this.grounded = false;
        this.detectionRange = 100;
        this.animationFrame = 0;
        this.walkCycle = 0;
        this.bounceOffset = 0;
        this.facingRight = false;
    }
    
    update(platforms, player) {
        // AI behavior
        if (this.type === 'patrol') {
            if (Math.abs(this.x - this.startX) > this.patrolDistance) {
                this.direction *= -1;
            }
            this.velocityX = this.direction;
            this.facingRight = this.direction > 0;
            if (this.velocityX !== 0) this.walkCycle += 0.3;
        } else if (this.type === 'chase') {
            const distance = Math.abs(this.x - player.x);
            if (distance < this.detectionRange) {
                this.velocityX = this.x < player.x ? 1.5 : -1.5;
                this.facingRight = this.velocityX > 0;
                this.walkCycle += 0.3;
            } else {
                this.velocityX *= 0.9;
                this.walkCycle = 0;
            }
        }
        
        // Gravity
        this.velocityY += 0.8;
        
        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Platform collision
        this.grounded = false;
        platforms.forEach(platform => {
            if (this.x < platform.x + platform.width &&
                this.x + this.width > platform.x &&
                this.y < platform.y + platform.height &&
                this.y + this.height > platform.y) {
                
                if (this.velocityY > 0 && this.y < platform.y) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.grounded = true;
                }
            }
        });
        
        // Animation updates
        this.animationFrame += 0.1;
        this.bounceOffset = Math.sin(this.animationFrame) * 0.5;
    }
    
    draw(ctx) {
        ctx.save();
        
        // Walking animation bounce
        const walkBounce = Math.abs(Math.sin(this.walkCycle)) * 1.5;
        const totalBounce = this.bounceOffset + (this.velocityX !== 0 ? walkBounce : 0);
        
        // Flip horizontally if facing left
        if (!this.facingRight) {
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }
        
        const centerX = this.x + this.width / 2;
        const centerY = this.y + totalBounce;
        
        // CHIBI ENEMY CHARACTER DRAWING
        
        // Head (chibi style) - slightly different skin tone
        const headGradient = ctx.createRadialGradient(centerX, centerY + 6, 0, centerX, centerY + 6, 14);
        headGradient.addColorStop(0, '#F5DCC8');
        headGradient.addColorStop(1, '#E0C2A0');
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 6, 14, 0, Math.PI * 2);
        ctx.fill();
        
        // Head outline
        ctx.strokeStyle = '#C49484';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Eyes (angry chibi eyes)
        // Left eye (angry)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(centerX - 5, centerY + 4, 3, 4, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Left pupil (red/angry)
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY + 5, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Right eye (angry)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(centerX + 5, centerY + 4, 3, 4, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Right pupil (red/angry)
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.arc(centerX + 5, centerY + 5, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Angry eyebrows
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 8, centerY + 1);
        ctx.lineTo(centerX - 3, centerY + 3);
        ctx.moveTo(centerX + 8, centerY + 1);
        ctx.lineTo(centerX + 3, centerY + 3);
        ctx.stroke();
        
        // Nose (tiny)
        ctx.fillStyle = '#E0C2A0';
        ctx.beginPath();
        ctx.arc(centerX, centerY + 8, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Mouth (angry frown)
        ctx.strokeStyle = '#B85450';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 8, 3, Math.PI, 0);
        ctx.stroke();
        
        // Enemy helmet (different from friendly hat)
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 4, 16, 10, 0, 0, Math.PI);
        ctx.fill();
        
        // Helmet chin strap
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY + 12, 8, 0.5, Math.PI - 0.5);
        ctx.stroke();
        
        // Enemy insignia (different symbol)
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(centerX - 3, centerY - 4, 6, 6);
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(centerX - 1, centerY - 2, 2, 2);
        
        // Body (enemy uniform - red)
        const bodyGradient = ctx.createLinearGradient(centerX - 9, centerY + 16, centerX + 9, centerY + 30);
        bodyGradient.addColorStop(0, '#8B0000');
        bodyGradient.addColorStop(1, '#660000');
        ctx.fillStyle = bodyGradient;
        ctx.fillRect(centerX - 9, centerY + 16, 18, 16);
        
        // Body outline
        ctx.strokeStyle = '#4A0000';
        ctx.lineWidth = 1;
        ctx.strokeRect(centerX - 9, centerY + 16, 18, 16);
        
        // Belt
        ctx.fillStyle = '#654321';
        ctx.fillRect(centerX - 9, centerY + 24, 18, 3);
        
        // Arms (small chibi arms)
        const armWaveLeft = Math.sin(this.walkCycle) * 0.4;
        const armWaveRight = Math.sin(this.walkCycle + Math.PI) * 0.4;
        
        // Left arm
        ctx.save();
        ctx.translate(centerX - 11, centerY + 20);
        ctx.rotate(armWaveLeft);
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(-2.5, -2, 5, 10);
        ctx.strokeStyle = '#4A0000';
        ctx.strokeRect(-2.5, -2, 5, 10);
        
        // Left hand
        ctx.fillStyle = '#F5DCC8';
        ctx.beginPath();
        ctx.arc(0, 8, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        
        // Right arm
        ctx.save();
        ctx.translate(centerX + 11, centerY + 20);
        ctx.rotate(armWaveRight);
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(-2.5, -2, 5, 10);
        ctx.strokeStyle = '#4A0000';
        ctx.strokeRect(-2.5, -2, 5, 10);
        
        // Right hand
        ctx.fillStyle = '#F5DCC8';
        ctx.beginPath();
        ctx.arc(0, 8, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        
        // Legs (chibi legs with walking animation)
        const legWaveLeft = Math.sin(this.walkCycle) * 0.25;
        const legWaveRight = Math.sin(this.walkCycle + Math.PI) * 0.25;
        
        // Left leg
        ctx.save();
        ctx.translate(centerX - 5, centerY + 32);
        ctx.rotate(legWaveLeft);
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(-2.5, 0, 5, 9);
        ctx.strokeStyle = '#4A0000';
        ctx.strokeRect(-2.5, 0, 5, 9);
        
        // Left boot
        ctx.fillStyle = '#2F2F2F';
        ctx.fillRect(-3, 7, 6, 3);
        ctx.strokeRect(-3, 7, 6, 3);
        ctx.restore();
        
        // Right leg
        ctx.save();
        ctx.translate(centerX + 5, centerY + 32);
        ctx.rotate(legWaveRight);
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(-2.5, 0, 5, 9);
        ctx.strokeStyle = '#4A0000';
        ctx.strokeRect(-2.5, 0, 5, 9);
        
        // Right boot
        ctx.fillStyle = '#2F2F2F';
        ctx.fillRect(-3, 7, 6, 3);
        ctx.strokeRect(-3, 7, 6, 3);
        ctx.restore();
        
        // Weapon (enemy rifle)
        if (this.facingRight) {
            ctx.fillStyle = '#2F2F2F';
            ctx.fillRect(centerX + 12, centerY + 18, 10, 2.5);
            ctx.fillStyle = '#654321';
            ctx.fillRect(centerX + 20, centerY + 16, 2, 6);
        } else {
            ctx.fillStyle = '#2F2F2F';
            ctx.fillRect(centerX - 22, centerY + 18, 10, 2.5);
            ctx.fillStyle = '#654321';
            ctx.fillRect(centerX - 22, centerY + 16, 2, 6);
        }
        
        // Angry mark on forehead (anime style)
        ctx.fillStyle = '#FF4444';
        ctx.beginPath();
        ctx.moveTo(centerX + 8, centerY - 2);
        ctx.lineTo(centerX + 10, centerY);
        ctx.lineTo(centerX + 12, centerY - 2);
        ctx.lineTo(centerX + 10, centerY - 4);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
}

class Bullet {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.width = 6;
        this.height = 3;
        this.speed = direction ? 8 : -8;
        this.sparkles = [];
        this.trail = [];
    }
    
    update() {
        // Add current position to trail
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > 5) this.trail.shift();
        
        this.x += this.speed;
        
        // Add sparkle effects
        if (Math.random() < 0.3) {
            this.sparkles.push({
                x: this.x + Math.random() * 4 - 2,
                y: this.y + Math.random() * 4 - 2,
                life: 10,
                size: Math.random() * 2 + 1
            });
        }
        
        // Update sparkles
        this.sparkles = this.sparkles.filter(sparkle => {
            sparkle.life--;
            sparkle.size *= 0.9;
            return sparkle.life > 0;
        });
    }
    
    draw(ctx) {
        // Draw trail
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
            const alpha = i / this.trail.length;
            ctx.globalAlpha = alpha * 0.5;
            if (i === 0) {
                ctx.moveTo(this.trail[i].x, this.trail[i].y);
            } else {
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // Draw main bullet (chibi style)
        const gradient = ctx.createRadialGradient(this.x + 3, this.y + 1.5, 0, this.x + 3, this.y + 1.5, 4);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.7, '#FFA500');
        gradient.addColorStop(1, '#FF8C00');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(this.x + 3, this.y + 1.5, 3, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Add shine
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(this.x + 2, this.y + 1, 1, 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw sparkles
        this.sparkles.forEach(sparkle => {
            ctx.fillStyle = `rgba(255, 255, 255, ${sparkle.life / 10})`;
            ctx.beginPath();
            ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

class HistoryItem {
    constructor(x, y, historyId) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.historyId = historyId;
        this.collected = false;
        this.animationFrame = 0;
        this.floatOffset = 0;
        this.glowIntensity = 0;
    }
    
    update() {
        this.animationFrame += 0.1;
        this.floatOffset = Math.sin(this.animationFrame * 2) * 3;
        this.glowIntensity = Math.sin(this.animationFrame * 3) * 0.5 + 0.5;
    }
    
    draw(ctx) {
        if (this.collected) return;
        
        ctx.save();
        
        // Glow effect
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15 + this.glowIntensity * 10;
        
        // Item background (scroll/book)
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2 + this.floatOffset;
        
        // Draw scroll
        ctx.fillStyle = '#F5DEB3'; // Beige color for parchment
        ctx.strokeStyle = '#8B4513'; // Brown border
        ctx.lineWidth = 2;
        
        // Scroll body
        ctx.fillRect(this.x + 3, this.y + 5 + this.floatOffset, this.width - 6, this.height - 10);
        ctx.strokeRect(this.x + 3, this.y + 5 + this.floatOffset, this.width - 6, this.height - 10);
        
        // Scroll rolls (top and bottom)
        ctx.fillStyle = '#DEB887';
        ctx.fillRect(this.x, this.y + this.floatOffset, this.width, 5);
        ctx.fillRect(this.x, this.y + this.height - 5 + this.floatOffset, this.width, 5);
        ctx.strokeRect(this.x, this.y + this.floatOffset, this.width, 5);
        ctx.strokeRect(this.x, this.y + this.height - 5 + this.floatOffset, this.width, 5);
        
        // History icon (Vietnamese flag colors)
        ctx.fillStyle = '#DA251D'; // Red
        ctx.fillRect(centerX - 6, centerY - 4, 12, 8);
        
        // Star on flag
        ctx.fillStyle = '#FFD700';
        this.drawStar(ctx, centerX, centerY, 3, 5);
        
        // Text indicator
        ctx.fillStyle = '#8B4513';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('!', centerX, centerY + 12);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Sparkle effects
        for (let i = 0; i < 4; i++) {
            const angle = this.animationFrame * 2 + i * (Math.PI / 2);
            const sparkleX = centerX + Math.cos(angle) * 20;
            const sparkleY = centerY + Math.sin(angle) * 15;
            
            ctx.fillStyle = `rgba(255, 215, 0, ${0.3 + Math.sin(this.animationFrame * 4 + i) * 0.3})`;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
    
    drawStar(ctx, x, y, radius, points) {
        const angle = Math.PI / points;
        ctx.beginPath();
        for (let i = 0; i < 2 * points; i++) {
            const r = i % 2 === 0 ? radius : radius * 0.5;
            const currX = x + Math.cos(i * angle - Math.PI / 2) * r;
            const currY = y + Math.sin(i * angle - Math.PI / 2) * r;
            if (i === 0) ctx.moveTo(currX, currY);
            else ctx.lineTo(currX, currY);
        }
        ctx.closePath();
        ctx.fill();
    }
}

// Global functions
function restartGame() {
    location.reload();
}

// Start game
let game;
window.addEventListener('load', () => {
    game = new Game();
});