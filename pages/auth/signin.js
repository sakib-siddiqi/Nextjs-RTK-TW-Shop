export default function singin() {
  return (
    <section className="py-16 bg-indigo-50 relative">
      <div className="h-96 w-96 bg-emerald-200 rounded-full absolute z-10 -translate-x-1/3 -translate-y-1/3"></div>
      <div className="h-96 w-96 bg-green-200 rounded-full absolute z-10 right-0 -translate-x-[20%] translate-y-1/3"></div>
      <div className="h-44 w-44 bg-green-200 rounded-full absolute z-10 bottom-0 translate-x-1/3 -translate-y-2/3"></div>

      <div className="container relative  z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-md overflow-hidden  min-h-[80vh] shadow-2xl shadow-indigo-500/30 bg-white">
          {/* DISPLAY */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-400">
            <img src="http://localhost:3000/login.png" alt="" />
          </div>
          {/* FORM */}
          <div>
            <h1 className="text-4xl">Login</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
