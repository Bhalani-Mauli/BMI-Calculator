import { useState } from "react";
// import "./App.css";

const BmiCalculator = () => {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue);
    } else {
      setBmi(null);
    }
  };

  const getBmiCategory = (): string => {
    if (bmi === null) return "";

    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obesity";
  };

  return (
    <div>
      <h1>BMI Calculator</h1>
      <div>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi !== null && (
        <div>
          <h2>Your BMI: {bmi.toFixed(2)}</h2>
          <p>Category: {getBmiCategory()}</p>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
