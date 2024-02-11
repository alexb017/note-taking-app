export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center h-[calc(100lvh-65px)]">
        <div className="flex flex-col items-center gap-24">
          <div className="flex flex-col items-center gap-2">
            <h3 className=" text-2xl font-medium">Welcome to NoteTaking!</h3>

            <h1 className="text-6xl md:text-8xl font-semibold leading-none tracking-tighter text-center">
              Bring <span className=" text-red-500">i</span>
              <span className="text-yellow-500">d</span>
              <span className="text-green-500">e</span>
              <span className="text-blue-500">a</span>
              <span className="text-violet-500">s</span>✨<br></br> to life
            </h1>
          </div>
          <p className="text-sm text-gray-500">&copy; 2024 NoteTaking ✌️</p>
        </div>
      </div>
    </>
  );
}
