// Terminal State Management
let commandHistory = [];
let historyIndex = -1;
let currentMode = 'main';
let transactionCounter = 0;
let startTime = Date.now();

// Profile Data as ISO-8583 Fields
const profileData = {
    about: {
        mti: '0100',
        fields: {
            '002': { name: 'Primary Account Number', value: 'MATTHEW-ARKIN-2024' },
            '003': { name: 'Processing Code', value: 'PAYMENT-ENGINEER' },
            '004': { name: 'Years Experience', value: '10+ YEARS' },
            '007': { name: 'Transmission Date/Time', value: new Date().toISOString() },
            '011': { name: 'System Trace', value: Math.random().toString(36).substr(2, 9).toUpperCase() },
            '018': { name: 'Merchant Type', value: 'SOFTWARE ENGINEERING' },
            '032': { name: 'Acquiring Institution', value: 'PAYPAL/BRAINTREE/STRIPE' },
            '037': { name: 'Retrieval Reference', value: 'SEATTLE-WA' },
            '041': { name: 'Terminal ID', value: '<a href="mailto:matt@mattarkin.com" style="color: #00ff00;">matt@mattarkin.com</a>' },
            '042': { name: 'Merchant ID', value: '(305) 450-7451' },
            '043': { name: 'Location', value: 'SEATTLE, WASHINGTON, USA' },
            '048': { name: 'Additional Data', value: 'SR STAFF ENGINEER | PAYMENTS EXPERT' },
            '049': { name: 'Currency Code', value: 'USD | MULTI-CURRENCY' },
            '063': { name: 'Network Data', value: 'VISA|MASTERCARD|AMEX|DISCOVER' }
        }
    },
    experience: {
        mti: '0200',
        fields: {
            '002': { name: 'Account Identifier', value: 'WORK-HISTORY-2016-2024' },
            '003': { name: 'Processing Code', value: '8+ YEARS PAYMENTS ENGINEERING' },
            '011': { name: 'System Trace', value: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase() },
            '012': { name: 'Transaction Time', value: new Date().toLocaleTimeString() },
            '032': { name: '[PAYPAL] Institution ID', value: 'SR. STAFF ENGINEER | FEB 2022 - PRESENT' },
            '032.01': { name: '  └─ Governance', value: 'ENGINEERING STANDARDS & ARCHITECTURE' },
            '032.02': { name: '  └─ Compliance', value: '600+ NETWORK MANDATES ANNUALLY' },
            '032.03': { name: '  └─ Partnerships', value: 'PRODUCT & TECHNICAL TEAMS ALIGNMENT' },
            '032.04': { name: '  └─ Innovation', value: 'AI-POWERED DEVELOPER TOOLING' },
            '032.05': { name: '  └─ Type Safety', value: 'SORBET ADOPTION FOR RUBY MONOLITH' },
            '032.06': { name: '  └─ Mentorship', value: 'TECH LEADS & ENGINEERS ADVISOR' },
            '033': { name: '[STRIPE] Forwarding ID', value: 'TECHNICAL OPERATIONS | AUG 2020 - FEB 2022' },
            '033.01': { name: '  └─ Expertise', value: 'PAYMENTS SME FOR ESCALATIONS' },
            '033.02': { name: '  └─ Performance', value: '30BPS ERROR RATE REDUCTION' },
            '033.03': { name: '  └─ Optimization', value: 'INCREASED APPROVAL RATES' },
            '033.04': { name: '  └─ Automation', value: 'INTERNAL TOOLS & PROCESSES' },
            '035': { name: '[BRAINTREE] Track Data', value: 'SOFTWARE ENGINEER | AUG 2016 - JUL 2020' },
            '035.01': { name: '  └─ Integrations', value: '14+ PAYMENT PROCESSORS' },
            '035.02': { name: '  └─ Expertise', value: 'CARD NETWORK COMPLIANCE' },
            '035.03': { name: '  └─ Scale', value: 'PROCESSING & SETTLEMENT SYSTEMS' },
            '035.04': { name: '  └─ Reliability', value: '99.99% UPTIME ON-CALL' },
            '035.05': { name: '  └─ Development', value: 'CORE APIS & FEATURES' },
            '054': { name: 'Additional Amounts', value: 'BILLIONS IN ANNUAL VOLUME' },
            '120': { name: 'Authorization Response', value: 'APPROVED - EXCEPTIONAL PERFORMANCE' }
        }
    },
    skills: {
        mti: '0400',
        fields: {
            '002': { name: 'Technical Stack', value: 'RUBY|RAILS|SINATRA|PYTHON|GO' },
            '003': { name: 'Processing Capabilities', value: 'ISO8583|EMV|PCI-DSS|3DS' },
            '004': { name: 'Transaction Volume', value: 'BILLIONS PROCESSED ANNUALLY' },
            '011': { name: 'Languages', value: 'RUBY|PYTHON|JAVASCRIPT|SQL|BASH' },
            '024': { name: 'Network Protocols', value: 'REST|GRAPHQL|GRPC|ISO8583' },
            '025': { name: 'Infrastructure', value: 'AWS|DOCKER|K8S|TERRAFORM' },
            '026': { name: 'Compliance Standards', value: 'PCI-DSS|PA-DSS|EMV|3DS2.0' },
            '032': { name: 'Card Networks', value: 'VISA|MASTERCARD|AMEX|DISCOVER|JCB|UNIONPAY' },
            '039': { name: 'Response Codes', value: 'EXPERT IN ALL ISO RESPONSE CODES' },
            '041': { name: 'Security', value: 'TOKENIZATION|ENCRYPTION|HSM' },
            '048': { name: 'Specializations', value: 'ACQUIRING|ISSUING|GATEWAY|PROCESSOR' },
            '055': { name: 'EMV Tags', value: 'FULL EMV CERTIFICATION EXPERIENCE' }
        }
    },
    education: {
        mti: '0800',
        fields: {
            '011': { name: 'Trace Number', value: 'EDU-' + Date.now() },
            '012': { name: 'Institution 1', value: 'CAPITOL TECHNOLOGY UNIVERSITY' },
            '013': { name: 'Degree 1', value: 'M.S. CYBER & INFORMATION SECURITY' },
            '014': { name: 'Period 1', value: '2018 - 2020' },
            '032': { name: 'Institution 2', value: 'STANFORD UNIVERSITY' },
            '033': { name: 'Degree 2', value: 'B.S. SCIENCE, TECHNOLOGY AND SOCIETY' },
            '034': { name: 'Period 2', value: '2012 - 2016' },
            '070': { name: 'Network Management', value: 'CERTIFIED' }
        }
    },
    contact: {
        mti: '0420',
        fields: {
            '002': { name: 'Primary Contact', value: '<a href="mailto:matt@mattarkin.com" style="color: #00ff00;">matt@mattarkin.com</a>' },
            '003': { name: 'Processing Channel', value: 'EMAIL PREFERRED' },
            '032': { name: 'Phone Terminal', value: '(305) 450-7451' },
            '037': { name: 'LinkedIn Node', value: '<a href="https://linkedin.com/in/mattarkin" target="_blank" style="color: #00ff00;">linkedin.com/in/mattarkin</a>' },
            '041': { name: 'Location Terminal', value: 'SEATTLE, WA' },
            '043': { name: 'Time Zone', value: 'PST/PDT (UTC-8/UTC-7)' },
            '063': { name: 'Response Time', value: 'TYPICALLY < 24 HOURS' }
        }
    }
};

