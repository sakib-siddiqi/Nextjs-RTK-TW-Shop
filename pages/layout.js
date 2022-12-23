const PORTFOLIO = "https://sakib-siddiqi.netlify.app/";
export default function layout({ children }) {
  return (
    <>
      <header></header>
      {/* MAIN */}
      <main>{children}</main>
      <footer className="py-3 bg-rose-600 text-center">
        <div className="container">
          <p className="font-medium text-xl font-mono text-white tracking-wider">
            Developed by
            <a
              href="PORTFOLIO"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-wavy hover:decoration-double underline-offset-4 decoration-rose-300 ml-2"
            >@sakib
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
