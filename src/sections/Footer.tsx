export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-6 border-t border-white/5 relative z-20 bg-bg-primary/50 backdrop-blur-sm select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-gray">
        <div>
          <span>&copy; {currentYear} Komma Rohith Vijay. All rights reserved.</span>
        </div>
        <div className="font-mono text-[10px] text-white/20 tracking-wider">
          DESIGNED &amp; DEVELOPED BY KOMMA ROHITH VIJAY
        </div>
      </div>
    </footer>
  );
}
