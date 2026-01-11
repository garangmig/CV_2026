import { siteConfig } from '../data/siteConfig';
import { content } from '../data/content';
import { BackgroundGrid } from './BackgroundGrid';

export const Hero = () => {


    return (
        <div className="flex flex-col h-screen w-full relative overflow-hidden bg-background dark:bg-dark-background">
            <BackgroundGrid opacityGrid={50} opacityCross={40} />

            <div className="relative z-10 flex flex-col h-full w-full">
                {/* Main scrollable area */}
                <main className={`flex-1 flex flex-col px-4 md:px-12 overflow-y-auto ${siteConfig.scrollbar.classes} z-10 pb-4`}>
                    <div className="flex flex-col justify-center w-full max-w-7xl mx-auto z-10 min-h-full pt-4">
                        <div className="font-mono text-primary dark:text-dark-primary text-sm mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">terminal</span>
                            <span>./INIT_SEQUENCE</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-secondary dark:text-dark-secondary mb-4 leading-none">
                            {content.basicInfo.firstNameShort}<br />{content.basicInfo.lastNameShort}
                        </h1>

                        <h2 className="text-xl md:text-2xl font-display font-light text-secondary/90 dark:text-dark-secondary/90 tracking-wide border-l-2 border-primary dark:border-dark-primary pl-6">
                            {content.basicInfo.title.split('|')[0].trim()}
                        </h2>
                        <h2 className="text-xl md:text-2xl font-display font-light text-secondary/90 dark:text-dark-secondary/90 mb-12 tracking-wide border-l-2 border-primary dark:border-dark-primary pl-6">
                            {content.basicInfo.title.split('|')[1].trim()}
                        </h2>


                        <div className="max-w-2xl relative mt-4">
                            <div className="absolute -top-4 -left-2 w-6 h-6 border-t border-l border-primary/40 dark:border-dark-primary/40"></div>
                            <div className="absolute -bottom-4 -right-2 w-6 h-6 border-b border-r border-primary/40 dark:border-dark-primary/40"></div>
                            <div className="relative pl-6 py-1 border-l border-secondary/5 dark:border-dark-secondary/5">
                                <div className="absolute -top-7 left-0 flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-sm dark:bg-dark-primary"></span>
                                    <span className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase dark:text-dark-primary">// PERSONAL_SUMMARY.log</span>
                                </div>
                                <p className="font-mono text-sm md:text-base text-muted dark:text-dark-muted leading-relaxed text-justify opacity-90">
                                    {content.aboutMe.summary}
                                </p>
                                <div className="hidden md:flex items-center mt-6 gap-3 opacity-30">
                                    <span className="h-[1px] w-8 bg-primary dark:bg-dark-primary"></span>
                                    <span className="font-mono text-[9px] text-secondary dark:text-dark-secondary tracking-widest">READ_ONLY</span>
                                    <span className="h-[1px] flex-1 bg-grid-line border-t border-dashed border-secondary dark:border-dark-secondary dark:bg-dark-grid-line"></span>
                                    <span className="font-mono text-[9px] text-secondary dark:text-dark-secondary">ID: #X92</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>


            </div>
        </div>
    );
};