// Commands available in the system
const commands = {
    'HELP': showHelp,
    'AUTH': () => processTransaction('about'),
    'ABOUT': () => processTransaction('about'),
    'TXN': () => processTransaction('experience'),
    'EXPERIENCE': () => processTransaction('experience'),
    'WORK': () => processTransaction('experience'),
    'INQUIRY': () => processTransaction('skills'),
    'SKILLS': () => processTransaction('skills'),
    'NETWORK': () => processTransaction('education'),
    'EDUCATION': () => processTransaction('education'),
    'EDU': () => processTransaction('education'),
    'SETTLE': () => processTransaction('contact'),
    'CONTACT': () => processTransaction('contact'),
    'TRACE': showTransactionTrace,
    'STATUS': showSystemStatus,
    'CLEAR': clearTerminal,
    'RESUME': downloadResume,
    'ISO': showISOCommands,
    'PING': pingNetworks,
    'BATCH': showBatchSummary
};

// Initialize terminal
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('boot-sequence').classList.add('hidden');
        document.getElementById('main-terminal').classList.remove('hidden');
        document.getElementById('command-input').focus();
        typeWriterEffect('Type AUTH to begin authorization inquiry...', 50);
        updateCursorPosition();
    }, 3500);

    setupCommandInput();
    setupCommandHints();
    updateClock();
    updateUptime();
    
    // Keep input focused
    document.addEventListener('click', (e) => {
        // Don't focus if clicking on a command hint
        if (!e.target.classList.contains('command-hint')) {
            document.getElementById('command-input').focus();
        }
    });
});

