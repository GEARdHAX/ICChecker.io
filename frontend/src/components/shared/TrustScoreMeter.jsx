import { Knob } from 'primereact/knob';
import { useState, useEffect } from 'react';

const TrustScoreMeter = ({ value }) => {
  const [knobColor, setKnobColor] = useState('#EF4444'); // Default red

  useEffect(() => {
    if (value >= 80) {
      setKnobColor('#22C55E'); // Green
    } else if (value >= 50) {
      setKnobColor('#FACC15'); // Yellow
    } else {
      setKnobColor('#EF4444'); // Red
    }
  }, [value]);

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">Supplier Trust Score</h3>
      <Knob
        value={value}
        readOnly
        size={150}
        valueColor={knobColor}
        rangeColor="#d1d5db" // gray-300
        textColor={knobColor}
        strokeWidth={12}
        valueTemplate={"{value}%"}
      />
    </div>
  );
};

export default TrustScoreMeter;