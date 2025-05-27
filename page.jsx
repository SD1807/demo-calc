
import "./globals.css";
import Calculator from "./SalaryCalculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Salary Calculator</h1>
        <Calculator />
      </div>
    </main>
  );
}
