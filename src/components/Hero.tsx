import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { content } from '../data/content';

const CHARS = "0123456789ABCDEF";

// =============================================================================
// ANIMATION BLOCKS
// =============================================================================

/**
 * MatrixChar: Internally used by AnimatedDecodeText for character-level scrambling.
 */
const MatrixChar = ({ targetChar, isRevealed, isActive }: { targetChar: string, isRevealed: boolean, isActive: boolean }) => {
    const [char, setChar] = useState(targetChar);
    const [glow, setGlow] = useState(false);

    useEffect(() => {
        if (!isActive || isRevealed || targetChar === " ") return;
        const interval = setInterval(() => {
            setChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
        }, 50);
        return () => clearInterval(interval);
    }, [isRevealed, isActive, targetChar]);

    useEffect(() => {
        if (isRevealed && targetChar !== " ") {
            setChar(targetChar);
            setGlow(true);
            const timer = setTimeout(() => setGlow(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isRevealed, targetChar]);

    return (
        <motion.span
            animate={{
                color: glow ? "#60A5FA" : "inherit",
                opacity: isRevealed ? 1 : 0.5,
            }}
            className={!isRevealed ? "font-mono" : ""}
        >
            {isRevealed || targetChar === " " ? targetChar : char}
        </motion.span>
    );
};

const animationTracker = new Set<string>();

// Tracker for first-load animations (to differentiate page load vs section change)
const firstLoadTracker = new Set<string>();

/**
 * AnimatedDecodeText: Scrambles text characters until they are revealed one by one.
 */
const AnimatedDecodeText = ({ text, delay = 0, duration = 0.5 }: { text: string, delay?: number, duration?: number }) => {
    const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
    const [shuffledIndices] = useState(() =>
        Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    );
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasCompleted] = useState(() => animationTracker.has(text));

    useEffect(() => {
        if (hasCompleted) return;

        const timer = setTimeout(() => {
            setIsAnimating(true);
            let count = 0;
            const stepDuration = (duration * 1000) / text.length;
            const interval = setInterval(() => {
                count++;
                setRevealedIndices(shuffledIndices.slice(0, count));
                if (count >= text.length) {
                    clearInterval(interval);
                    animationTracker.add(text);
                }
            }, stepDuration);
            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(timer);
    }, [text, delay, duration, shuffledIndices, hasCompleted]);

    if (hasCompleted) return <>{text}</>;
    if (!isAnimating) return <span className="opacity-0">{text}</span>;

    return (
        <>
            {text.split("").map((char, i) => (
                <MatrixChar
                    key={i}
                    targetChar={char}
                    isRevealed={revealedIndices.includes(i)}
                    isActive={isAnimating}
                />
            ))}
        </>
    );
};

/**
 * AnimatedRevealBlock: Reveals multiple lines of text with a sliding vertical line and blur effect.
 */
const AnimatedRevealBlock = ({ titles, delay = 0, duration = 0.3, className }: { titles: string[], delay?: number, duration?: number, className: string }) => {
    const [hasCompleted] = useState(() => animationTracker.has(titles.join('')));
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (hasCompleted) return;
        const timer = setTimeout(() => {
            setIsAnimating(true);
            const completeTimer = setTimeout(() => {
                animationTracker.add(titles.join(''));
            }, (duration * 1000) + 300);
            return () => clearTimeout(completeTimer);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [delay, duration, titles, hasCompleted]);

    if (hasCompleted) {
        return (
            <div className="border-l-2 border-primary dark:border-dark-primary pl-6">
                {titles.map((text, i) => (
                    <h2 key={i} className={className}>{text}</h2>
                ))}
            </div>
        );
    }

    return (
        <div className="relative pl-6 mb-12 w-fit">
            <motion.div
                initial={{ left: "100%", opacity: 0 }}
                animate={isAnimating ? { left: "0%", opacity: 1 } : { left: "100%", opacity: 0 }}
                transition={{ duration, ease: "circOut" }}
                className="absolute top-0 bottom-0 w-[2.5px] bg-primary dark:bg-dark-primary z-20"
            />

            <div className="relative">
                {titles.map((text, i) => (
                    <motion.h2
                        key={i}
                        initial={{ opacity: 0, filter: "blur(12px)", x: 10 }}
                        animate={isAnimating ? {
                            opacity: 1,
                            filter: "blur(0px)",
                            x: 0,
                        } : {
                            opacity: 0,
                            filter: "blur(12px)",
                            x: 10,
                        }}
                        transition={{ duration, ease: "circOut" }}
                        className={className}
                        style={{
                            clipPath: isAnimating ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
                            transition: `clip-path ${duration}s cubic-bezier(0, 0.55, 0.45, 1)`
                        }}
                    >
                        {text}
                    </motion.h2>
                ))}
            </div>
        </div>
    );
};

/**
 * AnimatedTypewriter: Classic typing animation when elements enter the viewport.
 */
const AnimatedTypewriter = ({ text, delay = 0, duration = 1 }: { text: string, delay?: number, duration?: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [display, setDisplay] = useState("");
    const trackerKey = `typewriter_${text}`;

    useEffect(() => {
        const unsubscribe = rounded.on("change", (v) => {
            setDisplay(text.slice(0, v));
        });
        return unsubscribe;
    }, [rounded, text]);

    const start = () => {
        const isFirstLoad = !firstLoadTracker.has(trackerKey);
        const actualDelay = isFirstLoad ? delay : 0.2;

        count.set(0);
        animate(count, text.length, {
            duration,
            delay: actualDelay,
            ease: "linear",
            onComplete: () => firstLoadTracker.add(trackerKey),
        });
    };

    const reset = () => {
        count.set(0);
        setDisplay("");
    };

    return (
        <motion.span
            onViewportEnter={start}
            onViewportLeave={reset}
            viewport={{ once: false, amount: 1 }}
        >
            {display}
        </motion.span>
    );
};

/**
 * AnimatedRandomCycle: Randomly cycles characters before settling on the target text.
 */
const AnimatedRandomCycle = ({ target, delay = 0, duration = 0.5, prefix = "" }: { target: string, delay?: number, duration?: number, prefix?: string }) => {
    const [display, setDisplay] = useState("");
    const [isActive, setIsActive] = useState(false);
    const trackerKey = `randomcycle_${target}_${prefix}`;

    useEffect(() => {
        if (!isActive) return;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#";
        let startTime: number;
        let animationFrame: number;

        const animateChar = (time: number) => {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / (duration * 1000);

            if (progress < 1) {
                const random = target.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
                setDisplay(random);
                animationFrame = requestAnimationFrame(animateChar);
            } else {
                setDisplay(target);
                firstLoadTracker.add(trackerKey);
            }
        };

        animationFrame = requestAnimationFrame(animateChar);
        return () => cancelAnimationFrame(animationFrame);
    }, [isActive, target, duration, trackerKey]);

    return (
        <motion.span
            onViewportEnter={() => {
                const isFirstLoad = !firstLoadTracker.has(trackerKey);
                const actualDelay = isFirstLoad ? delay : 0.2;
                setTimeout(() => setIsActive(true), actualDelay * 1000);
            }}
            onViewportLeave={() => {
                setIsActive(false);
                setDisplay("");
            }}
        >
            {isActive ? `${prefix}${display}` : ""}
        </motion.span>
    );
};

/**
 * AnimatedTerminalDots: Animates a sequence of dots, useful for simulating loading or processing.
 */
const AnimatedTerminalDots = ({ delay = 0, duration = 1, className, trackerKey = "terminal_dots" }: { delay?: number, duration?: number, className?: string, trackerKey?: string }) => {
    const [display, setDisplay] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [actualDelay, setActualDelay] = useState(delay);

    useEffect(() => {
        if (!isActive) return;

        const maxChars = 100;
        const controls = animate(0, maxChars, {
            duration,
            delay: actualDelay,
            ease: "linear",
            onUpdate: (latest) => {
                setDisplay(".".repeat(Math.round(latest)));
            },
            onComplete: () => firstLoadTracker.add(trackerKey),
        });

        return () => controls.stop();
    }, [isActive, actualDelay, duration, trackerKey]);

    return (
        <motion.span
            onViewportEnter={() => {
                const isFirstLoad = !firstLoadTracker.has(trackerKey);
                setActualDelay(isFirstLoad ? delay : 0.2);
                setIsActive(true);
            }}
            onViewportLeave={() => {
                setIsActive(false);
                setDisplay("");
            }}
            className={className || "flex-1 font-mono text-[10px] tracking-[4px] opacity-50 overflow-hidden whitespace-nowrap leading-none pt-1"}
        >
            {display}
        </motion.span>
    );
};

/**
 * AnimatedScanReveal: Reveals text blocks with a horizontal scanline scanning downwards.
 */
const AnimatedScanReveal = ({ text, delay = 0, duration = 0.5, className, trackerKey }: { text: string, delay?: number, duration?: number, className: string, trackerKey: string }) => {
    const [hasCompleted] = useState(() => animationTracker.has(trackerKey));
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (hasCompleted) return;
        const timer = setTimeout(() => {
            setIsAnimating(true);
            const completeTimer = setTimeout(() => {
                animationTracker.add(trackerKey);
            }, duration * 1000 + 100);
            return () => clearTimeout(completeTimer);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [delay, duration, hasCompleted, trackerKey]);

    if (hasCompleted) return <p className={className}>{text}</p>;

    return (
        <div className="relative">
            <motion.div
                initial={{ top: 0, opacity: 0 }}
                animate={isAnimating ? { top: "100%", opacity: [0, 1, 1, 0] } : { top: 0, opacity: 0 }}
                transition={{ duration, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-primary/30 dark:bg-dark-primary/30 z-10"
            />
            <motion.p
                initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                animate={isAnimating ? {
                    clipPath: "inset(0 0 0 0)",
                    opacity: 1
                } : {
                    clipPath: "inset(0 0 100% 0)",
                    opacity: 0
                }}
                transition={{ duration, ease: "linear" }}
                className={className}
            >
                {text}
            </motion.p>
        </div>
    );
};

/**
 * AnimatedTerminalLine: Specialized typewriter for terminal-style command lines with an icon and cursor.
 */
const AnimatedTerminalLine = ({ text, delay = 0, duration = 0.5 }: { text: string, delay?: number, duration?: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [display, setDisplay] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const trackerKey = `terminalline_${text}`;

    useEffect(() => {
        return rounded.on("change", (v) => {
            setDisplay(text.slice(0, v));
        });
    }, [rounded, text]);

    const startAnimation = () => {
        const isFirstLoad = !firstLoadTracker.has(trackerKey);
        const actualDelay = isFirstLoad ? delay : 0.2;

        setIsComplete(false);
        count.set(0);
        animate(count, [0, text.length * 0.8, text.length * 0.8, text.length], {
            duration,
            delay: actualDelay,
            ease: "linear",
            times: [0, 0.5, 0.8, 1],
            onComplete: () => {
                setIsComplete(true);
                firstLoadTracker.add(trackerKey);
            },
        });
    };

    return (
        <motion.div
            className="font-mono text-sm mb-6 flex items-center gap-2"
            onViewportEnter={startAnimation}
            onViewportLeave={() => {
                count.set(0);
                setDisplay("");
                setIsComplete(false);
            }}
            viewport={{ once: false, amount: 0.9 }}
        >
            <motion.div
                animate={{ color: isComplete ? "#60A5FA" : "#4B5563" }}
                initial={{ color: "#4B5563" }}
                className="flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-sm">terminal</span>
                <span>{display}</span>
                {!isComplete && (
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                    >
                        _
                    </motion.span>
                )}
            </motion.div>
        </motion.div>
    );
};

/**
 * AnimatedFrameCorners: Decorative corner elements that expand to frame a content area.
 */
const AnimatedFrameCorners = ({ delay = 0, duration = 0.3, trackerKey = "frame_corners" }: { delay?: number, duration?: number, trackerKey?: string }) => {
    const [actualDelay, setActualDelay] = useState(delay);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    return (
        <motion.div
            onViewportEnter={() => {
                const isFirstLoad = !firstLoadTracker.has(trackerKey);
                setActualDelay(isFirstLoad ? delay : 0.2);
                setShouldAnimate(true);
                // Mark as animated after animation completes
                setTimeout(() => firstLoadTracker.add(trackerKey), (isFirstLoad ? delay : 0.2) * 1000 + duration * 1000);
            }}
            onViewportLeave={() => setShouldAnimate(false)}
            viewport={{ once: false, amount: 1 }}
            className="contents"
        >
            <motion.div
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={shouldAnimate ? {
                    width: ["0%", "calc(100% + 1rem)", "24px"],
                    height: ["0%", "calc(100% + 2rem)", "24px"],
                    opacity: [0, 1, 1]
                } : { width: 0, height: 0, opacity: 0 }}
                transition={{ delay: actualDelay, duration, ease: "easeInOut" }}
                className="absolute -top-4 -left-2 border-t border-l border-primary/60 dark:border-dark-primary/60 z-20"
            />
            <motion.div
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={shouldAnimate ? {
                    width: ["0%", "calc(100% + 1rem)", "24px"],
                    height: ["0%", "calc(100% + 2rem)", "24px"],
                    opacity: [0, 1, 1]
                } : { width: 0, height: 0, opacity: 0 }}
                transition={{ delay: actualDelay, duration, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-2 border-b border-r border-primary/60 dark:border-dark-primary/60 z-20"
            />
        </motion.div>
    );
};


export const Hero = () => {
    return (
        <div className="flex justify-center flex-col min-h-[100dvh] w-full relative overflow-visible transition-[min-height] duration-500 ease-in-out">
            <div className="relative z-10 flex flex-col h-full w-full">
                {/* Main scrollable area */}
                <main className={`flex-1 flex flex-col px-4 md:px-12 z-10 pt-24 md:pt-20 pb-16 md:pb-20`}>
                    <div className="flex flex-col justify-center w-full max-w-7xl mx-auto z-10 min-h-full">

                        {/* Terminal Init Sequence */}
                        <AnimatedTerminalLine text="./INIT_SEQUENCE" delay={0} duration={0.5} />

                        {/* Name with Decode Effect */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-secondary dark:text-dark-secondary mb-4 leading-none">
                            <AnimatedDecodeText text={content.basicInfo.firstNameShort} delay={0.4} duration={0.4} /><br />
                            <AnimatedDecodeText text={content.basicInfo.lastNameShort} delay={0.4} duration={0.4} />
                        </h1>

                        {/* Professional Titles Block */}
                        <AnimatedRevealBlock
                            titles={[
                                content.basicInfo.title.split('|')[0].trim(),
                                content.basicInfo.title.split('|')[1].trim()
                            ]}
                            delay={0.4}
                            duration={0.3}
                            className="text-xl md:text-2xl font-display font-light text-secondary/90 dark:text-dark-secondary/90 tracking-wide"
                        />

                        {/* Personal Summary Section with Frame and Scanline */}
                        <div className="max-w-2xl relative mt-4">
                            {/* Decorative framing corners */}
                            <AnimatedFrameCorners delay={0.8} duration={0.3} trackerKey="hero_frame_corners" />

                            <div className="relative pl-6 py-1 border-l border-secondary/5 dark:border-dark-secondary/5">
                                <div className="absolute -top-7 left-0 flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-sm dark:bg-dark-primary"></span>
                                    <span className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase dark:text-dark-primary">
                                        <AnimatedTypewriter text="// PERSONAL_SUMMARY.log" delay={0.6} duration={0.2} />
                                    </span>
                                </div>

                                <AnimatedScanReveal
                                    text={content.aboutMe.summary}
                                    delay={0.8}
                                    duration={0.5}
                                    trackerKey="summary_text"
                                    className="font-mono text-sm md:text-base text-muted dark:text-dark-muted leading-relaxed text-justify opacity-90"
                                />

                                {/* Technical bottom bar with metadata and dots */}
                                <div className="hidden md:flex items-center mt-6 gap-3 opacity-30">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: false, amount: 1 }}
                                        transition={{ delay: 0.8, duration: 0.2 }}
                                        className="h-[1px] w-8 bg-primary dark:bg-dark-primary origin-left"
                                    ></motion.span>

                                    <span className="font-mono text-[9px] text-secondary dark:text-dark-secondary tracking-widest">
                                        <AnimatedTypewriter text="READ_ONLY" delay={0.9} duration={0.3} />
                                    </span>

                                    <AnimatedTerminalDots delay={1.2} duration={0.5} />

                                    <span className="font-mono text-[9px] text-secondary dark:text-dark-secondary">
                                        <AnimatedRandomCycle target="#X92" prefix="ID: " delay={1.2} duration={0.5} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

