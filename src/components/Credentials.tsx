import { content } from '../data/content';
export const Credentials = () => {
    const { education, certifications } = content;
    const university = education[0];

    // Helper to render logos based on the 'logo' property in content.ts
    const renderLogo = (logoType: string, color: string) => {
        switch (logoType) {
            case 'microsoft':
                return (
                    <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                        <div className="bg-[#F25022] w-full h-full"></div>
                        <div className="bg-[#7FBA00] w-full h-full"></div>
                        <div className="bg-[#00A4EF] w-full h-full"></div>
                        <div className="bg-[#FFB900] w-full h-full"></div>
                    </div>
                );
            case 'google':
                return (
                    <div className="inline-flex items-center justify-center w-4 h-4">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                    </div>
                );
            case 'oracle':
                return (
                    <div className="inline-flex items-center justify-center w-4 h-4">
                        <svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                            <rect x="10" y="10" width="200" height="100" rx="50" ry="50" fill="none" stroke="#F10000" strokeWidth="30" />
                        </svg>
                    </div>
                );
            case 'british':
                return (
                    <div className="inline-flex items-center justify-center w-4 h-4">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <circle cx="28" cy="28" r="18" fill="currentColor" />
                            <circle cx="72" cy="28" r="18" fill="currentColor" />
                            <circle cx="28" cy="72" r="18" fill="currentColor" />
                            <circle cx="72" cy="72" r="18" fill="currentColor" />
                        </svg>
                    </div>
                );
            default:
                return <span className="material-symbols-outlined text-lg" style={{ color }}>badge</span>;
        }
    };

    return (
        <div className="flex flex-col md:h-[100dvh] w-full relative overflow-hidden text-secondary dark:text-dark-secondary transition-[height] duration-500 ease-in-out">
            <div className="relative z-10 flex flex-col h-full w-full">


                {/* Main scrollable area */}
                <main className={`flex-1 flex flex-col px-4 md:px-12 z-10 pt-24 md:pt-20 pb-16 md:pb-20`}>
                    <div className="w-full h-min md:min-h-0 md:h-auto border-l border-b border-r border-t border-grid-line dark:border-dark-grid-line flex flex-col md:flex-row shadow-2xl relative">
                        {/* Decorative corners */}
                        <div className="absolute -top-[6px] -left-[5px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
                        <div className="absolute -top-[6px] -right-[4px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
                        <div className="absolute -bottom-[6px] -left-[5px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
                        <div className="absolute -bottom-[6px] -right-[4px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>

                        {/* Left Panel: ACADEMIC_CORE */}
                        <section className="w-full h-1/2 md:h-auto md:w-[60%] border-r border-grid-line dark:border-dark-grid-line flex flex-col relative border-b md:border-b-0">
                            <div className="p-3 md:p-4 border-b border-grid-line dark:border-dark-grid-line bg-background/50 dark:bg-dark-background/50 backdrop-blur-sm flex items-center justify-between flex-none">
                                <h2 className="font-mono text-xs text-primary/80 dark:text-dark-primary/80 tracking-widest">[ ACADEMIC_CORE ]</h2>
                                <span className="material-symbols-outlined text-[10px] md:text-xs text-muted dark:text-dark-muted">school</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 relative group hover:bg-primary/5 dark:hover:bg-dark-primary/5 transition-colors">
                                <div className="absolute top-4 right-4 text-xs font-mono text-muted dark:text-dark-muted opacity-30">{university.ref}</div>
                                <div className="w-full max-w-2xl flex flex-col gap-2 md:gap-6 relative z-10">
                                    <div className="flex flex-col gap-1 md:gap-2">
                                        <span className="font-mono text-[10px] md:text-xs text-primary/70 dark:text-dark-primary/70 tracking-widest uppercase">Degree Awarded</span>
                                        <h1 className="text-xl md:text-5xl lg:text-6xl font-display font-bold text-secondary dark:text-dark-secondary tracking-tight leading-[1.1]">
                                            {university.degree.split(' en ')[0]} en<br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-muted dark:from-dark-secondary dark:to-dark-muted">
                                                {university.degree.split(' en ')[1]}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="h-px w-24 bg-primary/40 dark:bg-dark-primary/40 my-2"></div>
                                    <div className="flex flex-col">
                                        <span className="text-sm md:text-xl text-secondary dark:text-dark-secondary font-medium">{university.school}</span>
                                        <span className="text-muted dark:text-dark-muted text-[10px] md:text-sm font-mono">{university.facultad} // {university.city}</span>
                                    </div>
                                    <div className="mt-2 md:mt-4 flex items-center gap-2 md:gap-4 flex-wrap">
                                        <div className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 bg-primary/10 dark:bg-dark-primary/10 border border-primary/30 dark:border-dark-primary/30 rounded text-primary dark:text-dark-primary text-[10px] md:text-xs font-mono tracking-wide">
                                            <span className="material-symbols-outlined text-[12px] md:text-sm">verified</span>
                                            {university.status}
                                        </div>
                                        <div className="text-[10px] font-mono text-muted dark:text-dark-muted uppercase">
                                            THESIS_DEFENSE: APPROVED
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 p-4 md:p-8 opacity-5 pointer-events-none">
                                    <span className="material-symbols-outlined text-[100px] md:text-[200px] text-secondary dark:text-dark-secondary">school</span>
                                </div>
                            </div>
                        </section>

                        {/* Right Panel: INDUSTRY_CERTS */}
                        <section className="w-full h-1/2 md:h-auto md:w-[40%] flex flex-col relative">
                            <div className="p-3 md:p-4 border-b border-grid-line dark:border-dark-grid-line bg-background/50 dark:bg-dark-background/50 backdrop-blur-sm flex items-center justify-between flex-none">
                                <h2 className="font-mono text-xs text-primary/80 dark:text-dark-primary/80 tracking-widest">[ INDUSTRY_CERTS ]</h2>
                                <span className="material-symbols-outlined text-[10px] md:text-xs text-muted dark:text-dark-muted">badge</span>
                            </div>
                            <div className="flex-1 grid grid-cols-2">
                                {certifications.map((cert, index) => {
                                    const borderRight = index % 2 === 0 ? "border-r" : "";
                                    const borderBottom = index < 2 ? "border-b" : "";

                                    return (
                                        <article
                                            key={cert.id}
                                            className={`p-3 md:p-6 border-grid-line dark:border-dark-grid-line relative group hover:bg-primary/5 dark:hover:bg-dark-primary/5 transition-colors flex flex-col justify-between ${borderRight} ${borderBottom}`}
                                        >
                                            <div className="absolute top-1 right-1 text-[8px] md:text-[10px] font-mono text-muted dark:text-dark-muted opacity-30 group-hover:opacity-100 transition-opacity">
                                                {cert.id}
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div
                                                    className="w-8 h-8 md:w-10 md:h-10 bg-secondary/5 dark:bg-dark-secondary/5 rounded flex items-center justify-center border transition-colors duration-300"
                                                    style={{ borderColor: `${cert.style.color}33`, color: cert.style.color }}
                                                >
                                                    {renderLogo(cert.style.logo, cert.style.color)}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 md:gap-2 mt-2 md:mt-4">
                                                <h3 className="font-mono text-[10px] md:text-sm font-bold text-secondary dark:text-dark-secondary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                                                    <span style={{ color: cert.style.color }} className="opacity-80 group-hover:opacity-100">
                                                        {cert.issuer}
                                                    </span>
                                                </h3>
                                                <span className="text-[10px] md:text-xs text-muted dark:text-dark-muted leading-tight line-clamp-2 md:line-clamp-none">{cert.name}</span>
                                                <span className="text-[7px] md:text-[9px] font-mono text-muted/50 dark:text-dark-muted/50 mt-0.5 md:mt-1 uppercase">ISSUED: {cert.issued}</span>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </main>

            </div >
        </div >
    );
};
