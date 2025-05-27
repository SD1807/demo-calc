'use client';
import React, { useState } from 'react';

export default function SalaryCalculator() {
  const [language, setLanguage] = useState('en');

  const text = {
    en: {
      title: 'FS CALCIVAL Field Officer Salary Calculator',
      selectModel: 'Select Job Type',
      avgHours: 'Average Hours Worked Per Day',
      workingDays: 'Working Days in Month',
      leavesTaken: 'Leave(s) Taken (Auto-calculated)',
      totalHours: 'Total Hours Worked (Per Month)',
      extraHours: 'Extra Hours (Above Threshold)',
      totalSales: 'Total Sales (in litres)',
      targetSales: 'Decided Target (in litres)',
      km: 'Distance Travelled Per Month (in KM)',
      totalSalary: 'Total Salary',
      totalEarnings: 'Total Earnings',
      allowances: 'Allowances',
      deductions: 'Deductions',
      performance: 'Cost Per Litre',
      performanceScore: 'Performance Score',
      suggestion: 'To avoid penalty, sell',
      litresMore: 'more litres.',
      slabInfo: 'Salary Slab Information',
      modelDescriptions: {
        'Full Time': 'Full Time (26 days, 9 hrs/day)',
        'Part Time': 'Part Time (26 days, 4 hrs/day)',
        'Dual Job': 'Dual Job'
      }
    },
    gu: {
      title: 'એફએસ કેલ્કિવાલ ક્ષેત્ર અધિકારી પગાર કેલ્ક્યુલેટર',
      selectModel: 'નોકરીનો પ્રકાર પસંદ કરો',
      avgHours: 'દિવસદીઠ સરેરાશ કામના કલાક',
      workingDays: 'મહિનામાં કામના દિવસો',
      leavesTaken: 'છુટીઓ લેવામાં આવી (આપમેળે ગણાય છે)',
      totalHours: 'કુલ કામના કલાકો (પ્રતિ મહિનો)',
      extraHours: 'વધારાના કલાકો (મર્યાદાથી ઉપર)',
      totalSales: 'કુલ વેચાણ (લિટરમાં)',
      targetSales: 'નક્કી કરેલ લક્ષ્યાંક (લિટરમાં)',
      km: 'પ્રતિ મહિનો ચાલેલું અંતર (કિમીમાં)',
      totalSalary: 'કુલ પગાર',
      totalEarnings: 'કુલ કમાણી',
      allowances: 'ભથ્થાં',
      deductions: 'કાપણીઓ',
      performance: 'લિટર પ્રતિ કિંમત',
      performanceScore: 'પ્રદર્શન સ્કોર',
      suggestion: 'દંડ ટાળવા માટે વેચો',
      litresMore: 'વધુ લિટર.',
      slabInfo: 'પગાર સ્લેબ માહિતી',
      modelDescriptions: {
        'Full Time': 'ફુલ ટાઈમ (26 દિવસો, 9 કલાક/દિવસ)',
        'Part Time': 'પાર્ટ ટાઈમ (26 દિવસો, 4 કલાક/દિવસ)',
        'Dual Job': 'ડ્યુઅલ જોબ'
      }
    },
    mr: {
      title: 'FS CALCIVAL क्षेत्र अधिकारी वेतन कॅल्क्युलेटर',
      selectModel: 'नोकरीचा प्रकार निवडा',
      avgHours: 'दररोज सरासरी कामाचे तास',
      workingDays: 'महिन्यातील कामाचे दिवस',
      leavesTaken: 'सुट्टी घेतली (आपोआप मोजली जाते)',
      totalHours: 'एकूण कामाचे तास (महिन्याला)',
      extraHours: 'अतिरिक्त तास (मर्यादेपेक्षा जास्त)',
      totalSales: 'एकूण विक्री (लिटरमध्ये)',
      targetSales: 'निर्धारित लक्ष्य (लिटरमध्ये)',
      km: 'महिन्याला प्रवास केलेले अंतर (किमीमध्ये)',
      totalSalary: 'एकूण वेतन',
      totalEarnings: 'एकूण कमाई',
      allowances: 'भत्ते',
      deductions: 'कपात',
      performance: 'लिटरमागील खर्च',
      performanceScore: 'कामगिरी गुण',
      suggestion: 'दंड टाळण्यासाठी विक्री करा',
      litresMore: 'लिटर अधिक.',
      slabInfo: 'वेतन स्लॅब माहिती',
      modelDescriptions: {
        'Full Time': 'पूर्ण वेळ (26 दिवस, 9 तास/दिवस)',
        'Part Time': 'अर्धवेळ (26 दिवस, 4 तास/दिवस)',
        'Dual Job': 'दुहेरी नोकरी'
      }
    }
  };

  const [model, setModel] = useState('Full Time');
  const [avgHoursWorked, setAvgHoursWorked] = useState(0);
  const [workingDays, setWorkingDays] = useState(26);
  const [sales, setSales] = useState(0);
  const [target, setTarget] = useState(0);
  const [km, setKm] = useState(0);

  const expectedHours = model === 'Full Time' ? 9 : model === 'Part Time' ? 4 : 0;
  const totalHours = avgHoursWorked * workingDays;
  const extraHours = Math.max(0, totalHours - expectedHours * workingDays);
  const extraHoursPay = extraHours * 40;
  const minHoursRequired = model === 'Full Time' ? 234 : model === 'Part Time' ? 104 : 0;
  const shortHourPenalty = totalHours < minHoursRequired ? (minHoursRequired - totalHours) * 40 : 0;

  const isOverTarget = sales >= target;
  const shortfall = Math.max(0, target - sales);

  const baseSalary = (model === 'Full Time' && avgHoursWorked >= 0)
    ? 9500
    : (model === 'Part Time' && avgHoursWorked >= 0)
    ? 4200
    : 0;

  const incentive = model === 'Dual Job'
    ? sales * 10
    : isOverTarget ? (sales - target) * 5 : 0;

  const penalty = model === 'Dual Job' ? 0 : !isOverTarget ? (shortfall * 5) : 0;

  const penaltySlab = () => {
    if (model === 'Dual Job' || target === 0) return 0;
    const achievedPercent = (sales / target) * 100;
    const slabs = model === 'Full Time'
      ? [[10, 15, 3500], [15, 20, 3000], [20, 25, 2500], [25, 30, 2000], [30, 35, 1500], [35, 40, 1000], [40, 45, 500], [45, 50, 0]]
      : [[10, 15, 1300], [15, 20, 1100], [20, 25, 900], [25, 30, 700], [30, 35, 500], [35, 40, 300], [40, 45, 100], [45, 50, 0]];
    const found = slabs.find(([min, max]) => achievedPercent >= min && achievedPercent < max);
    return found ? found[2] : achievedPercent < 10 ? (model === 'Full Time' ? 4000 : 1500) : 0;
  };

  const fuelAllowance = model !== 'Dual Job' ? km * 3 : 0;
  const internetAllowance = model === 'Full Time' ? 100 : model === 'Part Time' ? 50 : 0;
  const foodAllowance = (model === 'Full Time' ? avgHoursWorked >= 9 : model === 'Part Time' ? avgHoursWorked >= 4 : false)
    ? (model === 'Full Time' ? 250 : model === 'Part Time' ? 100 : 0) * workingDays : 0;
  const securityDeposit = model !== 'Dual Job' ? 1000 : 0;

  const leaves = Math.max(0, 26 - workingDays);
  const leaveDeduction = model === 'Full Time'
    ? leaves * 360
    : model === 'Part Time'
    ? leaves * 160
    : 0;

  const totalEarnings = baseSalary + extraHoursPay + incentive;
  const totalAllowances = fuelAllowance + internetAllowance + foodAllowance;
  const totalDeductions = penalty + penaltySlab() + securityDeposit + shortHourPenalty + leaveDeduction;
  const totalSalary = totalEarnings + totalAllowances - totalDeductions;

  const costPerLitre = sales > 0 ? totalSalary / sales : 0;
  const performanceScore = Math.max(0, Math.min(100, 100 - costPerLitre));

  const getCostColor = () => {
    return performanceScore >= 93 ? 'bg-green-500'
         : performanceScore >= 88 ? 'bg-yellow-400'
         : 'bg-red-500';
  };

  const litresToAvoidPenalty = target > sales ? target - sales : 0;

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
            <option value="Full Time">{text[language].modelDescriptions['Full Time']}</option>
            <option value="Part Time">{text[language].modelDescriptions['Part Time']}</option>
            <option value="Dual Job">{text[language].modelDescriptions['Dual Job']}</option>
          </select>
        </label>

        <label className="block">
          <span className="font-medium">{text[language].targetSales}</span>
          <input type="number" className="border p-2 w-full mt-1" value={target} onChange={e => setTarget(Number(e.target.value))} />
        </label>

        <label className="block">
          <span className="font-medium">{text[language].avgHours}</span>
          <input type="number" className="border p-2 w-full mt-1" value={avgHoursWorked} onChange={e => setAvgHoursWorked(Number(e.target.value))} />
        </label>

        <label className="block">
          <span className="font-medium">{text[language].workingDays}</span>
          <input type="number" className="border p-2 w-full mt-1" value={workingDays} onChange={e => setWorkingDays(Number(e.target.value))} />
        </label>

        <p className="text-sm text-gray-600">{text[language].leavesTaken}: {leaves}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">{text[language].totalHours}:</p>
            <p>{totalHours} hrs</p>
          </div>
          <div>
            <p className="font-medium">{text[language].extraHours}:</p>
            <p className={`font-semibold ${extraHours > 0 ? 'text-green-600' : ''}`}>{extraHours} hrs</p>
          </div>
        </div>

        <label className="block">
          <span className="font-medium">{text[language].totalSales}</span>
          <input type="number" className="border p-2 w-full mt-1" value={sales} onChange={e => setSales(Number(e.target.value))} />
        </label>

        {litresToAvoidPenalty > 0 && (
          <p className="text-sm text-orange-600">
            {text[language].suggestion} <strong>{litresToAvoidPenalty}</strong> {text[language].litresMore}
          </p>
        )}

        {isOverTarget && model !== 'Dual Job' && (
          <p className="text-sm text-green-600">
            🎉 You exceeded your target by <strong>{sales - target} litres</strong> and earned an incentive of ₹<strong>{incentive}</strong>!
          </p>
        )}

        <label className="block">
          <span className="font-medium">{text[language].km}</span>
          <input type="number" className="border p-2 w-full mt-1" value={km} onChange={e => setKm(Number(e.target.value))} />
        </label>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <p><strong>{text[language].totalSalary}:</strong> ₹{totalSalary}</p>
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
        <p><strong>{text[language].deductions}:</strong> ₹{totalDeductions}</p>
        <ul className="ml-4 list-disc text-sm">
          <li>Sales Shortfall Penalty: ₹{penalty}</li>
          <li>Slab Penalty: ₹{penaltySlab()}</li>
          <li>Short Hours Penalty: ₹{shortHourPenalty}</li>
          <li>Leave(s) Taken: {leaves} day(s), Deduction: ₹{leaveDeduction}</li>
          <li>Security Deposit: ₹{securityDeposit}</li>
        </ul>

        <p className="mt-4"><strong>{text[language].performance}:</strong> {costPerLitre.toFixed(2)} ₹/ltr</p>

        <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
          <div className={`h-4 rounded-full ${getCostColor()}`} style={{ width: `${performanceScore}%` }}></div>
        </div>

        <p className={`mt-2 font-bold`}>{text[language].performanceScore}: {performanceScore.toFixed(2)}</p>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-2">
        <p><strong>{text[language].slabInfo}:</strong> 
          {model === 'Full Time'
            ? ' ₹9500 base, 234 hrs min, ₹360/day leave penalty.'
            : model === 'Part Time'
            ? ' ₹4200 base, 104 hrs min, ₹160/day leave penalty.'
            : ' ₹10/ltr incentive only.'}
        </p>
      </div>
    </div>
  );
}
