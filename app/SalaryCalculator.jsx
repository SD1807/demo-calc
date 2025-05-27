// SalaryCalculator.jsx
'use client';
import React, { useState } from 'react';

export default function SalaryCalculator() {
  const [language, setLanguage] = useState('en');

  const text = {
    en: {
      title: 'FS CALCIVAL Field Officer Salary Calculator',
      selectModel: 'Select Model',
      avgHours: 'Average Hours Worked Per Day',
      workingDays: 'Working Days in Month',
      workedExpected: 'Worked Expected Hours',
      extraHours: 'Extra Hours per month',
      totalSales: 'Total Sales (in litres)',
      targetSales: 'Target Sales (in litres)',
      km: 'Distance Traveled (in KM)',
      totalSalary: 'Total Salary (Before Deductions)',
      inHand: 'Final In-Hand Salary',
      totalEarnings: 'Total Earnings',
      allowances: 'Allowances',
      penalties: 'Penalties',
      performance: 'Performance Score'
    },
    gu: {
      title: 'ફિલ્ડ ઓફિસરનો પગાર કેલ્ક્યુલેટર',
      selectModel: 'મોડેલ પસંદ કરો',
      avgHours: 'દરરોજના સરેરાશ કામના કલાકો',
      workingDays: 'મહિનાના કાર્ય દિવસો',
      workedExpected: 'આશિત કલાકો પૂરાં કર્યા',
      extraHours: 'વધારાના કલાકો per month',
      totalSales: 'કુલ વેચાણ (લિટરમાં)',
      targetSales: 'ટાર્ગેટ વેચાણ (લિટરમાં)',
      km: 'કુલ મુસાફરી (કિમીમાં)',
      totalSalary: 'કુલ પગાર (કપાત પહેલા)',
      inHand: 'હાથે મળતો પગાર',
      totalEarnings: 'કુલ કમાણી',
      allowances: 'ભથ્થાં',
      penalties: 'દંડ',
      performance: 'પ્રદર્શન સ્કોર'
    },
    mr: {
      title: 'फील्ड ऑफिसर वेतन कॅल्क्युलेटर',
      selectModel: 'मॉडेल निवडा',
      avgHours: 'सरासरी कामाचे तास दररोज',
      workingDays: 'महिन्यातील कामाचे दिवस',
      workedExpected: 'अपेक्षित तास काम केले',
      extraHours: 'अतिरिक्त तास per month',
      totalSales: 'एकूण विक्री (लिटरमध्ये)',
      targetSales: 'लक्ष विक्री (लिटरमध्ये)',
      km: 'प्रवास केलेले अंतर (किमी)',
      totalSalary: 'एकूण पगार (वजा केल्यावर)',
      inHand: 'हातातील पगार',
      totalEarnings: 'एकूण कमाई',
      allowances: 'भत्ते',
      penalties: 'दंड',
      performance: 'प्रदर्शन गुण'
    }
  };

  const [model, setModel] = useState('Full Time');
  const [avgHoursWorked, setAvgHoursWorked] = useState(0);
  const [workingDays, setWorkingDays] = useState(26);
  const [extraHours, setExtraHours] = useState(0);
  const [sales, setSales] = useState(0);
  const [target, setTarget] = useState(0);
  const [km, setKm] = useState(0);

  const getExpectedHours = () => (model === 'Full Time' ? 9 : model === 'Part Time' ? 4 : 0);

  const isOverTarget = sales >= target;
  const shortfall = Math.max(0, target - sales);
  const extraHoursPay = extraHours * 40;

  const baseSalary =
    model === 'Full Time'
      ? avgHoursWorked >= 9 ? 9500 : 0
      : model === 'Part Time'
      ? avgHoursWorked >= 4 ? 4200 : 0
      : 0;

  const incentive =
    model === 'Dual Job' ? sales * 10 : isOverTarget ? (sales - target) * 5 : 0;

  const penalty =
    model === 'Dual Job' ? 0 : !isOverTarget ? (shortfall * 5) : 0;

  const penaltySlab = () => {
    if (model === 'Dual Job' || target === 0) return 0;
    const achievedPercent = (sales / target) * 100;
    const slabs =
      model === 'Full Time'
        ? [
            [10, 15, 3500], [15, 20, 3000], [20, 25, 2500],
            [25, 30, 2000], [30, 35, 1500], [35, 40, 1000],
            [40, 45, 500], [45, 50, 0]
          ]
        : [
            [10, 15, 1300], [15, 20, 1100], [20, 25, 900],
            [25, 30, 700], [30, 35, 500], [35, 40, 300],
            [40, 45, 100], [45, 50, 0]
          ];
    const found = slabs.find(([min, max]) => achievedPercent >= min && achievedPercent < max);
    return found ? found[2] : achievedPercent < 10 ? (model === 'Full Time' ? 4000 : 1500) : 0;
  };

  const fuelAllowance = model !== 'Dual Job' ? km * 3 : 0;
  const internetAllowance = model === 'Full Time' ? 100 : model === 'Part Time' ? 50 : 0;
  const foodAllowance = (model === 'Full Time' ? avgHoursWorked >= 9 : model === 'Part Time' ? avgHoursWorked >= 4 : false)
    ? (model === 'Full Time' ? 250 : model === 'Part Time' ? 100 : 0) * workingDays : 0;
  const securityDeposit = model !== 'Dual Job' ? 1000 : 0;

  const totalEarnings = baseSalary + extraHoursPay + incentive;
  const totalAllowances = fuelAllowance + internetAllowance + foodAllowance;
  const totalPenalties = penalty + penaltySlab() + securityDeposit;
  const finalSalary = baseSalary + extraHoursPay - penalty - penaltySlab() - securityDeposit;
  const inHandSalary = totalEarnings - totalPenalties;
  const totalSalary = inHandSalary + totalAllowances;
  const cac = sales > 0 ? (totalEarnings + totalAllowances + totalPenalties) / sales : 0;

  const getCACColor = () => (cac <= 7 ? 'text-green-600' : cac <= 10 ? 'text-yellow-500' : 'text-red-600');

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold">{text[language].title}</h1>
        <select value={language} onChange={e => setLanguage(e.target.value)} className="border p-1">
          <option value="en">English</option>
          <option value="gu">ગુજરાતી</option>
          <option value="mr">मराठी</option>
        </select>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="font-medium">{text[language].selectModel}</span>
          <select value={model} onChange={e => setModel(e.target.value)} className="border p-2 w-full mt-1">
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Dual Job</option>
          </select>
        </label>

        <label className="block">
          <span className="font-medium">{text[language].avgHours}</span>
          <input type="number" className="border p-2 w-full mt-1" value={avgHoursWorked} onChange={e => setAvgHoursWorked(Number(e.target.value))} />
        </label>

        <label className="block">
          <span className="font-medium">{text[language].workingDays}</span>
          <input type="number" className="border p-2 w-full mt-1" value={workingDays} onChange={e => setWorkingDays(Number(e.target.value))} />
        </label>

        <label className="block">
          <span className="font-medium">{text[language].extraHours}</span>
          <input type="number" className="border p-2 w-full mt-1" value={extraHours} onChange={e => setExtraHours(Number(e.target.value))} />
        </label>

        <label className="block">
          <span className="font-medium">{text[language].totalSales}</span>
          <input type="number" className="border p-2 w-full mt-1" value={sales} onChange={e => setSales(Number(e.target.value))} />
        </label>

        <label className="block">
          <span className="font-medium">{text[language].targetSales}</span>
          <input type="number" className="border p-2 w-full mt-1" value={target} onChange={e => setTarget(Number(e.target.value))} />
        </label>

        <label className="block">
          <span className="font-medium">{text[language].km}</span>
          <input type="number" className="border p-2 w-full mt-1" value={km} onChange={e => setKm(Number(e.target.value))} />
        </label>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <p><strong>{text[language].totalSalary}:</strong> ₹{totalSalary}</p>
        <p><strong>{text[language].inHand}:</strong> ₹{inHandSalary}</p>
        <p><strong>{text[language].totalEarnings}:</strong> ₹{totalEarnings}</p>
        <ul className="ml-4 list-disc text-sm">
          <li>Base Salary: ₹{baseSalary}</li>
          <li>Extra Hours Pay: ₹{extraHoursPay}</li>
          <li>Incentives: ₹{incentive}</li>
        </ul>
        <p><strong>{text[language].allowances}:</strong> ₹{totalAllowances}</p>
        <ul className="ml-4 list-disc text-sm">
          <li>Fuel: ₹{fuelAllowance}</li>
          <li>Internet: ₹{internetAllowance}</li>
          <li>Food: ₹{foodAllowance}</li>
        </ul>
        <p><strong>{text[language].penalties}:</strong> ₹{totalPenalties}</p>
        <ul className="ml-4 list-disc text-sm">
          <li>Sales Shortfall Penalty: ₹{penalty}</li>
          <li>Slab Penalty (based on % achieved): ₹{penaltySlab()} {(() => {
            if (model === 'Dual Job' || target === 0) return '';
            const achievedPercent = (sales / target) * 100;
            const slabs =
              model === 'Full Time'
                ? [[0, 10], [10, 15], [15, 20], [20, 25], [25, 30], [30, 35], [35, 40], [40, 45], [45, 50]]
                : [[0, 10], [10, 15], [15, 20], [20, 25], [25, 30], [30, 35], [35, 40], [40, 45], [45, 50]];
            const found = slabs.find(([min, max]) => achievedPercent >= min && achievedPercent < max);
            return found ? `(Slab: ${found[0]}%-${found[1]}%)` : achievedPercent < 10 ? '(Slab: 0%-10%)' : '';
          })()}</li>
          <li>Security Deposit: ₹{securityDeposit}</li>
        </ul>
        <p className={`font-bold ${getCACColor()}`}>{text[language].performance}: {cac.toFixed(2)} Points</p>
      </div>
    </div>
  );
}
