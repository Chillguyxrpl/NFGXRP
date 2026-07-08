/* ==========================================================================
   NFG INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Flight logic disabled - returning to static image mascot


    // 2. LIVE PRICE TICKER (NFG from Horizon AMM, Live XRP)
    const ticker = document.getElementById('price-ticker');
    
    async function fetchXrpPrice() {
        try {
            const res = await fetch("https://api.coinbase.com/v2/prices/XRP-USD/spot");
            const data = await res.json();
            return parseFloat(data.data.amount);
        } catch (e) {
            console.error("Failed to fetch XRP price:", e);
            return 1.12; // Fallback
        }
    }

    async function fetchNfgAmm() {
        try {
            const res = await fetch("https://xrplcluster.com/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "method": "amm_info",
                    "params": [
                        {
                            "asset": { "currency": "XRP" },
                            "asset2": { "currency": "NFG", "issuer": "rNFGBqAKm2xFMsrTDHHJv5Hxq3gfYYWxH1" }
                        }
                    ]
                })
            });
            const data = await res.json();
            if (data && data.result && data.result.amm) {
                const xrpAmount = parseFloat(data.result.amm.amount) / 1000000;
                const nfgAmount = parseFloat(data.result.amm.amount2.value);
                return {
                    xrpAmount: xrpAmount,
                    nfgAmount: nfgAmount,
                    priceInXrp: xrpAmount / nfgAmount,
                    liquidityXrp: xrpAmount * 2
                };
            }
            throw new Error("Invalid AMM data");
        } catch (e) {
            console.error("Failed to fetch NFG AMM info:", e);
            return null; // Fallback
        }
    }

    async function updateLiveTicker() {
        if (!ticker) return;
        
        const xrpPrice = await fetchXrpPrice();
        const nfgAmm = await fetchNfgAmm();

        let tickerContent = "";

        if (nfgAmm) {
            const nfgPriceUsd = nfgAmm.priceInXrp * xrpPrice;
            const liquidityUsd = nfgAmm.liquidityXrp * xrpPrice;
            
            tickerContent = `
                <span style="color: #39ff14; text-shadow: 0 0 8px rgba(57, 255, 20, 0.5)">NFG $${nfgPriceUsd.toFixed(2)} (${nfgAmm.priceInXrp.toFixed(2)} XRP) 🚀</span>
                <span style="color: #00f0ff; text-shadow: 0 0 8px rgba(0, 240, 255, 0.5)">POOL LIQUIDITY: $${Math.round(liquidityUsd).toLocaleString()} (${Math.round(nfgAmm.liquidityXrp).toLocaleString()} XRP) 💧</span>
                <span style="color: #ff007f; text-shadow: 0 0 8px rgba(255, 0, 127, 0.5)">XRP $${xrpPrice.toFixed(3)} ⚡</span>
            `;
        } else {
            // Fallback simulated prices if APIs are blocked or down
            tickerContent = `
                <span style="color: #39ff14; text-shadow: 0 0 8px rgba(57, 255, 20, 0.5)">NFG $444.60 (397.60 XRP) 🔥</span>
                <span style="color: #00f0ff; text-shadow: 0 0 8px rgba(0, 240, 255, 0.5)">POOL LIQUIDITY: $11,350 (10,152 XRP) 💧</span>
                <span style="color: #ff007f; text-shadow: 0 0 8px rgba(255, 0, 127, 0.5)">XRP $1.118 ⚡</span>
            `;
        }

        // Add standard funny static monitor statements to maintain the vibe
        tickerContent += `
            <span>WARNING: SUITS DETECTED - ENGAGING COUNTERMEASURES 🚨</span>
            <span>UNGOVERNABLE LEDGER STATE ⚡</span>
            <span>MAKING MEMES FUN AGAIN 👑</span>
        `;

        ticker.innerHTML = tickerContent;
    }

    // Load immediately
    updateLiveTicker();
    // Update every 10 seconds
    setInterval(updateLiveTicker, 10000);


    // 3. SARCASTIC "GIVE A FUQ" GAME
    const giveFuqBtn = document.getElementById('give-fuq-btn');
    const fuqsCounter = document.getElementById('fuqs-counter');
    const terminalFeed = document.getElementById('terminal-feed');
    let clickCount = 0;

    const errorMessages = [
        "System Error: Out of Fuqs.",
        "Warning: Fuq reserve is empty.",
        "Querying XRPL ledger... 0 Fuqs returned.",
        "Error 404: Fuq Not Found.",
        "Action blocked: Insufficient Fuqs in wallet.",
        "Transaction reverted: Dev doesn't care.",
        "Suits attempted to buy a Fuq. Transaction denied.",
        "Alert: Excessive clicks detected. Fuq balance remains 0.",
        "Checking database... 0 entries found for 'FuqsGiven'.",
        "Error: Request timed out. Mainframe ran out of fuqs.",
        "ProTip: Try clicking faster. (Just kidding, it still won't work.)",
        "Status: System state is 100% UNGOVERNABLE. 0% COMPLIANT.",
        "Security Alert: Attempted Fuq injection detected and neutralized.",
        "Did you really expect this counter to go up?",
        "Achievement Unlocked: Determined Clicker. Reward: 0 Fuqs.",
        "Error 404: Fuq yo feelings.",
        "Alert: I forgot to give a fuq.",
        "System Check: I checked my pockets, I don't have any fuqs left."
    ];

    if (giveFuqBtn && fuqsCounter && terminalFeed) {
        giveFuqBtn.addEventListener('click', () => {
            clickCount++;
            
            // Screen shake effect
            document.body.classList.add('shake-anim');
            setTimeout(() => {
                document.body.classList.remove('shake-anim');
            }, 400);

            // Animate digit click: flicker up to a random number then reset to 0
            const randomVal = Math.floor(Math.random() * 999) + 1;
            fuqsCounter.textContent = randomVal;
            fuqsCounter.style.color = '#ff3b30'; // red error flicker
            fuqsCounter.style.textShadow = '0 0 12px #ff3b30';

            setTimeout(() => {
                fuqsCounter.textContent = "0";
                fuqsCounter.style.color = '#39ff14'; // restore green
                fuqsCounter.style.textShadow = '0 0 10px #39ff14';
            }, 250);

            // Add response log line
            const randMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span class="prompt">></span> <span class="term-text text-pink">[LOG-${clickCount}] ${randMsg}</span>`;
            
            terminalFeed.appendChild(line);
            terminalFeed.scrollTop = terminalFeed.scrollHeight;

            // Cap the terminal logs to last 15
            while (terminalFeed.children.length > 15) {
                terminalFeed.removeChild(terminalFeed.firstChild);
            }
        });
    }


    // 4. THE NFG RAVEN ROASTER
    const roastInput = document.getElementById('roast-input');
    const roastBtn = document.getElementById('roast-btn');
    const roastContent = document.getElementById('roast-content');
    const roastBox = document.getElementById('roast-box');

    const specificRoasts = {
        btc: "Bitcoin? Oh, look at Mr. Digital Gold. Enjoy your 10-minute block times while the rest of us trade in milliseconds. Go back to your retirement home.",
        eth: "Ethereum? Hope you like paying $60 in gas to move a $15 asset. You're basically financing the validator's second summer cottage.",
        sol: "Solana? Did the network actually stay online long enough for you to submit this query? Go restart your validator node.",
        xrp: "XRPL? Ah, the 589 army. You've been waiting for escrow releases and regulatory clarity since the Jurassic period. Keep holding, tomorrow is surely the day.",
        nfg: "NFG? The developers literally put 'No Fuqs Given' on the logo and you still put money in it. Absolute legend. Respect.",
        doge: "Doge/Shib? Cute dogs. Too bad they need a billionaire to post a jpeg of a Shiba Inu to move 2%. We fly on our own wings here.",
        meme: "Meme coins? You're playing hot potato with financial dynamite. Don't look at me when it drops 98% in five minutes.",
        wallet: "That wallet address looks like a random string of characters representing your remaining brain cells after years of levered trading."
    };

    const genericRoasts = [
        "I've seen smarter decisions made by an automated arbitrage bot running on a dial-up connection.",
        "You're asking a bird wearing a denim vest for life advice? Yeah, your trading history makes sense now.",
        "My vest patches have more actual utility than the entire roadmap of the project you're holding.",
        "You look like the type of trader who buys at the peak, sells at the bottom, and blames market manipulation.",
        "Your portfolio is looking like a digital museum of failed launches and rug pulls.",
        "I would give you a sophisticated roast, but I'm completely out of fuqs. Go check the counter.",
        "Is your investment strategy based on tweets from accounts with laser eyes? Blink twice if you need help.",
        "If denial was a crypto token, you'd be a whale."
    ];

    if (roastBtn && roastInput && roastContent && roastBox) {
        roastBtn.addEventListener('click', () => {
            const query = roastInput.value.trim().toLowerCase();
            
            if (!query) {
                roastContent.textContent = "\"Type something first, genius. I can't roast thin air.\"";
                return;
            }

            // Trigger click visual effect on box
            roastBox.style.transform = 'scale(0.98)';
            setTimeout(() => { roastBox.style.transform = 'scale(1)'; }, 100);

            // Display "Analyzing..." text
            roastContent.textContent = "... Raven is thinking of a savage reply ...";
            roastContent.style.opacity = 0.5;

            // Delayed response to simulate "thinking"
            setTimeout(() => {
                roastContent.style.opacity = 1;
                let roastText = "";

                // Match specific keywords
                if (query.includes('btc') || query.includes('bitcoin')) {
                    roastText = specificRoasts.btc;
                } else if (query.includes('eth') || query.includes('ethereum')) {
                    roastText = specificRoasts.eth;
                } else if (query.includes('sol') || query.includes('solana')) {
                    roastText = specificRoasts.sol;
                } else if (query.includes('xrp') || query.includes('ripple') || query.includes('xrpl')) {
                    roastText = specificRoasts.xrp;
                } else if (query.includes('nfg') || query.includes('nofuqs')) {
                    roastText = specificRoasts.nfg;
                } else if (query.includes('doge') || query.includes('shib') || query.includes('pepe') || query.includes('wif')) {
                    roastText = specificRoasts.doge;
                } else if (query.includes('meme') || query.includes('shitcoin')) {
                    roastText = specificRoasts.meme;
                } else if (query.startsWith('r') && query.length > 25) { // typical XRPL address starts with r
                    roastText = specificRoasts.wallet;
                } else {
                    // Pick a random generic roast
                    const randIdx = Math.floor(Math.random() * genericRoasts.length);
                    roastText = genericRoasts[randIdx];
                }

                // Add quotes around the roast
                roastContent.textContent = `"${roastText}"`;
            }, 600);
        });

        // Trigger on Enter key
        roastInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                roastBtn.click();
            }
        });
    }


    // 5. CONTRACT COPY TO CLIPBOARD
    const copyBtn = document.getElementById('copy-btn');
    const contractAddr = document.getElementById('contract-addr');
    const copyFeedback = document.getElementById('copy-feedback');

    if (copyBtn && contractAddr && copyFeedback) {
        copyBtn.addEventListener('click', () => {
            const address = contractAddr.textContent;
            
            // Clipboard API
            navigator.clipboard.writeText(address).then(() => {
                // Success feedback
                copyBtn.textContent = "COPIED!";
                copyBtn.style.background = "#39ff14"; // Green feedback
                copyBtn.style.color = "#000";
                
                copyFeedback.textContent = "Contract address copied... or whatever. idc, buy it if you want.";
                copyFeedback.style.color = "#39ff14";
                
                // Reset after 3 seconds
                setTimeout(() => {
                    copyBtn.textContent = "COPY ADDRESS";
                    copyBtn.style.background = "var(--neon-pink)";
                    copyBtn.style.color = "white";
                    copyFeedback.textContent = "";
                }, 3000);
            }).catch(err => {
                // Fallback
                copyFeedback.textContent = "Failed to copy address. Copy it manually, don't be lazy.";
                copyFeedback.style.color = "var(--neon-red)";
            });
        });
    }
});
