import React from 'react';

const Notifications: React.FC = () => {
  return (
    <div>
      {/* Notifications content */}
      {/* Add your Notifications content here */}
      <div className='space-y-8'>
        <h1 className="text-base text-gray-900">Notifications</h1>
        <h2 className="text-base text-gray-900">Newsletter Preferences</h2>
      </div>
      <fieldset>
        <legend className="sr-only">Notifications</legend>
        <div className="space-y-5">
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="ml-3 text-sm ">
              <label htmlFor="comments" className="font-medium text-gray-900">
                Wires
              </label>
              <p id="comments-description" className="text-gray-500">
                Get notified when x, y, and z.
              </p>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="candidates"
                aria-describedby="candidates-description"
                name="candidates"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="ml-3 text-sm ">
              <label htmlFor="candidates" className="font-medium text-gray-900">
                All-in!
              </label>
              <p id="candidates-description" className="text-gray-500">
                I want all the mails.
              </p>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="offers"
                aria-describedby="offers-description"
                name="offers"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="ml-3 text-sm ">
              <label htmlFor="offers" className="font-medium text-gray-900">
                Offers
              </label>
              <p id="offers-description" className="text-gray-500">
                Get notified of any promotions.
              </p>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Notifications;
