export default function BottomNav() {
    return (
        <nav className="app-bottom-nav">
            <div className="bottom-nav-link">
                 <span className="material-symbols-outlined">home</span>
                 <span className="text-label-md">Anasayfa</span>
            </div>
            <div className="bottom-nav-ling">
                <span className="material-symbols-outlined">search</span>
                <span className="text-label-md">Arama</span>
            </div>
            <div className="bottom-nav-ling">
                <span className="material-symbols-outlined">play_circle</span>
                <span className="text-label-md">Eğitimlerim</span>
            </div>
            <div className="bottom-nav-ling">
                <span className="material-symbols-outlined">person</span>
                <span className="text-label-md">Profil</span>
            </div>
        </nav>
    )
}