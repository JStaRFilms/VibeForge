import { useState, useEffect } from "react";

export function useTypewriter(text: string, typingSpeed: number = 30, startDelay: number = 0, startTyping: boolean = false) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!startTyping) {
            setDisplayedText("");
            setIsTyping(false);
            setIsComplete(false);
            return;
        }

        let timeout: NodeJS.Timeout;
        let currentIndex = 0;

        const start = () => {
            setIsTyping(true);
            const typeNextChar = () => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeout = setTimeout(typeNextChar, typingSpeed + (Math.random() * typingSpeed * 0.5)); // slight randomization
                } else {
                    setIsTyping(false);
                    setIsComplete(true);
                }
            };
            timeout = setTimeout(typeNextChar, typingSpeed);
        };

        timeout = setTimeout(start, startDelay);

        return () => clearTimeout(timeout);
    }, [text, typingSpeed, startDelay, startTyping]);

    return { displayedText, isTyping, isComplete };
}
