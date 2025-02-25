"use client";

export function EnvError({ message }: { message: string }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-red-700">
      <div className="w-full max-w-2xl border-[1px] border-red-900 p-4">
        <h1 className="text-2xl font-bold text-white">Error</h1>
        <p className="text-sm text-white">{message}</p>
      </div>
    </div>
  );
}
