'use client';

import React, { useState } from 'react';
import ToggleSwitch from './index';

export const ToggleSwitchExamples: React.FC = () => {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(false);
  const [switch4, setSwitch4] = useState(true);

  return (
    <div className='p-6 space-y-6'>
      <h2 className='text-xl font-bold mb-4'>Toggle Switch Examples</h2>

      <div className='space-y-4'>
        {/* Basic toggle without label */}
        <div className='p-4 border rounded-lg'>
          <h3 className='text-lg font-medium mb-2'>Basic Toggle</h3>
          <ToggleSwitch checked={switch1} onChange={setSwitch1} />
        </div>

        {/* Toggle with left label (default) */}
        <div className='p-4 border rounded-lg'>
          <h3 className='text-lg font-medium mb-2'>Toggle with Left Label</h3>
          <ToggleSwitch
            id='leftLabelToggle'
            checked={switch2}
            onChange={setSwitch2}
            label='Notifications'
          />
        </div>

        {/* Toggle with right label */}
        <div className='p-4 border rounded-lg'>
          <h3 className='text-lg font-medium mb-2'>Toggle with Right Label</h3>
          <ToggleSwitch
            id='rightLabelToggle'
            checked={switch3}
            onChange={setSwitch3}
            label='Dark Mode'
            labelPosition='right'
          />
        </div>

        {/* Toggle with custom colors */}
        <div className='p-4 border rounded-lg'>
          <h3 className='text-lg font-medium mb-2'>Custom Colors</h3>
          <ToggleSwitch
            id='customColorToggle'
            checked={switch4}
            onChange={setSwitch4}
            label='Premium Features'
            activeColor='bg-purple-500'
            inactiveColor='bg-gray-400'
          />
        </div>

        {/* Toggle with React node as label */}
        <div className='p-4 border rounded-lg'>
          <h3 className='text-lg font-medium mb-2'>Complex Label</h3>
          <ToggleSwitch
            id='complexLabelToggle'
            checked={switch1}
            onChange={setSwitch1}
            label={
              <div className='flex items-center gap-2'>
                <span className='text-yellow-500'>⚑</span>
                <span>Booking Verified</span>
              </div>
            }
          />
        </div>
      </div>

      {/* Form integration example */}
      <div className='p-4 border rounded-lg'>
        <h3 className='text-lg font-medium mb-2'>Form Integration</h3>
        <form className='space-y-4'>
          <div>
            <ToggleSwitch
              id='newsletter'
              checked={switch2}
              onChange={setSwitch2}
              label='Subscribe to newsletter'
            />
          </div>
          <div>
            <ToggleSwitch
              id='marketing'
              checked={switch3}
              onChange={setSwitch3}
              label='Receive marketing emails'
            />
          </div>
          <button
            type='button'
            className='px-4 py-2 bg-primary_1 text-white rounded-lg'
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default ToggleSwitchExamples;
