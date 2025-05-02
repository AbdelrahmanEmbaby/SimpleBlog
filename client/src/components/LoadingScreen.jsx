export default function LoadingScreen() {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col items-center justify-center h-screen gap-6 p-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            Simple Blog
          </h1>
          <p>Preparing your experience</p>
        </div>

        <span className="loading loading-spinner loading-lg text-primary"></span>
        <div className="animate-fade-in mt-6">
          <p className="text-sm text-center">
            Did you know? This loading screen is powered by pure CSS magic ✨
          </p>
        </div>
      </div>
    </div>
  );
}
