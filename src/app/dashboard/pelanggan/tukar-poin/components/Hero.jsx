"use client";

export default function Hero() {
  return (
    <div className="relative rounded-lg overflow-hidden h-80 sm:h-96 md:h-[20rem] mb-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/tukar-poin.jpeg')" }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative p-8 text-white flex flex-col items-start justify-center h-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Program Tukar Poin
        </h1>
        <p className="text-lg sm:text-xl max-w-lg">
          Dapatkan hadiah menarik dari hasil pengolahan minyak jelantah!
        </p>
      </div>
    </div>
  );
}
