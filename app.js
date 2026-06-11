// HostelVerse — Main Application Logic

(function () {
    'use strict';

    // DOM helpers
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // Splash screen → reveal app
    setTimeout(() => {
        $('#splash-screen').classList.add('hidden');
        $('#app').classList.remove('hidden');
        initApp();
    }, 2200);

    // Boot all modules
    function initApp() {
        setupNavigation();
        setupSidebar();
        setupDate();
        setupNotifications();
        renderDashboard();
        renderComplaints();
        renderMessMenu();
        renderMaintenance();
        renderAnnouncements();
        renderAnalytics();
        setupChatbot();
        setupModals();
        setupQuickActions();
        setupSearch();
    }

    // --- Navigation ---

    function setupNavigation() {
        $$('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(item.dataset.page);
            });
        });

        // Card "View All" links
        $$('[data-navigate]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(link.dataset.navigate);
            });
        });
    }

    function navigateTo(page) {
        $$('.nav-item').forEach(n => n.classList.remove('active'));
        $(`[data-page="${page}"]`).classList.add('active');

        $$('.page').forEach(p => p.classList.remove('active'));
        $(`#page-${page}`).classList.add('active');

        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            $('#sidebar').classList.remove('open');
        }

        // Lazy-render charts
        if (page === 'analytics') {
            setTimeout(() => renderCharts(), 100);
        }
    }

    // --- Sidebar (mobile toggle) ---

    function setupSidebar() {
        $('#sidebar-toggle').addEventListener('click', () => {
            $('#sidebar').classList.toggle('open');
        });

        // Tap outside to close
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const sidebar = $('#sidebar');
                const toggle = $('#sidebar-toggle');
                if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    // --- Date display ---

    function setupDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        $('#current-date').textContent = now.toLocaleDateString('en-IN', options);
    }

    // --- Notifications ---

    function setupNotifications() {
        const btn = $('#notification-btn');
        const dropdown = $('#notification-dropdown');
        const clearBtn = $('#notif-clear-btn');
        const listEl = $('#notif-list');
        const emptyEl = $('#notif-empty');
        const dot = $('#notification-dot');

        const notifications = [
            { type: 'complaint', icon: 'fas fa-exclamation-triangle', text: 'Your complaint "WiFi not working in B-Block" was updated to <strong>In Progress</strong>', time: '5 min ago', unread: true, page: 'complaints' },
            { type: 'maintenance', icon: 'fas fa-wrench', text: 'Maintenance request for <strong>Room B-204</strong> has been assigned to a technician', time: '20 min ago', unread: true, page: 'maintenance' },
            { type: 'mess', icon: 'fas fa-utensils', text: 'Today\'s dinner menu has been updated — <strong>Paneer Butter Masala</strong> added!', time: '1 hour ago', unread: true, page: 'mess' },
            { type: 'announcement', icon: 'fas fa-bullhorn', text: 'New announcement: <strong>Hostel Day celebrations</strong> on June 20th', time: '3 hours ago', unread: false, page: 'announcements' },
            { type: 'system', icon: 'fas fa-check-circle', text: 'Your complaint "Broken corridor light" has been <strong>resolved</strong>', time: '1 day ago', unread: false, page: 'complaints' },
            { type: 'maintenance', icon: 'fas fa-tools', text: 'Scheduled maintenance: <strong>Water supply</strong> interruption tomorrow 6-8 AM', time: '1 day ago', unread: false, page: 'maintenance' }
        ];

        function renderNotifications() {
            if (notifications.length === 0) {
                listEl.style.display = 'none';
                emptyEl.style.display = 'block';
                dot.style.display = 'none';
                return;
            }

            const hasUnread = notifications.some(n => n.unread);
            dot.style.display = hasUnread ? 'block' : 'none';

            listEl.style.display = 'block';
            emptyEl.style.display = 'none';
            listEl.innerHTML = notifications.map((n, i) => `
                <div class="notif-item ${n.unread ? 'unread' : ''}" data-index="${i}" data-page="${n.page}">
                    <div class="notif-icon ${n.type}">
                        <i class="${n.icon}"></i>
                    </div>
                    <div class="notif-content">
                        <div class="notif-text">${n.text}</div>
                        <div class="notif-time">${n.time}</div>
                    </div>
                    ${n.unread ? '<div class="notif-unread-dot"></div>' : ''}
                </div>
            `).join('');

            // Click → mark read + navigate
            listEl.querySelectorAll('.notif-item').forEach(item => {
                item.addEventListener('click', () => {
                    const idx = parseInt(item.dataset.index);
                    notifications[idx].unread = false;
                    dropdown.classList.remove('active');
                    navigateTo(item.dataset.page);
                    renderNotifications();
                });
            });
        }

        renderNotifications();

        // Toggle dropdown
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!$('#notification-wrapper').contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Clear all
        clearBtn.addEventListener('click', () => {
            notifications.length = 0;
            renderNotifications();
            showToast('All notifications cleared', 'info');
        });
    }

    // --- Dashboard ---

    function renderDashboard() {
        renderDashboardComplaints();
        renderDashboardMenu();
        renderSentimentOverview();
        renderDashboardEvents();
    }

    function renderDashboardComplaints() {
        const container = $('#dashboard-complaints');
        const recent = AppData.complaints.filter(c => c.status !== 'resolved').slice(0, 4);

        container.innerHTML = recent.map(c => {
            const iconClass = getCategoryIcon(c.category);
            const bgClass = getPriorityBg(c.priority);
            return `
                <div class="complaint-item">
                    <div class="complaint-icon" style="background: ${bgClass}">
                        <i class="${iconClass}"></i>
                    </div>
                    <div class="complaint-info">
                        <div class="complaint-title">${c.title}</div>
                        <div class="complaint-meta">
                            <span><i class="fas fa-clock"></i> ${c.time}</span>
                            <span class="badge badge-${c.status === 'open' ? 'open' : 'progress'}">${c.status}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderDashboardMenu() {
        const container = $('#dashboard-menu');
        const today = getDayName();
        const menu = AppData.messMenu[today];
        if (!menu) return;

        const meals = ['breakfast', 'lunch', 'snacks', 'dinner'];
        const mealIcons = { breakfast: '🍳', lunch: '🍛', snacks: '🍪', dinner: '🍽️' };

        container.innerHTML = meals.map(meal => `
            <div class="menu-preview-item">
                <span class="menu-time">${mealIcons[meal]} ${meal}</span>
                <span class="menu-items-text">${menu[meal].items.slice(0, 3).join(', ')}...</span>
                <span class="menu-rating"><i class="fas fa-star"></i> ${menu[meal].rating}</span>
            </div>
        `).join('');
    }

    function renderSentimentOverview() {
        const container = $('#sentiment-overview');
        const sentiments = [
            { emoji: '😊', label: 'Positive', pct: 68, cls: 'positive' },
            { emoji: '😐', label: 'Neutral', pct: 20, cls: 'neutral' },
            { emoji: '😟', label: 'Negative', pct: 12, cls: 'negative' }
        ];

        container.innerHTML = sentiments.map(s => `
            <div class="sentiment-item">
                <div class="sentiment-emoji">${s.emoji}</div>
                <div class="sentiment-percentage">${s.pct}%</div>
                <div class="sentiment-label">${s.label}</div>
                <div class="sentiment-bar">
                    <div class="sentiment-bar-fill ${s.cls}" style="width: ${s.pct}%"></div>
                </div>
            </div>
        `).join('');
    }

    function renderDashboardEvents() {
        const container = $('#dashboard-events');
        const upcoming = AppData.events.slice(0, 3);

        container.innerHTML = upcoming.map(e => {
            const date = new Date(e.date);
            return `
                <div class="event-item">
                    <div class="event-date-box">
                        <span class="day">${date.getDate()}</span>
                        <span class="month">${date.toLocaleString('en', { month: 'short' })}</span>
                    </div>
                    <div class="event-info">
                        <h4>${e.title}</h4>
                        <p>${e.description}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- Complaints page ---

    function renderComplaints(filter = 'all') {
        const container = $('#complaints-list');
        let filtered = AppData.complaints;

        if (filter !== 'all') {
            if (filter === 'critical') {
                filtered = filtered.filter(c => c.priority === 'critical');
            } else {
                filtered = filtered.filter(c => c.status === filter);
            }
        }

        container.innerHTML = filtered.map(c => `
            <div class="complaint-card" data-id="${c.id}">
                <div class="complaint-card-header">
                    <div class="complaint-card-title">${c.title}</div>
                    <span class="badge badge-${getStatusBadge(c.status)}">${c.status.replace('-', ' ')}</span>
                </div>
                <div class="complaint-card-body">${c.description}</div>
                <div class="complaint-card-footer">
                    <span class="complaint-tag"><i class="fas fa-tag"></i> ${c.category}</span>
                    <span class="complaint-tag"><i class="fas fa-map-marker-alt"></i> ${c.room}</span>
                    <span class="complaint-tag"><i class="fas fa-clock"></i> ${c.date}</span>
                    <span class="complaint-tag"><i class="fas fa-arrow-up"></i> ${c.upvotes} upvotes</span>
                    <span class="badge badge-${c.priority === 'critical' ? 'critical' : c.priority === 'high' ? 'critical' : 'progress'}">
                        ${c.priority} priority
                    </span>
                </div>
                ${c.aiAnalysis ? `
                    <div class="ai-priority-box" style="margin-top: 12px;">
                        <div class="ai-badge"><i class="fas fa-robot"></i> AI Analysis</div>
                        <p>${c.aiAnalysis}</p>
                    </div>
                ` : ''}
            </div>
        `).join('');

        // Filter chip clicks
        $$('#complaint-filters .filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                $$('#complaint-filters .filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                renderComplaints(chip.dataset.filter);
            });
        });
    }

    // --- Mess menu page ---

    function renderMessMenu() {
        renderDaySelector();
        renderMeals(getDayName());
    }

    function renderDaySelector() {
        const container = $('#day-selector');
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const today = getDayName();

        container.innerHTML = days.map(day => `
            <button class="day-chip ${day === today ? 'active today' : ''}" data-day="${day}">
                ${day.slice(0, 3)}
            </button>
        `).join('');

        $$('.day-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                $$('.day-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                renderMeals(chip.dataset.day);
            });
        });
    }

    function renderMeals(day) {
        const container = $('#mess-grid');
        const menu = AppData.messMenu[day];
        if (!menu) return;

        const mealTypes = [
            { key: 'breakfast', icon: 'fas fa-sun', label: 'Breakfast' },
            { key: 'lunch', icon: 'fas fa-cloud-sun', label: 'Lunch' },
            { key: 'snacks', icon: 'fas fa-cookie-bite', label: 'Snacks' },
            { key: 'dinner', icon: 'fas fa-moon', label: 'Dinner' }
        ];

        container.innerHTML = mealTypes.map(mt => {
            const meal = menu[mt.key];
            const stars = renderStars(meal.rating);

            return `
                <div class="meal-card" data-meal="${mt.key}" data-day="${day}">
                    <div class="meal-card-header">
                        <div class="meal-type"><i class="${mt.icon}"></i> ${mt.label}</div>
                        <span class="meal-time">${meal.time}</span>
                    </div>
                    <div class="meal-card-body">
                        <ul class="meal-items">
                            ${meal.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <div class="meal-card-footer">
                            <div class="meal-avg-rating">
                                <span class="stars">${stars}</span>
                                <span class="rating-text">${meal.rating} (${meal.totalRatings})</span>
                            </div>
                            <button class="rate-btn" data-meal="${mt.key}" data-day="${day}">
                                <i class="fas fa-star"></i> Rate
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Rate buttons
        $$('.rate-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                openRateModal(btn.dataset.meal, btn.dataset.day);
            });
        });
    }

    function openRateModal(meal, day) {
        const menu = AppData.messMenu[day][meal];
        const mealLabels = { breakfast: 'Breakfast', lunch: 'Lunch', snacks: 'Snacks', dinner: 'Dinner' };

        $('#meal-being-rated').innerHTML = `
            <h4>${mealLabels[meal]} — ${day}</h4>
            <p>${menu.items.join(', ')}</p>
        `;

        // Reset UI
        $$('#star-rating i').forEach(s => s.classList.remove('active'));
        $('#meal-feedback').value = '';
        $('#ai-sentiment-text').textContent = 'Type your feedback for AI analysis...';

        openModal('rate-modal');

        // Star interaction
        let selectedRating = 0;
        $$('#star-rating i').forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.dataset.rating);
                $$('#star-rating i').forEach((s, i) => {
                    s.classList.toggle('active', i < selectedRating);
                });
            });

            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                $$('#star-rating i').forEach((s, i) => {
                    s.classList.toggle('active', i < rating);
                });
            });

            star.addEventListener('mouseleave', () => {
                $$('#star-rating i').forEach((s, i) => {
                    s.classList.toggle('active', i < selectedRating);
                });
            });
        });

        // Live AI sentiment on feedback typing
        $('#meal-feedback').addEventListener('input', debounce((e) => {
            const text = e.target.value;
            if (text.length > 5) {
                const sentiment = analyzeSentiment(text);
                $('#ai-sentiment-text').innerHTML = `Detected sentiment: <strong>${sentiment.label}</strong> (${sentiment.confidence}% confidence) ${sentiment.emoji}`;
            }
        }, 400));

        // Submit rating
        const form = $('#rate-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            if (selectedRating === 0) {
                showToast('Please select a rating', 'warning');
                return;
            }
            closeModal('rate-modal');
            showToast(`Rated ${mealLabels[meal]} ${selectedRating}/5 ⭐. Thank you!`, 'success');
        };
    }

    // --- Maintenance page ---

    function renderMaintenance() {
        const statuses = {
            pending: 'pending-items',
            assigned: 'assigned-items',
            'in-progress': 'inprogress-items',
            completed: 'completed-items'
        };

        const counts = { pending: 0, assigned: 0, 'in-progress': 0, completed: 0 };

        // Clear columns
        Object.values(statuses).forEach(id => {
            $(`#${id}`).innerHTML = '';
        });

        AppData.maintenance.forEach(m => {
            const containerId = statuses[m.status];
            if (!containerId) return;
            counts[m.status]++;

            $(`#${containerId}`).innerHTML += `
                <div class="pipeline-card" data-id="${m.id}">
                    <div class="pipeline-card-title">${m.title}</div>
                    <div class="pipeline-card-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${m.location}</span>
                    </div>
                    <div class="pipeline-card-meta" style="margin-top: 4px;">
                        <span class="pipeline-card-urgency ${m.urgency}">${m.urgency}</span>
                        <span>${m.type}</span>
                    </div>
                    ${m.assignee ? `<div class="pipeline-card-meta" style="margin-top: 6px;"><i class="fas fa-user"></i> ${m.assignee}</div>` : ''}
                </div>
            `;
        });

        // Update column counts
        $('#pending-count').textContent = counts.pending;
        $('#assigned-count').textContent = counts.assigned;
        $('#inprogress-count').textContent = counts['in-progress'];
        $('#completed-count').textContent = counts.completed;
    }

    // --- Announcements page ---

    function renderAnnouncements() {
        const container = $('#announcements-list');

        container.innerHTML = AppData.announcements.map(a => `
            <div class="announcement-card ${a.type}">
                <div class="announcement-header">
                    <div class="announcement-title">${a.title}</div>
                    <span class="announcement-type ${a.type}">${a.type}</span>
                </div>
                <div class="announcement-body">${a.body}</div>
                <div class="announcement-footer">
                    <span><i class="fas fa-user"></i> ${a.author}</span>
                    <span><i class="fas fa-calendar"></i> ${a.date}</span>
                </div>
            </div>
        `).join('');
    }

    // --- Analytics page ---

    let chartsRendered = false;
    let chartInstances = {};

    function renderAnalytics() {
        renderInsights();
    }

    function renderInsights() {
        const container = $('#ai-insights');
        container.innerHTML = AppData.insights.map(i => `
            <div class="insight-item">
                <div class="insight-icon ${i.type}">
                    <i class="${i.icon}"></i>
                </div>
                <div class="insight-content">
                    <h4>${i.title}</h4>
                    <p>${i.text}</p>
                </div>
            </div>
        `).join('');
    }

    function renderCharts() {
        if (chartsRendered) return;
        chartsRendered = true;

        const chartColors = {
            primary: '#6366f1',
            primaryLight: 'rgba(99, 102, 241, 0.2)',
            accent: '#06b6d4',
            accentLight: 'rgba(6, 182, 212, 0.2)',
            danger: '#f43f5e',
            dangerLight: 'rgba(244, 63, 94, 0.2)',
            warning: '#f59e0b',
            warningLight: 'rgba(245, 158, 11, 0.2)',
            success: '#10b981',
            info: '#3b82f6',
            text: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#94a3b8',
            grid: getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || 'rgba(99, 102, 241, 0.12)'
        };

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: chartColors.text,
                        font: { family: 'Inter', size: 11 }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: chartColors.text, font: { family: 'Inter', size: 11 } },
                    grid: { color: chartColors.grid + '40' }
                },
                y: {
                    ticks: { color: chartColors.text, font: { family: 'Inter', size: 11 } },
                    grid: { color: chartColors.grid + '40' }
                }
            }
        };

        // Doughnut — complaint categories
        const ctxCategory = $('#category-chart').getContext('2d');
        chartInstances.category = new Chart(ctxCategory, {
            type: 'doughnut',
            data: {
                labels: AppData.analytics.categories.labels,
                datasets: [{
                    data: AppData.analytics.categories.data,
                    backgroundColor: [
                        '#3b82f6', '#6366f1', '#f43f5e', '#06b6d4',
                        '#f59e0b', '#fb7185', '#10b981', '#818cf8'
                    ],
                    borderWidth: 0,
                    spacing: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: chartColors.text,
                            font: { family: 'Inter', size: 11 },
                            padding: 12,
                            usePointStyle: true
                        }
                    }
                }
            }
        });

        // Bar — mess ratings by day
        const ctxMess = $('#mess-chart').getContext('2d');
        chartInstances.mess = new Chart(ctxMess, {
            type: 'bar',
            data: {
                labels: AppData.analytics.messRatings.labels,
                datasets: [
                    {
                        label: 'Breakfast',
                        data: AppData.analytics.messRatings.breakfast,
                        backgroundColor: chartColors.warning + 'CC',
                        borderRadius: 4
                    },
                    {
                        label: 'Lunch',
                        data: AppData.analytics.messRatings.lunch,
                        backgroundColor: chartColors.accent + 'CC',
                        borderRadius: 4
                    },
                    {
                        label: 'Dinner',
                        data: AppData.analytics.messRatings.dinner,
                        backgroundColor: chartColors.primary + 'CC',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    x: {
                        ...commonOptions.scales.x,
                        grid: { display: false }
                    },
                    y: {
                        ...commonOptions.scales.y,
                        beginAtZero: true,
                        max: 5,
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // --- Chatbot panel ---

    function setupChatbot() {
        const fab = $('#chat-fab');
        const panel = $('#chat-panel');
        const closeBtn = $('#chat-close');
        const input = $('#chat-input');
        const sendBtn = $('#chat-send');

        fab.addEventListener('click', () => {
            panel.classList.toggle('active');
            if (panel.classList.contains('active')) input.focus();
        });

        closeBtn.addEventListener('click', () => {
            panel.classList.remove('active');
        });

        function sendMessage() {
            const text = input.value.trim();
            if (!text) return;

            appendMessage(text, 'user');
            input.value = '';
            showTypingIndicator();

            // Simulate AI delay
            setTimeout(() => {
                removeTypingIndicator();
                const response = HostelBot.getResponse(text);
                appendMessage(response, 'bot');
            }, 800 + Math.random() * 700);
        }

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        // Suggestion chips
        $$('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                input.value = chip.dataset.query;
                sendMessage();
            });
        });
    }

    function appendMessage(content, type) {
        const container = $('#chat-messages');
        const icon = type === 'bot' ? 'fas fa-robot' : 'fas fa-user';

        const msg = document.createElement('div');
        msg.className = `chat-message ${type}`;
        msg.innerHTML = `
            <div class="message-avatar"><i class="${icon}"></i></div>
            <div class="message-content"><p>${content}</p></div>
        `;

        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    }

    function showTypingIndicator() {
        const container = $('#chat-messages');
        const typing = document.createElement('div');
        typing.className = 'chat-message bot';
        typing.id = 'typing-indicator';
        typing.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = $('#typing-indicator');
        if (indicator) indicator.remove();
    }

    // --- Modals ---

    function setupModals() {
        // Open/close bindings
        $('#new-complaint-btn').addEventListener('click', () => openModal('complaint-modal'));
        $('#close-complaint-modal').addEventListener('click', () => closeModal('complaint-modal'));
        $('#new-maintenance-btn').addEventListener('click', () => openModal('maintenance-modal'));
        $('#close-maintenance-modal').addEventListener('click', () => closeModal('maintenance-modal'));
        $('#close-rate-modal').addEventListener('click', () => closeModal('rate-modal'));

        // Click overlay to dismiss
        $$('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.classList.remove('active');
            });
        });

        // Complaint form
        $('#complaint-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = $('#complaint-title').value;
            const category = $('#complaint-category').value;
            const description = $('#complaint-description').value;
            const room = $('#complaint-room').value;

            if (!title || !category || !description) {
                showToast('Please fill all required fields', 'warning');
                return;
            }

            const newComplaint = {
                id: 'C' + (AppData.complaints.length + 1).toString().padStart(3, '0'),
                title,
                category,
                description,
                room: room || 'Not specified',
                status: 'open',
                priority: detectPriority(title + ' ' + description),
                author: 'Shubham',
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                upvotes: 0,
                aiAnalysis: generateAIAnalysis(title, category)
            };

            AppData.complaints.unshift(newComplaint);
            renderComplaints();
            renderDashboardComplaints();
            closeModal('complaint-modal');
            $('#complaint-form').reset();
            showToast('Complaint submitted successfully! AI has classified it as ' + newComplaint.priority + ' priority.', 'success');
        });

        // Live AI priority detection while typing
        const descInput = $('#complaint-description');
        const titleInput = $('#complaint-title');

        [descInput, titleInput].forEach(input => {
            input.addEventListener('input', debounce(() => {
                const text = (titleInput.value + ' ' + descInput.value).trim();
                if (text.length > 10) {
                    const priority = detectPriority(text);
                    const priorityColors = {
                        critical: '🔴 CRITICAL',
                        high: '🟠 HIGH',
                        medium: '🟡 MEDIUM',
                        low: '🟢 LOW'
                    };
                    $('#ai-priority-text').innerHTML = `Detected priority: <strong>${priorityColors[priority]}</strong> — AI confidence: ${75 + Math.floor(Math.random() * 20)}%`;
                }
            }, 500));
        });

        // Maintenance form
        $('#maintenance-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = $('#maintenance-title').value;
            const type = $('#maintenance-type').value;
            const location = $('#maintenance-location').value;
            const urgency = document.querySelector('input[name="urgency"]:checked')?.value || 'medium';

            if (!title || !type) {
                showToast('Please fill all required fields', 'warning');
                return;
            }

            const newRequest = {
                id: 'M' + (AppData.maintenance.length + 1).toString().padStart(3, '0'),
                title,
                type,
                location: location || 'Not specified',
                urgency,
                status: 'pending',
                date: new Date().toISOString().split('T')[0],
                assignee: null
            };

            AppData.maintenance.unshift(newRequest);
            renderMaintenance();
            closeModal('maintenance-modal');
            $('#maintenance-form').reset();
            showToast('Maintenance request submitted! Tracking ID: ' + newRequest.id, 'success');
        });
    }

    function openModal(id) {
        $(`#${id}`).classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(id) {
        $(`#${id}`).classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- Quick actions ---

    function setupQuickActions() {
        $$('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                switch (action) {
                    case 'new-complaint':
                        navigateTo('complaints');
                        setTimeout(() => openModal('complaint-modal'), 300);
                        break;
                    case 'rate-mess':
                        navigateTo('mess');
                        break;
                    case 'maintenance-request':
                        navigateTo('maintenance');
                        setTimeout(() => openModal('maintenance-modal'), 300);
                        break;
                    case 'open-chat':
                        $('#chat-panel').classList.add('active');
                        $('#chat-input').focus();
                        break;
                }
            });
        });
    }

    // --- Global search ---

    function setupSearch() {
        $('#global-search').addEventListener('input', debounce((e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) return;

            // Simple keyword-based page redirect
            if (query.includes('complaint') || query.includes('issue')) {
                navigateTo('complaints');
            } else if (query.includes('mess') || query.includes('food') || query.includes('menu')) {
                navigateTo('mess');
            } else if (query.includes('repair') || query.includes('maintenance') || query.includes('fix')) {
                navigateTo('maintenance');
            } else if (query.includes('event') || query.includes('announce') || query.includes('notice')) {
                navigateTo('announcements');
            } else if (query.includes('analytics') || query.includes('chart') || query.includes('insight')) {
                navigateTo('analytics');
            }
        }, 600));
    }

    // --- Utility functions ---

    function getDayName() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    }

    function getCategoryIcon(cat) {
        const icons = {
            water: 'fas fa-tint',
            electricity: 'fas fa-bolt',
            wifi: 'fas fa-wifi',
            cleanliness: 'fas fa-broom',
            noise: 'fas fa-volume-up',
            security: 'fas fa-shield-alt',
            mess: 'fas fa-utensils',
            other: 'fas fa-question-circle'
        };
        return icons[cat] || icons.other;
    }

    function getPriorityBg(priority) {
        const colors = {
            critical: 'rgba(255, 71, 87, 0.12)',
            high: 'rgba(255, 165, 2, 0.12)',
            medium: 'rgba(30, 144, 255, 0.12)',
            low: 'rgba(46, 213, 115, 0.12)'
        };
        return colors[priority] || colors.medium;
    }

    function getStatusBadge(status) {
        const map = {
            open: 'open',
            'in-progress': 'progress',
            resolved: 'resolved'
        };
        return map[status] || 'open';
    }

    function renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5 ? 1 : 0;
        const empty = 5 - full - half;
        return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
    }

    // Keyword-based priority classifier
    function detectPriority(text) {
        text = text.toLowerCase();
        const critical = ['fire', 'flood', 'spark', 'electric shock', 'emergency', 'danger', 'hazard', 'broken glass', 'gas leak', 'short circuit'];
        const high = ['security', 'not working', 'broken', 'unsafe', 'dark', 'no water', 'no electricity', 'leak', 'clogged', 'overflow'];
        const medium = ['slow', 'noise', 'quality', 'dirty', 'smell', 'hot', 'cold', 'uncomfortable'];

        if (critical.some(kw => text.includes(kw))) return 'critical';
        if (high.some(kw => text.includes(kw))) return 'high';
        if (medium.some(kw => text.includes(kw))) return 'medium';
        return 'low';
    }

    // Category-based AI analysis generator
    function generateAIAnalysis(title, category) {
        const analyses = {
            water: 'Water supply issue detected. Cross-referencing with recent maintenance schedule and pump status.',
            electricity: 'Electrical issue flagged. Safety check recommended. Nearest electrician notified.',
            wifi: 'Network issue identified. Checking router status and bandwidth allocation for the area.',
            cleanliness: 'Hygiene concern noted. Housekeeping team will be alerted for priority cleaning.',
            noise: 'Noise complaint logged. Pattern analysis shows recurring issues in this time slot.',
            security: 'Security concern flagged. Alert sent to security supervisor for immediate attention.',
            mess: 'Food quality complaint recorded. Added to weekly mess committee review agenda.',
            other: 'Issue logged and categorized. Will be reviewed by the hostel admin team.'
        };
        return analyses[category] || analyses.other;
    }

    // Simple keyword-based sentiment analyser
    function analyzeSentiment(text) {
        text = text.toLowerCase();
        const positive = ['good', 'great', 'excellent', 'amazing', 'tasty', 'delicious', 'love', 'best', 'perfect', 'wonderful', 'awesome', 'fresh', 'nice'];
        const negative = ['bad', 'terrible', 'awful', 'disgusting', 'worst', 'horrible', 'tasteless', 'cold', 'stale', 'undercooked', 'overcooked', 'bland', 'hate', 'poor'];

        let posScore = positive.filter(w => text.includes(w)).length;
        let negScore = negative.filter(w => text.includes(w)).length;

        if (posScore > negScore) return { label: 'Positive', confidence: 70 + posScore * 8, emoji: '😊' };
        if (negScore > posScore) return { label: 'Negative', confidence: 70 + negScore * 8, emoji: '😟' };
        return { label: 'Neutral', confidence: 65, emoji: '😐' };
    }

    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // --- Toast notifications (global) ---

    window.showToast = function (message, type = 'info') {
        const container = $('#toast-container');
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="toast-icon ${icons[type]}"></i>
            <span class="toast-text">${message}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;

        container.appendChild(toast);

        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        });

        // Auto-dismiss after 4s
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.add('removing');
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);
    };
})();