function setupCommandInput() {
    const input = document.getElementById('command-input');
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(input.value);
            commandHistory.push(input.value);
            historyIndex = commandHistory.length;
            input.value = '';
            updateCursorPosition();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
                updateCursorPosition();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
            updateCursorPosition();
        }
    });
    
    input.addEventListener('input', updateCursorPosition);
}

function updateCursorPosition() {
    const input = document.getElementById('command-input');
    const cursor = document.getElementById('cursor');
    const text = input.value;
    
    // Create a temporary span to measure text width
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.font = window.getComputedStyle(input).font;
    span.textContent = text;
    document.body.appendChild(span);
    
    const textWidth = span.offsetWidth;
    document.body.removeChild(span);
    
    // Position cursor after the text
    cursor.style.left = textWidth + 'px';
}

function setupCommandHints() {
    const hints = document.querySelectorAll('.command-hint');
    hints.forEach(hint => {
        // Skip LinkedIn link as it's handled by the anchor tag
        if (hint.classList.contains('linkedin-link')) {
            return;
        }
        
        hint.addEventListener('click', (e) => {
            e.stopPropagation();
            const command = hint.getAttribute('data-command');
            const input = document.getElementById('command-input');
            
            // Show the command being typed
            input.value = command;
            updateCursorPosition();
            
            // Small delay then execute
            setTimeout(() => {
                processCommand(command);
                input.value = '';
                updateCursorPosition();
                input.focus();
            }, 200);
        });
    });
}

function processCommand(cmd) {
    const output = document.getElementById('terminal-output');
    const commandLine = document.createElement('div');
    commandLine.className = 'output-line';
    commandLine.innerHTML = `<span class="prompt">TXN://MAINFRAME/> </span>${cmd}`;
    output.appendChild(commandLine);

    const upperCmd = cmd.toUpperCase().trim();
    
    if (commands[upperCmd]) {
        commands[upperCmd]();
    } else if (upperCmd.startsWith('FIELD ')) {
        showFieldDetails(upperCmd.replace('FIELD ', ''));
    } else {
        showError(`COMMAND NOT RECOGNIZED: ${cmd}\nType 'HELP' for available commands`);
    }

    output.scrollTop = output.scrollHeight;
}

