 const iconData = [
            // Regular icons
            { name: 'Home', class: 'fas fa-home', category: 'icons' },
            { name: 'User', class: 'fas fa-user', category: 'icons' },
            { name: 'Heart', class: 'fas fa-heart', category: 'icons' },
            { name: 'Star', class: 'fas fa-star', category: 'icons' },
            { name: 'Search', class: 'fas fa-search', category: 'icons' },
            { name: 'Settings', class: 'fas fa-cog', category: 'icons' },
            { name: 'Bell', class: 'fas fa-bell', category: 'icons' },
            { name: 'Mail', class: 'fas fa-envelope', category: 'icons' },
            { name: 'Phone', class: 'fas fa-phone', category: 'icons' },
            { name: 'Calendar', class: 'fas fa-calendar', category: 'icons' },
            { name: 'Camera', class: 'fas fa-camera', category: 'icons' },
            { name: 'Music', class: 'fas fa-music', category: 'icons' },
            { name: 'Video', class: 'fas fa-video', category: 'icons' },
            { name: 'Download', class: 'fas fa-download', category: 'icons' },
            { name: 'Upload', class: 'fas fa-upload', category: 'icons' },
            { name: 'Share', class: 'fas fa-share', category: 'icons' },
            { name: 'Like', class: 'fas fa-thumbs-up', category: 'icons' },
            { name: 'Comment', class: 'fas fa-comment', category: 'icons' },
            { name: 'Edit', class: 'fas fa-edit', category: 'icons' },
            { name: 'Delete', class: 'fas fa-trash', category: 'icons' },
            { name: 'Save', class: 'fas fa-save', category: 'icons' },
            { name: 'Print', class: 'fas fa-print', category: 'icons' },
            { name: 'Lock', class: 'fas fa-lock', category: 'icons' },
            { name: 'Unlock', class: 'fas fa-unlock', category: 'icons' },
            { name: 'Eye', class: 'fas fa-eye', category: 'icons' },
            { name: 'Shopping Cart', class: 'fas fa-shopping-cart', category: 'icons' },
            { name: 'Credit Card', class: 'fas fa-credit-card', category: 'icons' },
            { name: 'Map', class: 'fas fa-map', category: 'icons' },
            { name: 'Clock', class: 'fas fa-clock', category: 'icons' },
            { name: 'Globe', class: 'fas fa-globe', category: 'icons' },
            
            // Social icons
            { name: 'Facebook', class: 'fab fa-facebook', category: 'social' },
            { name: 'Twitter', class: 'fab fa-twitter', category: 'social' },
            { name: 'Instagram', class: 'fab fa-instagram', category: 'social' },
            { name: 'LinkedIn', class: 'fab fa-linkedin', category: 'social' },
            { name: 'YouTube', class: 'fab fa-youtube', category: 'social' },
            { name: 'GitHub', class: 'fab fa-github', category: 'social' },
            { name: 'Google', class: 'fab fa-google', category: 'social' },
            { name: 'Apple', class: 'fab fa-apple', category: 'social' },
            { name: 'Microsoft', class: 'fab fa-microsoft', category: 'social' },
            { name: 'Amazon', class: 'fab fa-amazon', category: 'social' },
            { name: 'Netflix', class: 'fab fa-netflix', category: 'social' },
            { name: 'Spotify', class: 'fab fa-spotify', category: 'social' },
            { name: 'Discord', class: 'fab fa-discord', category: 'social' },
            { name: 'Telegram', class: 'fab fa-telegram', category: 'social' },
            { name: 'WhatsApp', class: 'fab fa-whatsapp', category: 'social' },
            { name: 'Snapchat', class: 'fab fa-snapchat', category: 'social' },
            { name: 'TikTok', class: 'fab fa-tiktok', category: 'social' },
            { name: 'Pinterest', class: 'fab fa-pinterest', category: 'social' },
            { name: 'Reddit', class: 'fab fa-reddit', category: 'social' },
            { name: 'Twitch', class: 'fab fa-twitch', category: 'social' }
        ];

        // State
        let currentFilter = 'all';
        let searchQuery = '';
        let displayedIcons = 0;
        const iconsPerPage = 24;
        let filteredIcons = [];

        // DOM elements
        const searchInput = document.getElementById('searchInput');
        const iconGrid = document.getElementById('iconGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const resultsInfo = document.getElementById('resultsInfo');
        const noResults = document.getElementById('noResults');
        const modalOverlay = document.getElementById('modalOverlay');
        const themeToggle = document.getElementById('themeToggle');
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        const authModalOverlay = document.getElementById('authModalOverlay');
        const authForm = document.getElementById('authForm');
        const authEmail = document.getElementById('authEmail');
        const authPassword = document.getElementById('authPassword');
        const authConfirmPassword = document.getElementById('authConfirmPassword');
        const authName = document.getElementById('authName');
        const authSubmitBtn = document.getElementById('authSubmitBtn');
        const authSwitchBtn = document.getElementById('authSwitchBtn');
        const authSwitchText = document.getElementById('authSwitchText');
        const authButtons = document.getElementById('authButtons');
        const userInfo = document.getElementById('userInfo');
        const userName = document.getElementById('userName');

        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.body.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        }

        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateFilteredIcons() {
            filteredIcons = iconData.filter(icon => {
                const categoryMatch = currentFilter === 'all' || icon.category === currentFilter;
                const searchMatch = !searchQuery || icon.name.toLowerCase().includes(searchQuery);
                return categoryMatch && searchMatch;
            });
        }

        function renderIcons(append = false) {
            if (!append) {
                iconGrid.innerHTML = '';
                displayedIcons = 0;
            }

            const iconsToShow = filteredIcons.slice(displayedIcons, displayedIcons + iconsPerPage);
            
            if (iconsToShow.length === 0 && displayedIcons === 0) {
                noResults.style.display = 'block';
                loadMoreBtn.style.display = 'none';
                resultsInfo.textContent = 'No icons found';
                return;
            }

            noResults.style.display = 'none';
            
            iconsToShow.forEach((icon, index) => {
                const iconCard = document.createElement('div');
                iconCard.className = 'icon-card';
                iconCard.style.animationDelay = `${index * 0.05}s`;
                iconCard.innerHTML = `
                    <div class="icon-display">
                        <i class="${icon.class}"></i>
                    </div>
                    <div class="icon-name">${icon.name}</div>
                    <div class="icon-class">${icon.class}</div>
                `;
                
                iconCard.addEventListener('click', () => openIconModal(icon));
                iconGrid.appendChild(iconCard);
            });

            displayedIcons += iconsToShow.length;
            loadMoreBtn.style.display = displayedIcons < filteredIcons.length ? 'block' : 'none';
            
            const total = filteredIcons.length;
            const showing = Math.min(displayedIcons, total);
            resultsInfo.textContent = `Showing ${showing} of ${total} icons`;
        }

        function resetDisplay() {
            displayedIcons = 0;
            updateFilteredIcons();
            renderIcons();
        }

        function openIconModal(icon) {
            document.getElementById('modalTitle').textContent = icon.name;
            document.getElementById('modalIcon').innerHTML = `
                <i class="${icon.class}"></i>
                <div class="modal-icon-name">${icon.name}</div>
            `;
            document.getElementById('htmlCode').textContent = `<i class="${icon.class}"></i>`;
            modalOverlay.style.display = 'flex';
        }

        function openLearnMoreModal() {
            document.getElementById('modalTitle').textContent = 'How to Use Font Awesome Icons';
            document.getElementById('modalIcon').innerHTML = `
                <i class="fas fa-info-circle"></i>
                <div class="modal-icon-name">Getting Started</div>
            `;
            document.getElementById('htmlCode').textContent = '<i class="fas fa-home"></i>';
            modalOverlay.style.display = 'flex';
        }

        function closeModal() {
            modalOverlay.style.display = 'none';
        }

        // Event listeners
        function setupEventListeners() {
            // Search with debounce
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    searchQuery = e.target.value.toLowerCase();
                    resetDisplay();
                }, 300);
            });

            // Filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.filter;
                    resetDisplay();
                });
            });

            // Load more
            loadMoreBtn.addEventListener('click', () => renderIcons(true));

            // Learn more button
            learnMoreBtn.addEventListener('click', openLearnMoreModal);

            // Modal events
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });
            
            document.getElementById('closeModal').addEventListener('click', closeModal);

            // Copy buttons
            document.querySelectorAll('.copy-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const type = this.dataset.copy;
                    const code = type === 'cdn' ? 
                        document.getElementById('cdnCode').textContent :
                        document.getElementById('htmlCode').textContent;
                    
                    navigator.clipboard.writeText(code).then(() => {
                        this.textContent = 'Copied!';
                        this.classList.add('copied');
                        setTimeout(() => {
                            this.textContent = 'Copy';
                            this.classList.remove('copied');
                        }, 2000);
                    });
                });
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
                    closeModal();
                }
            });
        }

        const cursor = document.querySelector('.custom-cursor');
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches('button, .icon-card, a, input')) {
                cursor.classList.add('hover');
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches('button, .icon-card, a, input')) {
                cursor.classList.remove('hover');
            }
        }, true);

        // Authentication system with localStorage
        class AuthSystem {
            constructor() {
                this.currentUser = null;
                this.users = JSON.parse(localStorage.getItem('users')) || [];
                this.blogData = JSON.parse(localStorage.getItem('blogData')) || [];
                this.init();
            }

            init() {
                // Check if user is logged in on page load
                this.checkAuthStatus();
                this.setupEventListeners();
            }

            checkAuthStatus() {
                const savedUser = localStorage.getItem('currentUser');
                if (savedUser) {
                    this.currentUser = JSON.parse(savedUser);
                    this.showUserInfo();
                    this.showMainContent();
                } else {
                    this.showAuthButtons();
                    this.showMainContent(); // Show content regardless of auth status
                }
            }

            setupEventListeners() {
                document.getElementById('loginBtn').addEventListener('click', () => this.openAuthModal('login'));
                document.getElementById('signupBtn').addEventListener('click', () => this.openAuthModal('signup'));
                document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
                document.getElementById('closeAuthModal').addEventListener('click', () => this.closeAuthModal());
                document.getElementById('authSwitchBtn').addEventListener('click', () => this.switchAuthMode());
                document.getElementById('authForm').addEventListener('submit', (e) => this.handleAuth(e));
                
                // Close modal when clicking outside
                document.getElementById('authModalOverlay').addEventListener('click', (e) => {
                    if (e.target === document.getElementById('authModalOverlay')) {
                        this.closeAuthModal();
                    }
                });

                // ESC key to close modal
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.closeAuthModal();
                    }
                });
            }

            openAuthModal(mode) {
                const modal = document.getElementById('authModalOverlay');
                const title = document.getElementById('authModalTitle');
                const submitBtn = document.getElementById('authSubmitBtn');
                const switchText = document.getElementById('authSwitchText');
                const switchBtn = document.getElementById('authSwitchBtn');
                const confirmGroup = document.getElementById('confirmPasswordGroup');
                const nameGroup = document.getElementById('nameGroup');

                if (mode === 'login') {
                    title.textContent = 'Welcome Back!';
                    submitBtn.textContent = 'Login';
                    switchText.textContent = "Don't have an account?";
                    switchBtn.textContent = 'Sign Up';
                    confirmGroup.style.display = 'none';
                    nameGroup.style.display = 'none';
                } else {
                    title.textContent = 'Join Muhammad Owais Icons';
                    submitBtn.textContent = 'Create Account';
                    switchText.textContent = 'Already have an account?';
                    switchBtn.textContent = 'Login';
                    confirmGroup.style.display = 'block';
                    nameGroup.style.display = 'block';
                }

                modal.style.display = 'flex';
                this.currentMode = mode;
                
                // Focus on first input
                setTimeout(() => {
                    document.getElementById('authEmail').focus();
                }, 100);
            }

            closeAuthModal() {
                document.getElementById('authModalOverlay').style.display = 'none';
                document.getElementById('authForm').reset();
            }

            switchAuthMode() {
                const newMode = this.currentMode === 'login' ? 'signup' : 'login';
                this.openAuthModal(newMode);
            }

            handleAuth(e) {
                e.preventDefault();
                const email = document.getElementById('authEmail').value.trim();
                const password = document.getElementById('authPassword').value;
                const confirmPassword = document.getElementById('authConfirmPassword').value;
                const name = document.getElementById('authName').value.trim();

                // Validation
                if (!email || !password) {
                    this.showMessage('Please fill in all required fields.', 'error');
                    return;
                }

                if (this.currentMode === 'signup') {
                    if (password.length < 6) {
                        this.showMessage('Password must be at least 6 characters long.', 'error');
                        return;
                    }

                    if (password !== confirmPassword) {
                        this.showMessage('Passwords do not match!', 'error');
                        return;
                    }

                    if (this.users.find(user => user.email === email)) {
                        this.showMessage('User already exists! Please login instead.', 'error');
                        return;
                    }

                    const newUser = {
                        id: Date.now(),
                        email,
                        password,
                        name: name || email.split('@')[0],
                        createdAt: new Date().toISOString(),
                        favorites: [],
                        blogPosts: []
                    };

                    this.users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(this.users));
                    this.login(newUser);
                    this.showMessage('Account created successfully! Welcome!', 'success');
                } else {
                    const user = this.users.find(u => u.email === email && u.password === password);
                    if (user) {
                        this.login(user);
                        this.showMessage(`Welcome back, ${user.name}!`, 'success');
                    } else {
                        this.showMessage('Invalid email or password!', 'error');
                    }
                }
            }

            login(user) {
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.showUserInfo();
                this.closeAuthModal();
                this.loadUserBlogData();
            }

            logout() {
                if (confirm('Are you sure you want to logout?')) {
                    this.currentUser = null;
                    localStorage.removeItem('currentUser');
                    this.showAuthButtons();
                    this.showMessage('Logged out successfully!', 'success');
                }
            }

            showUserInfo() {
                document.getElementById('authButtons').style.display = 'none';
                document.getElementById('userInfo').style.display = 'flex';
                document.getElementById('userName').textContent = this.currentUser.name;
            }

            showAuthButtons() {
                document.getElementById('authButtons').style.display = 'flex';
                document.getElementById('userInfo').style.display = 'none';
            }

            showMainContent() {
                // Ensure main content is always visible
                const main = document.querySelector('main');
                if (main) {
                    main.style.display = 'block';
                }
            }

            showMessage(message, type = 'info') {
                // Create toast notification
                const toast = document.createElement('div');
                toast.className = `toast toast-${type}`;
                toast.textContent = message;
                toast.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    color: white;
                    font-weight: 600;
                    z-index: 10000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                `;

                document.body.appendChild(toast);

                // Animate in
                setTimeout(() => {
                    toast.style.transform = 'translateX(0)';
                }, 100);

                // Remove after 3 seconds
                setTimeout(() => {
                    toast.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        if (toast.parentNode) {
                            toast.parentNode.removeChild(toast);
                        }
                    }, 300);
                }, 3000);
            }

            // Blog data management methods
            loadUserBlogData() {
                if (this.currentUser) {
                    const userBlogData = this.blogData.filter(post => post.userId === this.currentUser.id);
                    return userBlogData;
                }
                return [];
            }

            saveBlogPost(title, content) {
                if (!this.currentUser) {
                    this.showMessage('Please login to save blog posts.', 'error');
                    return false;
                }

                const blogPost = {
                    id: Date.now(),
                    userId: this.currentUser.id,
                    title,
                    content,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                this.blogData.push(blogPost);
                localStorage.setItem('blogData', JSON.stringify(this.blogData));
                
                // Update user's blog posts array
                this.currentUser.blogPosts.push(blogPost.id);
                this.updateCurrentUser();
                
                return true;
            }

            updateCurrentUser() {
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
                if (userIndex !== -1) {
                    this.users[userIndex] = this.currentUser;
                    localStorage.setItem('users', JSON.stringify(this.users));
                }
            }

            // Utility methods
            isLoggedIn() {
                return this.currentUser !== null;
            }

            getCurrentUser() {
                return this.currentUser;
            }

            getUserBlogPosts() {
                return this.loadUserBlogData();
            }

            // User management methods
            updateUserProfile(updates) {
                if (!this.currentUser) return false;

                Object.assign(this.currentUser, updates);
                this.updateCurrentUser();
                this.showUserInfo(); // Refresh display
                return true;
            }

            addToFavorites(iconName) {
                if (!this.currentUser) {
                    this.showMessage('Please login to save favorites.', 'error');
                    return false;
                }

                if (!this.currentUser.favorites.includes(iconName)) {
                    this.currentUser.favorites.push(iconName);
                    this.updateCurrentUser();
                    this.showMessage('Added to favorites!', 'success');
                    return true;
                }
                return false;
            }

            removeFromFavorites(iconName) {
                if (!this.currentUser) return false;

                const index = this.currentUser.favorites.indexOf(iconName);
                if (index > -1) {
                    this.currentUser.favorites.splice(index, 1);
                    this.updateCurrentUser();
                    this.showMessage('Removed from favorites!', 'success');
                    return true;
                }
                return false;
            }
        }

        // Initialize authentication system
        const authSystem = new AuthSystem();

        // Make authSystem globally available for other functions
        window.authSystem = authSystem;

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            setupEventListeners();
            
            // Hide loading screen after 5 seconds
            setTimeout(() => {
                document.querySelector('.loading-screen').style.display = 'none';
                document.body.style.cursor = 'none'; // Enable custom cursor
                
                // Start main app
                setTimeout(() => {
                    document.querySelector('.loading').style.display = 'none';
                    resetDisplay();
                }, 500);
            }, 5000);
        });