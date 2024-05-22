import React from 'react'


import { useState, useCallback ,useEffect } from 'react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [options, setOptions] = useState({

    useNumbers: false,
    useSymbols: false
  });
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(() => {
    let charset = 'ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqurstuvwxyz';

    if (options.useNumbers) charset += '0123456789';
    if (options.useSymbols) charset += '!@#$%^&*()-_+=<>?';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    return newPassword;

  }, [length, options]);

  const handleGeneratePassword = useCallback(() => {
    setPassword(generatePassword());
  }, [generatePassword]);


  const handleToggleOption = useCallback(option => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [option]: !prevOptions[option]
    }));
    setPassword(generatePassword()); // Update password whenever options change
  }, [generatePassword]);

useEffect(()=>{
setPassword(generatePassword())
},[length,options])

  const optionLabels = [
    { key: 'useUppercase9', label: 'Uppercase' },
    { key: 'useLowercase', label: 'Lowercase' },
    { key: 'useNumbers7', label: 'Numbers' },
    { key: 'useSymbols', label: 'Symbols' }
  ];

  return (
    <div>
      <label>
        Length:
        <input type="range" min="4" max="20" value={length} onChange={(e) => setLength(parseInt(e.target.value))} />
        {length}
      </label>
      <br />
      {optionLabels.map(option => (
        <label key={option.key}>
          {option.label}:
          <input type="checkbox" checked={options[option]} onChange={() => handleToggleOption(option.key)} />
        </label>
      ))}
      <br />
      <button onClick={handleGeneratePassword}>Generate Password</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <label>
        Password:
        <input type="text" value={password} readOnly />
      </label>
    </div>
  );
};

export default PasswordGenerator;
