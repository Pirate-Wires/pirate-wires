import {useState, useEffect} from "react";

type CheckboxState = {
  podcasts: boolean;
  wires: boolean;
  whitePill: boolean;
  industry: boolean;
  offers: boolean;
};

const initialCheckboxState: CheckboxState = {
  podcasts: false,
  wires: false,
  whitePill: false,
  industry: false,
  offers: false,
};

export default function Notifications() {
  const [allInChecked, setAllInChecked] = useState(false);
  const [checkboxes, setCheckboxes] =
    useState<CheckboxState>(initialCheckboxState);
  const [prevCheckboxState, setPrevCheckboxState] =
    useState<CheckboxState | null>(null);
  const [saving, setSaving] = useState(false);

  const handleAllInToggle = () => {
    setAllInChecked(!allInChecked);

    if (!allInChecked) {
      setPrevCheckboxState({...checkboxes});
      setCheckboxes({
        podcasts: true,
        wires: true,
        whitePill: true,
        industry: true,
        offers: true,
      });
    } else {
      setCheckboxes(prevCheckboxState || initialCheckboxState);
      setPrevCheckboxState(null);
    }
  };

  const handleCheckboxToggle = (checkboxName: keyof CheckboxState) => {
    setCheckboxes(prevCheckboxes => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  useEffect(() => {
    if (allInChecked) {
      const allChecked = Object.values(checkboxes).every(
        isChecked => isChecked,
      );
      if (!allChecked) {
        setAllInChecked(false);
      }
    }
  }, [allInChecked, checkboxes]);

  return (
    <div>
      <h1>Notifications</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={allInChecked}
            onChange={handleAllInToggle}
          />
          All In
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checkboxes.podcasts}
            onChange={() => handleCheckboxToggle("podcasts")}
          />
          Podcasts
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checkboxes.wires}
            onChange={() => handleCheckboxToggle("wires")}
          />
          Wires
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checkboxes.whitePill}
            onChange={() => handleCheckboxToggle("whitePill")}
          />
          White Pill
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checkboxes.industry}
            onChange={() => handleCheckboxToggle("industry")}
          />
          Industry
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checkboxes.offers}
            onChange={() => handleCheckboxToggle("offers")}
          />
          Offers
        </label>
      </div>
      <button disabled={saving}>Save</button>
    </div>
  );
}
