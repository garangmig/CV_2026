import { content } from '../data/content';

interface FooterProps {
    version?: string;
    status?: boolean;
}

export const Footer = ({ version = "V2.0.1", status = false }: FooterProps) => {
    return (
        <footer className="bottom-0 left-0 right-0 px-4 py-4 h-16 md:h-20 md:px-12 md:pb-8 md:pt-4 border-t border-grid-line/50 dark:border-dark-grid-line/50 bg-background/80 dark:bg-dark-background/80 backdrop-blur-md z-50 flex items-center">
            <div className="flex items-center justify-around md:justify-start md:gap-6 w-full">
                <a
                    href={`https://${content.contactInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted dark:text-dark-muted hover:text-secondary dark:hover:text-dark-secondary transition-colors flex items-center gap-2 group cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">code</span>
                    <span className="font-mono text-xs">GITHUB</span>
                </a>
                <a
                    href={`https://${content.contactInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted dark:text-dark-muted hover:text-secondary dark:hover:text-dark-secondary transition-colors flex items-center gap-2 group cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">work</span>
                    <span className="font-mono text-xs">LINKEDIN</span>
                </a>
                <a
                    href={`mailto:${content.contactInfo.email}`}
                    className="text-muted dark:text-dark-muted hover:text-secondary dark:hover:text-dark-secondary transition-colors flex items-center gap-2 group cursor-pointer"
                >
                    <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">mail</span>
                    <span className="font-mono text-xs">EMAIL</span>
                </a>

                <div className="hidden md:flex md:flex-1"></div>

                {status ? (
                    <div className="hidden md:flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success dark:bg-dark-success animate-pulse"></span>
                        <div className="font-mono text-[10px] text-secondary dark:text-dark-secondary tracking-widest">
                            SYSTEM_STATUS: ONLINE
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:block font-mono text-[10px] text-muted dark:text-dark-muted tracking-widest font-bold">
                        EST. 2022 // {version}
                    </div>
                )}
            </div>
        </footer>
    );
};