function processTransaction(type) {
    const data = profileData[type];
    if (!data) {
        showError('TRANSACTION TYPE NOT FOUND');
        return;
    }

    playBeep();
    transactionCounter++;
    
    const output = document.getElementById('terminal-output');
    
    // More compelling processing message based on type
    const processingMessages = {
        'about': '► AUTHENTICATING PAYMENT ENGINEER CREDENTIALS...',
        'experience': '► RETRIEVING 8+ YEARS TRANSACTION HISTORY...',
        'skills': '► QUERYING TECHNICAL CAPABILITIES DATABASE...',
        'education': '► ACCESSING ACADEMIC NETWORK RECORDS...',
        'contact': '► ESTABLISHING SECURE COMMUNICATION CHANNEL...'
    };
    
    const processing = document.createElement('div');
    processing.className = 'output-line';
    processing.style.color = '#00ff00';
    processing.textContent = processingMessages[type] || `► PROCESSING ${type.toUpperCase()} REQUEST (MTI: ${data.mti})...`;
    output.appendChild(processing);
    output.scrollTop = output.scrollHeight;
    
    // Short delay then show ISO message
    setTimeout(() => {
        showISOMessage(data);
    }, 800);
}

function showISOMessage(data) {
    const output = document.getElementById('terminal-output');
    
    // Simple divider
    const divider = document.createElement('div');
    divider.className = 'output-line';
    divider.style.color = '#00ff00';
    divider.textContent = '────────────────────────────────────────────────────────────────';
    output.appendChild(divider);
    
    // Prepare all lines to be displayed
    const lines = [];
    
    lines.push(`MTI: ${data.mti} | TXN: ${String(transactionCounter).padStart(6, '0')} | ${new Date().toLocaleTimeString()}`);
    lines.push('');
    
    for (const [field, info] of Object.entries(data.fields)) {
        // Check if value contains HTML (for links)
        if (info.value.includes('<a href=')) {
            // For HTML content, we need to handle it differently
            const fieldLine = document.createElement('div');
            fieldLine.innerHTML = `[${field.padStart(3, '0')}] ${info.name.padEnd(25)}: ${info.value}`;
            lines.push(fieldLine);
        } else {
            const fieldLine = `[${field.padStart(3, '0')}] ${info.name.padEnd(25)}: ${info.value}`;
            lines.push(fieldLine);
        }
    }
    
    lines.push('');
    lines.push('RESPONSE CODE: 00 (APPROVED)');
    
    // Display lines with readable delay
    let lineIndex = 0;
    const displayLine = () => {
        if (lineIndex < lines.length) {
            const currentItem = lines[lineIndex];
            let line;
            
            // Check if it's an HTML element or plain text
            if (typeof currentItem === 'object' && currentItem.innerHTML) {
                // It's already an HTML element with links
                line = currentItem;
                line.className = 'output-line';
                line.style.color = '#00ff00';
            } else {
                // It's plain text
                line = document.createElement('div');
                line.className = 'output-line';
                line.style.color = '#00ff00';
                line.textContent = currentItem || ' '; // Empty lines for spacing
            }
            
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
            
            lineIndex++;
            // Slightly longer delay for readability
            const delay = currentItem === '' ? 20 : 60; // Shorter delay for empty lines
            setTimeout(displayLine, delay);
        } else {
            // Re-focus input
            document.getElementById('command-input').focus();
        }
    };
    
    displayLine();
}

function showHelp() {
    const output = document.getElementById('terminal-output');
    const help = document.createElement('div');
    help.className = 'output-line';
    help.innerHTML = `
<pre class="success-message">
╔════════════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                          ║
╠════════════════════════════════════════════════════════════════╣
║  AUTH / ABOUT     : Authorization inquiry (Profile)            ║
║  TXN / EXPERIENCE : Transaction history (Work Experience)      ║
║  INQUIRY / SKILLS : Balance inquiry (Technical Skills)         ║
║  NETWORK / EDU    : Network status (Education)                 ║
║  SETTLE / CONTACT : Settlement details (Contact Info)          ║
║  RESUME           : Download full transaction log (Resume)     ║
║  TRACE            : Show transaction trace                     ║
║  STATUS           : System status                              ║
║  ISO              : ISO-8583 field reference                   ║
║  PING             : Test card network connectivity             ║
║  BATCH            : Show career batch summary                  ║
║  CLEAR            : Clear terminal                             ║
║  HELP             : Show this help message                     ║
╚════════════════════════════════════════════════════════════════╝
</pre>`;
    output.appendChild(help);
}

