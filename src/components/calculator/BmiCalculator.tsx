import { useEffect, useRef, useState } from "react";
import "./BmiCalculator.css";

interface CategoriesDeg {
  [key: string]: {
    deg: number;
    name: string;
  };
}

const categoriesDeg: CategoriesDeg = {
  underweight: { deg: 15, name: "Underweight" },
  normal: { deg: 50, name: "Normal" },
  overWeight: { deg: 90, name: "Overweight" },
  obese: { deg: 125, name: "Obese" },
  extraObese: { deg: 165, name: "Extra Obese" },
};

const BmiCalculator = () => {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [bmi, setBmi] = useState<number | null>(null);
  const arrowRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

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
    let category = "";
    if (bmi === null) category = "";
    else if (bmi < 18.5) category = "underweight";
    else if (bmi >= 18.5 && bmi < 24.9) category = "normal";
    else if (bmi >= 25 && bmi < 29.9) category = "overWeight";
    else if (bmi >= 30 && bmi < 34.9) category = "obese";
    else category = "extraObese";
    // arrowRef.current.style.transform = `rotate(${categoriesDeg[category].deg}deg)`;
    // return categoriesDeg[category].name;
    if (arrowRef.current) {
      arrowRef.current.style.transform = `rotate(${categoriesDeg[category].deg}deg)`;
    }

    return categoriesDeg[category].name;
  };

  return (
    <div className="container">
      <h1>BMI Calculator</h1>
      <div className="meter-image">
        <img
          ref={arrowRef}
          className="arrow-meter"
          src="/arrow.svg"
          alt="arrow"
          width="140px"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ZOaEs3jxZvyO0P3hqP_SMuVbDnyJ53TVCg&usqp=CAU"
          alt="bmi-img"
          className="bmi-image"
        />
      </div>

      <div>
        <label>
          Weight (kg)
          <input
            type="number"
            className="input-field"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Height (cm)
          <input
            type="number"
            className="input-field"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <button className="calculate-button" onClick={calculateBMI}>
        Calculate BMI
      </button>
      {bmi !== null && (
        <div className="result">
          <h2>Your BMI: {bmi.toFixed(2)}</h2>
          <p>Category: {getBmiCategory()}</p>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
