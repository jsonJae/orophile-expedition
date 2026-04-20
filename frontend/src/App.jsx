function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition hover:scale-105">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4">
          Tailwind is Live!
        </h1>
        <p className="text-gray-600 mb-6">
          If you see a centered card with a gradient heading and a dark background, the installation was successful.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-blue-500/50">
          Tailwind Button
        </button>
      </div>
    </div>
  )
}

export default App
