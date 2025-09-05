'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiCalendar, FiClock, FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi';

interface CalculatorData {
  businessType: string;
  monthlyAppointments: number;
  averageServicePrice: number;
  currentNoShowRate: number;
  hoursSpentOnPhone: number;
  hourlyRate: number;
}

const ROICalculator = () => {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<CalculatorData>({
    businessType: 'barbershop',
    monthlyAppointments: 200,
    averageServicePrice: 30,
    currentNoShowRate: 20,
    hoursSpentOnPhone: 10,
    hourlyRate: 25
  });

  const [results, setResults] = useState({
    monthlyRevenueLoss: 0,
    timeSavings: 0,
    totalMonthlySavings: 0,
    annualSavings: 0,
    roiMonths: 0,
    investmentCost: 2500 // Costo stimato implementazione
  });

  // Fix hydration issue
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Business type options
  const businessTypes = [
    { value: 'barbershop', label: 'Barbershop', icon: '✂️' },
    { value: 'beauty', label: 'Centro Estetico', icon: '💄' },
    { value: 'restaurant', label: 'Ristorante', icon: '🍽️' },
    { value: 'dentist', label: 'Studio Dentistico', icon: '🦷' },
    { value: 'fitness', label: 'Palestra', icon: '💪' },
    { value: 'other', label: 'Altro', icon: '🏢' }
  ];

  // Calculate ROI in real-time
  useEffect(() => {
    const calculations = {
      // Revenue loss from no-shows
      monthlyRevenueLoss: (data.monthlyAppointments * data.currentNoShowRate / 100) * data.averageServicePrice,

      // Time savings (phone management)
      timeSavings: data.hoursSpentOnPhone * data.hourlyRate,

      // Total monthly savings
      totalMonthlySavings: 0,
      annualSavings: 0,
      roiMonths: 0,
      investmentCost: results.investmentCost
    };

    // No-shows reduction (65% improvement)
    const noShowReduction = calculations.monthlyRevenueLoss * 0.65;

    // Additional revenue from 24/7 availability (estimated 15-25% increase)
    const additionalRevenue = (data.monthlyAppointments * data.averageServicePrice) * 0.20;

    calculations.totalMonthlySavings = noShowReduction + calculations.timeSavings + additionalRevenue;
    calculations.annualSavings = calculations.totalMonthlySavings * 12;
    calculations.roiMonths = results.investmentCost / calculations.totalMonthlySavings;

    setResults(calculations);
  }, [data, results.investmentCost]);

  const updateData = (field: keyof CalculatorData, value: string | number) => {
    setData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  // Safe number formatting function
  const formatNumber = (num: number): string => {
    if (!isClient) return Math.round(num).toString();
    return new Intl.NumberFormat('it-CH').format(Math.round(num));
  };

  const formatCurrency = (num: number): string => {
    if (!isClient) return `CHF ${Math.round(num)}`;
    return `CHF ${new Intl.NumberFormat('it-CH').format(Math.round(num))}`;
  };

  // Don't render calculations until client-side
  if (!isClient) {
    return (
      <section id="roi-calculator" className="py-20 bg-white dark:bg-dark-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block">
                <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded mx-auto mb-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Calcola il <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">Ritorno del Tuo Investimento</span>
                </h2>
              </div>
              <p className="text-dark-600 dark:text-light-400 text-lg">
                Scopri quanto potresti risparmiare e guadagnare con un sistema di prenotazioni automatico
              </p>
            </div>
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="roi-calculator" className="py-20 bg-white dark:bg-dark-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded mx-auto mb-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Calcola il <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">Ritorno del Tuo Investimento</span>
              </h2>
            </div>
            <p className="text-dark-600 dark:text-light-400 text-lg">
              Scopri quanto potresti risparmiare e guadagnare con un sistema di prenotazioni automatico
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-light-100 dark:bg-dark-700 rounded-xl p-6 border border-light-300 dark:border-dark-500">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FiUsers className="mr-2 text-primary-600" />
                I Tuoi Dati
              </h3>

              <div className="space-y-6">
                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium mb-3">Tipo di Attività</label>
                  <div className="grid grid-cols-2 gap-3">
                    {businessTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => updateData('businessType', type.value)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                          data.businessType === type.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                            : 'border-light-400 dark:border-dark-500 hover:border-primary-300 dark:hover:border-primary-600'
                        }`}
                      >
                        <div className="text-lg mb-1">{type.icon}</div>
                        <div className="font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Appointments */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Appuntamenti al mese
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
                    <input
                      type="number"
                      value={data.monthlyAppointments}
                      onChange={(e) => updateData('monthlyAppointments', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-light-400 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-600"
                      min="0"
                    />
                  </div>
                </div>

                {/* Average Service Price */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Prezzo medio servizio (CHF)
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
                    <input
                      type="number"
                      value={data.averageServicePrice}
                      onChange={(e) => updateData('averageServicePrice', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-light-400 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-600"
                      min="0"
                    />
                  </div>
                </div>

                {/* No-show Rate */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    % Clienti che non si presentano
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={data.currentNoShowRate}
                    onChange={(e) => updateData('currentNoShowRate', e.target.value)}
                    className="w-full h-2 bg-light-300 dark:bg-dark-500 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-dark-500 mt-1">
                    <span>0%</span>
                    <span className="font-medium text-primary-600">{data.currentNoShowRate}%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Time spent on phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ore/settimana al telefono per prenotazioni
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
                    <input
                      type="number"
                      value={data.hoursSpentOnPhone}
                      onChange={(e) => updateData('hoursSpentOnPhone', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-light-400 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-600"
                      min="0"
                      step="0.5"
                    />
                  </div>
                </div>

                {/* Hourly Rate */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Valore del tuo tempo (CHF/ora)
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
                    <input
                      type="number"
                      value={data.hourlyRate}
                      onChange={(e) => updateData('hourlyRate', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-light-400 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-600"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-700">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FiTrendingUp className="mr-2 text-primary-600" />
                I Tuoi Risultati
              </h3>

              <div className="space-y-6">
                {/* Monthly Revenue Recovery */}
                <div className="bg-white dark:bg-dark-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Ricavi recuperati (no-show)</h4>
                    <span className="text-2xl font-bold text-green-600">
                      +{formatCurrency(results.monthlyRevenueLoss * 0.65)}
                    </span>
                  </div>
                  <p className="text-sm text-dark-500 dark:text-light-400">
                    Riduzione 65% dei no-show mensili
                  </p>
                </div>

                {/* Time Savings */}
                <div className="bg-white dark:bg-dark-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Tempo risparmiato</h4>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.timeSavings * 4)}
                    </span>
                  </div>
                  <p className="text-sm text-dark-500 dark:text-light-400">
                    Niente più telefonate per prenotazioni
                  </p>
                </div>

                {/* Additional Revenue */}
                <div className="bg-white dark:bg-dark-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Ricavi aggiuntivi 24/7</h4>
                    <span className="text-2xl font-bold text-purple-600">
                      +{formatCurrency(data.monthlyAppointments * data.averageServicePrice * 0.20)}
                    </span>
                  </div>
                  <p className="text-sm text-dark-500 dark:text-light-400">
                    Prenotazioni sempre disponibili
                  </p>
                </div>

                {/* Total Monthly Savings */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-4 text-white">
                  <div className="text-center">
                    <h4 className="font-bold mb-1">Beneficio Mensile Totale</h4>
                    <div className="text-4xl font-bold mb-2">
                      {formatCurrency(results.totalMonthlySavings)}
                    </div>
                    <div className="text-sm opacity-80">
                      {formatCurrency(results.annualSavings)} all'anno
                    </div>
                  </div>
                </div>

                {/* ROI Timeline */}
                <div className="bg-white dark:bg-dark-600 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Ritorno dell'Investimento</h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm">Investimento iniziale</span>
                    <span className="font-bold">{formatCurrency(results.investmentCost)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm">Tempo per ROI completo</span>
                    <span className="font-bold text-primary-600">
                      {Math.ceil(results.roiMonths)} mesi
                    </span>
                  </div>
                  <div className="w-full bg-light-300 dark:bg-dark-500 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((12 / Math.max(results.roiMonths, 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-dark-500 dark:text-light-400 mt-2">
                    Dopo {Math.ceil(results.roiMonths)} mesi, tutto è puro guadagno!
                  </p>
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-accent-500 to-primary-500 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-lg"
                >
                  <span>Iniziamo il Tuo Progetto</span>
                  <FiArrowRight className="ml-2" />
                </motion.button>

                <p className="text-xs text-center text-dark-500 dark:text-light-400">
                  * Calcoli basati su dati reali di implementazioni esistenti
                </p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            <div className="p-4">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 mb-2">65%</div>
              <p className="text-sm text-dark-600 dark:text-light-400">Riduzione media no-show</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 mb-2">3-6 mesi</div>
              <p className="text-sm text-dark-600 dark:text-light-400">ROI medio progetti</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 mb-2">24/7</div>
              <p className="text-sm text-dark-600 dark:text-light-400">Sistema sempre attivo</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
