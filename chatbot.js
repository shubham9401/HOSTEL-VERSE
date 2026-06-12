// HostelVerse — AI Chatbot Engine

const HostelBot = {
    // Knowledge base (topic → formatted answer)
    knowledge: {
        // Timings
        'hostel timings': 'The hostel operates on the following schedule:\n\n🏠 **In-time:** 10:00 PM (weekdays), 11:00 PM (weekends)\n🔓 **Gate opens:** 5:30 AM\n📚 **Study hours:** 9:00 PM - 11:00 PM\n🔇 **Silence hours:** 11:00 PM - 6:00 AM\n\nLate entry requires prior permission from the warden.',
        'timings': 'The hostel operates on the following schedule:\n\n🏠 **In-time:** 10:00 PM (weekdays), 11:00 PM (weekends)\n🔓 **Gate opens:** 5:30 AM\n📚 **Study hours:** 9:00 PM - 11:00 PM\n🔇 **Silence hours:** 11:00 PM - 6:00 AM',
        'gate timing': 'The main gate timings are:\n🔓 Opens: 5:30 AM\n🔒 Closes: 10:00 PM (weekdays) / 11:00 PM (weekends)\n\nFor late entry, contact the security guard and fill the late entry register.',

        // Complaints
        'file a complaint': 'To file a complaint, follow these steps:\n\n1️⃣ Go to the **Complaints** section from the sidebar\n2️⃣ Click **"New Complaint"**\n3️⃣ Fill in the details — our AI will auto-detect priority\n4️⃣ Submit and track the status in real-time\n\nAlternatively, you can use the **Quick Actions** on the dashboard!',
        'complaint': 'You can file complaints through the **Complaints** section. Our AI automatically classifies the priority based on the issue type and description. You\'ll get real-time status updates.',
        'complaint status': 'To check your complaint status:\n\n1️⃣ Go to **Complaints** page\n2️⃣ Use the filter tabs (Open, In Progress, Resolved)\n3️⃣ Click on any complaint to see full details\n\nYou\'ll also receive notifications when status changes.',

        // Mess
        'mess menu': 'You can view the full weekly mess menu in the **Mess Menu** section. Today\'s highlights are shown on the Dashboard. You can also rate each meal and provide feedback!',
        'today\'s menu': 'Check the **Dashboard** for today\'s menu overview, or visit the **Mess Menu** section for the complete daily breakdown with ratings.',
        'mess timing': 'Mess timings are:\n\n🍳 **Breakfast:** 7:30 - 9:00 AM\n🍛 **Lunch:** 12:30 - 2:00 PM\n🍪 **Snacks:** 5:00 - 6:00 PM\n🍽️ **Dinner:** 7:30 - 9:30 PM\n\nTimings are slightly extended on weekends.',
        'mess committee': 'The Mess Committee meets monthly to discuss food quality and menu changes. Next meeting: June 13th at 7 PM in the Mess Hall. All residents are welcome!',

        // Warden
        'warden': 'Warden Contact Information:\n\n👤 **Chief Warden:** Dr. R.K. Verma\n📞 Phone: +91-9876543210\n📧 Email: warden@hostel.edu\n🏢 Office: Admin Block, Room 101\n⏰ Office Hours: 10 AM - 5 PM (Mon-Sat)\n\nFor emergencies, call the emergency helpline: 📞 112',
        'warden contact': 'You can reach the warden:\n📞 Phone: +91-9876543210\n📧 Email: warden@hostel.edu\n🏢 Office: Admin Block, Room 101',

        // Rules
        'hostel rules': 'Key Hostel Rules:\n\n📋 **General:**\n• Maintain silence during study & sleeping hours\n• No unauthorized guests overnight\n• Keep rooms & common areas clean\n• No cooking appliances in rooms\n\n🚫 **Prohibited:**\n• Smoking & alcohol on campus\n• Damage to hostel property\n• Playing loud music after 10 PM\n• Ragging in any form\n\nViolations may result in fines or disciplinary action.',
        'rules': 'Key rules include: Maintain silence hours (11 PM - 6 AM), no unauthorized overnight guests, no cooking appliances, and no smoking/alcohol. Visit the notice board or contact the warden for the complete rulebook.',

        // Guest entry
        'guest entry': 'Guest Entry Process:\n\n1️⃣ Fill the **Guest Entry Form** at the security desk\n2️⃣ Provide guest\'s **valid ID proof**\n3️⃣ Guest must leave by **8:00 PM** (regular days)\n4️⃣ For overnight stays, get **written permission** from the warden 24 hours in advance\n\n📝 Maximum 2 guests per resident at a time.',
        'guest': 'Guests are allowed from 9 AM to 8 PM. Fill the entry form at the security desk with valid ID. Overnight stays need warden\'s prior approval (24 hrs in advance).',

        // Maintenance
        'maintenance': 'For maintenance issues:\n\n1️⃣ Go to the **Maintenance** section\n2️⃣ Click **"New Request"**\n3️⃣ Select type, location, and urgency\n4️⃣ Track progress through the pipeline view\n\nCritical issues (electrical sparking, water flooding) are prioritized and addressed within 2 hours.',
        'repair': 'Submit repair requests through the **Maintenance** section. Choose urgency level and we\'ll dispatch the right team. Critical repairs are handled within 2 hours.',

        // WiFi
        'wifi': 'WiFi Information:\n\n📶 **Network:** HostelNet_5G / HostelNet_2.4G\n🔑 **Password:** Available at reception\n📊 **Speed:** 100 Mbps shared\n⏰ **Peak hours:** 8 PM - 12 AM (expect slower speeds)\n\n💡 **Tip:** Use the 5GHz network for better speeds if your device supports it.\n\nFor WiFi issues, file a complaint under the "WiFi/Internet" category.',
        'internet': 'WiFi networks: HostelNet_5G and HostelNet_2.4G. Password available at reception. For connectivity issues, file a complaint in the WiFi category.',
        'wifi password': 'The WiFi password is available at the hostel reception desk. Please carry your hostel ID card. Networks: HostelNet_5G (faster) and HostelNet_2.4G (wider range).',

        // Laundry
        'laundry': 'Laundry Service:\n\n🧺 **Collection:** Monday & Thursday (7-9 AM)\n👕 **Delivery:** Wednesday & Saturday (5-7 PM)\n💰 **Cost:** ₹200/month (unlimited basic wash)\n📍 **Drop-off:** Laundry room, Ground Floor\n\nDry cleaning available at extra cost. Mark your clothes with room number!',

        // Medical
        'medical': 'Medical Facilities:\n\n🏥 **Hostel Dispensary:** Ground Floor, Block A\n⏰ **Timing:** 9 AM - 9 PM\n👨‍⚕️ **Doctor visit:** Daily 5-7 PM\n🚑 **Emergency:** Call 108 or Campus Security\n\n📋 Basic medicines are available free of cost. Keep your health card updated.',
        'doctor': 'The hostel doctor visits daily from 5-7 PM at the dispensary (Ground Floor, Block A). For emergencies, call 108 or the campus security at the main gate.',
        'sick': 'If you\'re feeling unwell:\n1️⃣ Visit the dispensary (Ground Floor, Block A)\n2️⃣ Doctor available: 5-7 PM daily\n3️⃣ For emergencies: Call 108\n4️⃣ Inform your floor representative',

        // Leave
        'leave': 'Leave Application Process:\n\n1️⃣ Fill the **Leave Application Form** (available at warden office)\n2️⃣ Get it signed by your **parent/guardian** (for minors)\n3️⃣ Submit to the **Warden Office** at least 24 hours in advance\n4️⃣ Collect the **Gate Pass** before leaving\n\n📱 For emergency leave, contact the warden directly.',
        'outing': 'Day outings don\'t require formal leave. Just sign the **Outing Register** at the gate. Return before in-time (10 PM weekdays, 11 PM weekends).',

        // Parking
        'parking': 'Parking Information:\n\n🚲 **Cycles:** Free parking in cycle stand\n🛵 **Two-wheelers:** ₹100/month, designated parking area\n🚗 **Four-wheelers:** Not allowed for students\n\n🔒 Use your own lock. The hostel is not responsible for theft. CCTV surveillance is available.',

        // Emergency
        'emergency': '🚨 Emergency Contacts:\n\n📞 **Campus Security:** 1800-XXX-XXXX\n🚑 **Ambulance:** 108\n🚒 **Fire:** 101\n👮 **Police:** 100\n👨‍⚕️ **Hostel Doctor:** +91-9876543211\n👤 **Warden:** +91-9876543210\n\nFire extinguishers are located at every floor corridor. Assembly point: Main ground.',
    },

    // Fuzzy-match a query to the best knowledge entry
    findBestMatch(query) {
        query = query.toLowerCase().trim();

        // Exact match
        if (this.knowledge[query]) return this.knowledge[query];

        // Scored keyword matching
        let bestMatch = null;
        let bestScore = 0;
        const queryWords = query.split(/\s+/);

        for (const [key, value] of Object.entries(this.knowledge)) {
            const keyWords = key.split(/\s+/);
            let score = 0;

            for (const qWord of queryWords) {
                for (const kWord of keyWords) {
                    if (kWord.includes(qWord) || qWord.includes(kWord)) {
                        score += qWord.length >= 3 ? 2 : 1;
                    }
                }
            }

            // Bonus for substring containment
            if (query.includes(key) || key.includes(query)) score += 5;

            if (score > bestScore) {
                bestScore = score;
                bestMatch = value;
            }
        }

        if (bestScore >= 2) return bestMatch;

        return this.getFallbackResponse(query);
    },

    // Handles greetings, thanks, and unknown queries
    getFallbackResponse(query) {
        const greetings = ['hi', 'hello', 'hey', 'hii', 'helo', 'good morning', 'good evening', 'good afternoon', 'sup', 'yo'];
        const thanks = ['thanks', 'thank you', 'thankyou', 'thx', 'ty'];
        const bye = ['bye', 'goodbye', 'see you', 'good night', 'gn'];

        if (greetings.some(g => query.includes(g))) {
            return '👋 Hello! Welcome to HostelVerse. How can I help you today? You can ask me about hostel timings, mess menu, complaints, maintenance, rules, or anything else!';
        }

        if (thanks.some(t => query.includes(t))) {
            return '😊 You\'re welcome! Feel free to ask if you need anything else. I\'m always here to help!';
        }

        if (bye.some(b => query.includes(b))) {
            return '👋 Goodbye! Have a great day. Remember, I\'m available 24/7 if you need any help!';
        }

        // Suggest available topics
        const suggestions = [
            'hostel timings', 'mess menu', 'file a complaint',
            'warden contact', 'hostel rules', 'WiFi info',
            'maintenance request', 'guest entry process'
        ];

        return `🤔 I'm not sure I understand that completely. Here are some things I can help with:\n\n${suggestions.map(s => `• ${s}`).join('\n')}\n\nTry asking about any of these topics!`;
    },

    // Convert markdown-style bold to HTML
    formatResponse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    },

    // Public API — returns formatted HTML response
    getResponse(query) {
        const raw = this.findBestMatch(query);
        return this.formatResponse(raw);
    }
};
