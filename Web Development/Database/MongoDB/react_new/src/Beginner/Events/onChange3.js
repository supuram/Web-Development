import React, { useState } from 'react';

export default function OnChange3() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Check me!
      </label>
      <p>{isChecked ? 'Checked' : 'Unchecked'}</p>
    </div>
  );
}