// ==UserScript==
// @name         CC98 HighLight
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  highlight code when using markdown editor in www.cc98.org
// @author       Slowist
// @match        https://www.cc98.org/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Load Highlight.js
    function loadHighlightJs(callback) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js';
        script.onload = callback;

        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/kimbie-light.min.css';
        document.head.appendChild(style);
        document.head.appendChild(script);
    }

    // Load Clipboard.js
    function loadClipboardJs(callback) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Highlight and add copy buttons
    function highlightAndAddCopyButtons() {
        setTimeout(() => {
            const codeBlocks = document.querySelectorAll('pre code');
            codeBlocks.forEach((codeBlock, index) => {
                if (!codeBlock.nextSibling || !codeBlock.nextSibling.matches('button')) { // Prevent duplicate buttons
                    const copyButton = document.createElement('button');
                    copyButton.textContent = 'Copy';
                    copyButton.style.position = 'absolute';
                    copyButton.style.top = '5px';
                    copyButton.style.right = '10px';
                    copyButton.style.zIndex = '9999';
                    copyButton.style.backgroundColor = '#E8E8E8';  // Bootstrap blue
                    copyButton.style.color = '#616161';  // White text
                    copyButton.style.cursor = 'pointer';
                    copyButton.style.padding = '5px 10px';
                    copyButton.style.border = 'none';
                    copyButton.style.borderRadius = '3px';

                    // Set code block ID
                    const codeId = `code-block-${index}`;
                    codeBlock.id = codeId;
                    copyButton.setAttribute('data-clipboard-target', `#${codeId}`);
                    codeBlock.parentNode.style.position = 'relative';
                    codeBlock.parentNode.appendChild(copyButton);

                    // Initialize Clipboard.js
                    const clipboard = new ClipboardJS(copyButton);

                    clipboard.on('success', function(e) {
                        copyButton.textContent = 'Copied!';
                        e.clearSelection();
                        setTimeout(() => {
                            copyButton.textContent = 'Copy';
                        }, 2000);
                    });

                    clipboard.on('error', function(e) {
                        copyButton.textContent = 'Failed';
                        setTimeout(() => {
                            copyButton.textContent = 'Copy';
                        }, 2000);
                    });
                }
            });
        }, 500); // Increased delay to ensure elements load
    }

    // MutationObserver to track dynamic content
    function observeDomChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                highlightAndAddCopyButtons();  // Add buttons on DOM changes
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Load Highlight.js
    loadHighlightJs(() => {
        hljs.configure({ ignoreUnescapedHTML: true });
        hljs.highlightAll();  // Initial highlight
        setInterval(() => {
            hljs.highlightAll();  // Re-highlight dynamic content
        }, 1000);  // Reduced interval to 1000ms

        // Load Clipboard.js
        loadClipboardJs(highlightAndAddCopyButtons);
        observeDomChanges();  // Track DOM changes for dynamic content
    });
})();