function showSystemStatus() {
    const output = document.getElementById('terminal-output');
    const uptime = Date.now() - startTime;
    const hours = Math.floor(uptime / 3600000);
    const minutes = Math.floor((uptime % 3600000) / 60000);
    const seconds = Math.floor((uptime % 60000) / 1000);
    
    const status = document.createElement('div');
    status.className = 'output-line';
    status.innerHTML = `
<pre class="success-message">
SYSTEM STATUS REPORT
════════════════════════════════════════════
HOST NODE        : SEATTLE-WA-01
STATUS           : OPERATIONAL
UPTIME           : ${hours}h ${minutes}m ${seconds}s
TRANSACTIONS     : ${transactionCounter}
APPROVAL RATE    : 99.97%
NETWORK LATENCY  : 12ms
PROCESSOR STATUS : ONLINE
HSM STATUS       : CONNECTED
PCI COMPLIANCE   : VALID
SSL CERTIFICATE  : VALID (RSA-4096)
LAST AUDIT       : ${new Date().toISOString().split('T')[0]}
════════════════════════════════════════════
</pre>`;
    output.appendChild(status);
}

function showTransactionTrace() {
    const output = document.getElementById('terminal-output');
    const trace = document.createElement('div');
    trace.className = 'output-line';
    
    const traceData = `
<pre class="success-message">
TRANSACTION TRACE LOG
════════════════════════════════════════════
TXN ID    TYPE        STATUS    RESPONSE   TIME
────────────────────────────────────────────`;
    
    let traceLines = traceData;
    for (let i = 0; i < Math.min(5, transactionCounter); i++) {
        const txnId = `TXN${String(transactionCounter - i).padStart(6, '0')}`;
        const types = ['AUTH', 'INQUIRY', 'SETTLE', 'NETWORK', 'TXN'];
        const type = types[i % types.length];
        traceLines += `
${txnId}  ${type.padEnd(10)}  APPROVED  00         ${new Date(Date.now() - i * 60000).toLocaleTimeString()}`;
    }
    
    traceLines += `
════════════════════════════════════════════
</pre>`;
    
    trace.innerHTML = traceLines;
    output.appendChild(trace);
}

function pingNetworks() {
    const output = document.getElementById('terminal-output');
    const ping = document.createElement('div');
    ping.className = 'output-line';
    
    const networks = [
        { name: 'VISA', latency: Math.floor(Math.random() * 20 + 10) },
        { name: 'MASTERCARD', latency: Math.floor(Math.random() * 20 + 10) },
        { name: 'AMEX', latency: Math.floor(Math.random() * 20 + 10) },
        { name: 'DISCOVER', latency: Math.floor(Math.random() * 20 + 10) },
        { name: 'PAYPAL', latency: Math.floor(Math.random() * 20 + 10) },
        { name: 'STRIPE', latency: Math.floor(Math.random() * 20 + 10) }
    ];
    
    ping.innerHTML = '<pre class="success-message">PINGING PAYMENT NETWORKS...</pre>';
    output.appendChild(ping);
    
    networks.forEach((network, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'output-line';
            line.innerHTML = `<span class="success-message">✓ ${network.name}: ${network.latency}ms - CONNECTED</span>`;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        }, (index + 1) * 300);
    });
}

function showBatchSummary() {
    const output = document.getElementById('terminal-output');
    const batch = document.createElement('div');
    batch.className = 'output-line';
    batch.innerHTML = `
<pre class="success-message">
CAREER BATCH SETTLEMENT SUMMARY
════════════════════════════════════════════════════════════════
BATCH ID         : MARKIN-2024-${Date.now()}
SETTLEMENT DATE  : ${new Date().toISOString().split('T')[0]}
────────────────────────────────────────────────────────────────
ORGANIZATION          PERIOD      TRANSACTIONS    VOLUME
────────────────────────────────────────────────────────────────
PAYPAL/BRAINTREE     2022-2024    GOVERNANCE      ENTERPRISE
STRIPE               2020-2022    OPERATIONS      HIGH
BRAINTREE            2016-2020    ENGINEERING     HIGH
────────────────────────────────────────────────────────────────
TOTAL EXPERIENCE : 8+ YEARS
TOTAL IMPACT     : BILLIONS IN PAYMENT VOLUME
APPROVAL RATE    : 99.97%
COMPLIANCE       : 100% PCI-DSS COMPLIANT
════════════════════════════════════════════════════════════════
</pre>`;
    output.appendChild(batch);
}

