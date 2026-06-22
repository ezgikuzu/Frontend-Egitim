export default function Header() {
    return (
        <header className="app-header">
            <div className="Flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant cursor-alias">menu</span>
                <div className="header-brand">EduFlow || Udemy</div>
            </div>
            <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-on-surface-variant cursor-alias">notifications
                </span>
            <div className="flex items-center">
                <span className="material-symbols-outlined text-on-surface-variant cursor-alias">search</span>
            </div>
            </div>
        </header>
    );
}