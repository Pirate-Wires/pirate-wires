import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';

interface CheckboxState {
  podcasts: boolean;
  wires: boolean;
  whitePill: boolean;
  industry: boolean;
  offers: boolean;
}

const Notifications: React.FC = () => {
  const initialCheckboxState: CheckboxState = {
    podcasts: false,
    wires: false,
    whitePill: false,
    industry: false,
    offers: false,
  };

  const [allInChecked, setAllInChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>(initialCheckboxState);
  const [prevCheckboxState, setPrevCheckboxState] = useState<CheckboxState>({});
  const [saving, setSaving] = useState(false);

  const handleAllInToggle = () => {
    setAllInChecked(!allInChecked);
    if (!allInChecked) {
      setPrevCheckboxState({ ...checkboxes });
      setCheckboxes({
        podcasts: true,
        wires: true,
        whitePill: true,
        industry: true,
        offers: true,
      });
    } else {
      setCheckboxes({ ...prevCheckboxState });
      setPrevCheckboxState({});
    }
  };

  const handleCheckboxToggle = (checkboxName: keyof CheckboxState) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  useEffect(() => {
    if (allInChecked) {
      const allChecked = Object.values(checkboxes).every((isChecked) => isChecked);
      if (!allChecked) {
        setAllInChecked(false);
      }
    }
  }, [checkboxes]);

  const handleSave = () => {
    // Simulate save action
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-4 border-l border-gray-800 pl-4">
      <div className="space-y-8">
        <h2 className="text-base podcast">Newsletter Preferences</h2>
      </div>

      <fieldset className="space-y-4">
        <legend className="sr-only">Notifications</legend>

        <div className="relative flex items-start">
          {/* All-in! Checkbox */}
          <div className="flex h-6 items-center">
            <input
              id="all-in"
              name="all-in"
              type="checkbox"
              className="h-6 w-6 rounded border-gray-300 text-blue-500 focus:ring-blue-600"
              checked={allInChecked}
              onChange={handleAllInToggle}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="all-in" className="font-medium podcast">
              All-in!
            </label>
          </div>
        </div>

        {/* Individual Checkboxes */}
        {Object.entries(checkboxes).map(([checkboxName, isChecked]) => (
          <div className="space-y-5" key={checkboxName}>
            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={checkboxName}
                  name={checkboxName}
                  type="checkbox"
                  className="h-6 w-6 rounded border-gray-300 text-blue-500 focus:ring-blue-600"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle(checkboxName as keyof CheckboxState)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={checkboxName} className="font-medium podcast">
                  {checkboxName}
                </label>
              </div>
            </div>
          </div>
        ))}

        {/* Save Button */}
        <div className="mt-5">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            disabled={saving}
          >
            {saving ? (
              <SpeakerWaveIcon className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <>
                <SpeakerWaveIcon className="h-5 w-5 mr-2" />
                Save
              </>
            )}
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default Notifications;