function showISOCommands() {
    const output = document.getElementById('terminal-output');
    const iso = document.createElement('div');
    iso.className = 'output-line';
    iso.innerHTML = `
<pre class="success-message">
ISO-8583 MESSAGE TYPE INDICATORS
════════════════════════════════════════════
0100 : Authorization Request (ABOUT)
0200 : Financial Transaction (EXPERIENCE) 
0400 : Reversal (SKILLS)
0420 : Reversal Advice (CONTACT)
0800 : Network Management (EDUCATION)
════════════════════════════════════════════

KEY FIELDS USED:
002  : Primary Account Number
003  : Processing Code
004  : Transaction Amount
011  : System Trace Audit Number
032  : Acquiring Institution ID
037  : Retrieval Reference Number
039  : Response Code
041  : Terminal ID
043  : Merchant Location
════════════════════════════════════════════
</pre>`;
    output.appendChild(iso);
}

function clearTerminal() {
    const output = document.getElementById('terminal-output');
    output.innerHTML = `
        <div class="welcome-message">
            <pre>
MARKIN PAYMENTS MAINFRAME v2.1
Copyright (c) 2024 - Authorized Personnel Only
PCI-DSS Compliant | EMV Certified | ISO-8583 Compatible
────────────────────────────────────────────────────────────
Type 'HELP' for available commands or select a transaction type:
            </pre>
        </div>
    `;
}

function downloadResume() {
    const output = document.getElementById('terminal-output');
    const download = document.createElement('div');
    download.className = 'output-line processing';
    download.innerHTML = 'ACCESSING DOCUMENT VAULT...';
    output.appendChild(download);
    
    setTimeout(() => {
        // Create download link for PDF
        const a = document.createElement('a');
        a.href = 'Arkin Matthew Resume 2025.pdf';
        a.download = 'Arkin_Matthew_Resume_2025.pdf';
        a.click();
        
        download.innerHTML = '<span class="success-message">✓ RESUME TRANSMITTED: Arkin_Matthew_Resume_2025.pdf</span>';
    }, 1500);
}

function showError(message) {
    const output = document.getElementById('terminal-output');
    const error = document.createElement('div');
    error.className = 'output-line error-message';
    error.innerHTML = `ERROR: ${message}`;
    output.appendChild(error);
    playBeep();
}

function typeWriterEffect(text, speed = 50) {
    const output = document.getElementById('terminal-output');
    const element = document.createElement('div');
    element.className = 'output-line';
    output.appendChild(element);
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
}

function playBeep() {
    const beep = document.getElementById('beep-sound');
    if (beep) {
        beep.volume = 0.1;
        beep.play().catch(() => {});
    }
}

function updateClock() {
    const timeElement = document.getElementById('current-time');
    setInterval(() => {
        timeElement.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
    }, 1000);
}

function updateUptime() {
    const uptimeElement = document.getElementById('uptime');
    setInterval(() => {
        const uptime = Date.now() - startTime;
        const hours = Math.floor(uptime / 3600000);
        const minutes = Math.floor((uptime % 3600000) / 60000);
        const seconds = Math.floor((uptime % 60000) / 1000);
        uptimeElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Add some glitch effects occasionally
setInterval(() => {
    if (Math.random() > 0.95) {
        document.body.style.filter = 'brightness(1.2)';
        setTimeout(() => {
            document.body.style.filter = 'brightness(1)';
        }, 50);
    }
}, 5000);