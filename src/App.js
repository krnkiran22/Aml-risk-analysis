import React, { useState } from "react";
import "./App.css";

const App = () => {
  // States for customer risk analysis

  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [kycStatus, setKycStatus] = useState("");
  const [customerRiskScore, setCustomerRiskScore] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  // States for transaction analysis
  const [transactionVolume, setTransactionVolume] = useState("");
  const [transactionRiskScore, setTransactionRiskScore] = useState(null);

  // States for transaction behavioral analysis
  const [transactionBehavior, setTransactionBehavior] = useState("");
  const [behavioralRiskScore, setBehavioralRiskScore] = useState(null);

  // State for the aggregated result
  const [aggregateScore, setAggregateScore] = useState(null);

  // Data for scoring
  const countries = {
    Afghanistan: 80,
    Albania: 40,
    Algeria: 50,
    Andorra: 10,
    Angola: 70,
    Argentina: 45,
    Armenia: 35,
    Australia: 10,
    Austria: 15,
    Azerbaijan: 50,
    Bahrain: 20,
    Bangladesh: 55,
    Barbados: 10,
    Belarus: 60,
    Belgium: 20,
    Belize: 65,
    Benin: 50,
    Bhutan: 10,
    Bolivia: 70,
    Botswana: 40,
    Brazil: 80,
    Brunei: 10,
    Bulgaria: 50,
    "Burkina Faso": 60,
    Cambodia: 70,
    Cameroon: 65,
    Canada: 10,
    Chile: 30,
    China: 40,
    Colombia: 75,
    "Costa Rica": 40,
    Croatia: 30,
    Cuba: 50,
    Cyprus: 20,
    "Czech Republic": 20,
    Denmark: 5,
    Djibouti: 50,
    Dominica: 20,
    "Dominican Republic": 60,
    Ecuador: 55,
    Egypt: 50,
    "El Salvador": 85,
    Estonia: 10,
    Eswatini: 40,
    Ethiopia: 60,
    Fiji: 30,
    Finland: 5,
    France: 15,
    Gabon: 50,
    Gambia: 45,
    Georgia: 20,
    Germany: 15,
    Ghana: 50,
    Greece: 25,
    Grenada: 15,
    Guatemala: 75,
    Guinea: 65,
    Guyana: 55,
    Haiti: 80,
    Honduras: 90,
    Hungary: 30,
    Iceland: 5,
    India: 30,
    Indonesia: 40,
    Iran: 50,
    Iraq: 85,
    Ireland: 10,
    Israel: 20,
    Italy: 25,
    Jamaica: 75,
    Japan: 10,
    Jordan: 25,
    Kazakhstan: 45,
    Kenya: 60,
    "North Korea": 90,
    "South Korea": 10,
    Kuwait: 15,
    Kyrgyzstan: 50,
    Laos: 60,
    Latvia: 25,
    Lebanon: 70,
    Lesotho: 60,
    Liberia: 70,
    Libya: 85,
    Lithuania: 40,
    Luxembourg: 10,
    Madagascar: 60,
    Malawi: 55,
    Malaysia: 35,
    Maldives: 20,
    Mali: 65,
    Malta: 10,
    Mauritania: 60,
    Mauritius: 20,
    Mexico: 85,
    Moldova: 50,
    Monaco: 5,
    Mongolia: 40,
    Montenegro: 30,
    Morocco: 25,
    Mozambique: 60,
    Myanmar: 80,
    Namibia: 50,
    Nepal: 40,
    Netherlands: 15,
    "New Zealand": 10,
    Nicaragua: 65,
    Niger: 60,
    Nigeria: 85,
    Norway: 5,
    Oman: 15,
    Pakistan: 70,
    Panama: 40,
    Paraguay: 55,
    Peru: 55,
    Philippines: 60,
    Poland: 25,
    Portugal: 15,
    Qatar: 10,
    Romania: 30,
    Russia: 70,
    Rwanda: 20,
    "San Marino": 5,
    "Saudi Arabia": 20,
    Senegal: 50,
    Serbia: 40,
    Seychelles: 20,
    Singapore: 5,
    Slovakia: 25,
    Slovenia: 15,
    Somalia: 90,
    "South Africa": 80,
    Spain: 20,
    Sudan: 85,
    Suriname: 60,
    Sweden: 15,
    Switzerland: 5,
    Syria: 90,
    Taiwan: 10,
    Tajikistan: 50,
    Tanzania: 60,
    Thailand: 50,
    Togo: 55,
    Tonga: 20,
    Tunisia: 40,
    Turkey: 45,
    Turkmenistan: 50,
    Uganda: 65,
    Ukraine: 70,
    "United Arab Emirates": 10,
    "United Kingdom": 15,
    "United States": 20,
    Uruguay: 15,
    Uzbekistan: 50,
    Vanuatu: 20,
    Venezuela: 85,
    Vietnam: 40,
    Yemen: 90,
    Zambia: 50,
    Zimbabwe: 60,
  };


  const occupations = {
    "Politically Exposed": 80,
    "Gambling Industry": 70,
    "Healthcare Worker": 20,
    Engineer: 10,
    Teacher: 10,
    Entrepreneur: 30,
    Lawyer: 40,
    Banker: 50,
  };

  const kycScores = {
    "Fully Verified": 10,
    "Partially Verified": 50,
    "Not Verified": 80,
  };

  const transactionScores = {
    low: 10,
    medium: 50,
    high: 80,
  };

  const behaviorScores = {
    "Suspicious Past": 90,
    "Normal Past": 50,
    "Very Good Past": 10,
  };

  const handleCountrySearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSelectedCountry(query);
    if (query) {
      const filtered = Object.keys(countries).filter((country) =>
        country.toLowerCase().startsWith(query)
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };
  // Calculate Customer Risk Score
  const calculateCustomerRiskScore = () => {
    const countryScore = countries[selectedCountry] || 0;
    const occupationScore = occupations[selectedOccupation] || 0;
    const kycScore = kycScores[kycStatus] || 0;

    const totalRiskScore =
      0.4 * countryScore + 0.4 * occupationScore + 0.2 * kycScore;

    setCustomerRiskScore(totalRiskScore);
  };

  // Calculate Transaction Risk Score
  const calculateTransactionRiskScore = () => {
    const transactionVolumeValue = parseFloat(transactionVolume) || 0;
    let score = 0;

    if (transactionVolumeValue < 10000) score = transactionScores.low;
    else if (transactionVolumeValue <= 50000) score = transactionScores.medium;
    else score = transactionScores.high;

    setTransactionRiskScore(score);
  };

  // Calculate Behavioral Risk Score
  const calculateBehavioralRiskScore = () => {
    const behaviorScore = behaviorScores[transactionBehavior] || 0;
    setBehavioralRiskScore(behaviorScore);
  };

  // Aggregate Results
  const aggregateResults = () => {
    const scores = [
      customerRiskScore,
      transactionRiskScore,
      behavioralRiskScore,
    ].filter((score) => score !== null);

    if (scores.length === 3) {
      const avgScore = scores.reduce((sum, score) => sum + score, 0) / 3;
      setAggregateScore(avgScore);
    } else {
      alert("Please calculate all scores before aggregating.");
    }
  };

  // Generate Quote Based on Aggregate Score
  const getQuote = (score) => {
    if (score > 70) {
      return "This transaction is suspicious! You are under government surveillance.";
    } else if (score > 40) {
      return "You are being monitored for potential risk. Please proceed cautiously.";
    } else {
      return "Your activity looks clean and secure. Keep up the good work!";
    }
  };

  return (
    <div className="app-container">
      <h1>Risk Scoring Model</h1>
      <div className="analysis-container">
        {/* Customer Risk Analysis Section */}
        <div className="analysis-card">
          <h2>Customer Risk Analysis</h2>
          <p>Analyze customer risk based on country, occupation, and KYC status.</p>
          {/* <label>
            Country:
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select a Country</option>
              {Object.keys(countries).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label> */}
          <label>
          Country:
          <input
            type="text"
            value={selectedCountry}
            onChange={handleCountrySearch}
            placeholder="Search country"
          />
        </label>
        {filteredCountries.length > 0 && (
          <ul className="autocomplete-list">
            {filteredCountries.map((country) => (
              <li
                key={country}
                onClick={() => {
                  setSelectedCountry(country);
                  setFilteredCountries([]);
                }}
              >
                {country}
              </li>
            ))}
          </ul>
        )}
          <label>
            Occupation:
            <select
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
            >
              <option value="">Select an Occupation</option>
              {Object.keys(occupations).map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </label>
          <label>
            KYC Status:
            <select
              value={kycStatus}
              onChange={(e) => setKycStatus(e.target.value)}
            >
              <option value="">Select KYC Status</option>
              {Object.keys(kycScores).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <button onClick={calculateCustomerRiskScore}>
            Calculate Customer Risk Score
          </button>
          {customerRiskScore !== null && (
            <p>
              <strong>Customer Risk Score:</strong> {customerRiskScore.toFixed(2)}
            </p>
          )}
        </div>

        {/* Transaction Analysis */}
        <div className="analysis-card">
          <h2>Transaction Analysis</h2>
          <p>Analyze transaction volume and assess risk.</p>
          <label>
            Transaction Volume:
            <input
              type="number"
              value={transactionVolume}
              onChange={(e) => setTransactionVolume(e.target.value)}
            />
          </label>
          <button onClick={calculateTransactionRiskScore}>
            Calculate Transaction Risk Score
          </button>
          {transactionRiskScore !== null && (
            <p>
              <strong>Transaction Risk Score:</strong> {transactionRiskScore}
            </p>
          )}
        </div>

        {/* Transaction Behavioral Analysis */}
        <div className="analysis-card">
          <h2>Behavioral Analysis</h2>
          <p>Evaluate the transaction history behavior.</p>
          <label>
            Transaction Behavior:
            <select
              value={transactionBehavior}
              onChange={(e) => setTransactionBehavior(e.target.value)}
            >
              <option value="">Select Transaction Behavior</option>
              {Object.keys(behaviorScores).map((behavior) => (
                <option key={behavior} value={behavior}>
                  {behavior}
                </option>
              ))}
            </select>
          </label>
          <button onClick={calculateBehavioralRiskScore}>
            Calculate Behavioral Risk Score
          </button>
          {behavioralRiskScore !== null && (
            <p>
              <strong>Behavioral Risk Score:</strong> {behavioralRiskScore}
            </p>
          )}
        </div>
      </div>

      {/* Aggregate Results Section */}
      <div className="aggregate-container">
        <h2>Aggregate Results</h2>
        <button onClick={aggregateResults}>Aggregate Scores</button>
        {aggregateScore !== null && (
          <>
            <p>
              <strong>Aggregate Risk Score:</strong> {aggregateScore.toFixed(2)}
            </p>
            <p>
              <strong>Message:</strong> {getQuote(aggregateScore)}
            </p>
          </>
        )}
      </div>
      <p>This application performs a comprehensive risk analysis by evaluating a customer's risk profile, transaction behavior, and transaction volume. The Customer Risk Analysis assesses factors like the individual's country, occupation, and KYC verification status to calculate a risk score. The Transaction Analysis evaluates the transaction volume against predefined thresholds to determine its risk level. The Transaction Behavioral Analysis examines past transaction patterns, categorizing them as suspicious, normal, or very good, each assigned a corresponding score. Finally, all three analyses are aggregated into a single Aggregate Risk Score, providing a holistic view of the customer's risk level. The application also displays a contextual message or quote based on the aggregate score, offering insights into the user's risk status, such as whether their activity appears clean or if they are under potential surveillance.</p>
    </div>
  );
};

export default App;

