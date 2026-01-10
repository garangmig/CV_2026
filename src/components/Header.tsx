import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
    subtitle: string;
    activeIndex: number;
    coords?: string;
}

export const Header = ({ title, subtitle, activeIndex, coords }: HeaderProps) => {
    const navigate = useNavigate();

    const getBarColor = (index: number) => index === activeIndex
        ? "bg-primary shadow-[0_0_10px_theme(colors.primary/50%)] dark:bg-dark-primary dark:shadow-[0_0_10px_theme(colors.dark.primary/50%)]"
        : "bg-grid-line cursor-pointer hover:bg-primary/50 transition-colors dark:bg-dark-grid-line dark:hover:bg-dark-primary/50";

    return (
        <header className="w-full pt-6 md:pt-8 px-4 md:px-12 pb-4 flex-none z-20 relative">
            <div className="flex flex-col gap-2">
                {/* Title and Subtitle Area */}
                <div className="flex justify-between items-end font-mono text-xs tracking-wider text-muted dark:text-dark-muted order-1 md:order-2">
                    <div className="flex items-center gap-3">
                        <span className="text-secondary font-bold dark:text-dark-secondary text-base md:text-xs leading-tight">{title}</span>
                        <span className="hidden md:inline text-secondary dark:text-dark-secondary">///</span>
                        <span className="hidden md:inline">{subtitle}</span>
                    </div>
                    {/* Subtitle on the right for mobile */}
                    <div className="md:hidden text-[10px] text-muted dark:text-dark-muted font-bold uppercase tracking-widest">
                        {subtitle}
                    </div>
                    {/* Desktop Coordinates */}
                    <div className="hidden md:block">
                        COORD: {coords || "34.0522° N, 118.2437° W"}
                    </div>
                </div>

                {/* Navigation Bars */}
                <div className="flex flex-col gap-1 order-2 md:order-1">
                    <div className="flex w-full gap-1 h-1">
                        <div onClick={() => navigate('/')} className={`flex-1 h-full ${getBarColor(0)}`}></div>
                        <div onClick={() => navigate('/portfolio')} className={`flex-1 h-full ${getBarColor(1)}`}></div>
                        <div onClick={() => navigate('/network')} className={`flex-1 h-full ${getBarColor(2)}`}></div>
                        <div onClick={() => navigate('/credentials')} className={`flex-1 h-full ${getBarColor(3)}`}></div>
                    </div>
                    {/* Mobile Coordinates below nav bar */}
                    <div className="md:hidden flex justify-end">
                        <span className="text-[8px] font-mono text-muted/40 dark:text-dark-muted/40 tracking-tighter uppercase">
                            LOC_TRACKING: {coords || "34.0522° N, 118.2437° W"}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};
