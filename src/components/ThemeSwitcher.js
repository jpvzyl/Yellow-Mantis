import React from 'react';

const themes = [
  {
    id: 'charcoal',
    name: 'Deep Charcoal',
    desc: 'Ultra dark, punchy yellow'
  },
  {
    id: 'slate',
    name: 'Warm Slate',
    desc: 'Rich warm grey, luxurious gold'
  },
  {
    id: 'midnight',
    name: 'Midnight Ember',
    desc: 'Blue-black, fiery amber'
  }
];

function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <div className="theme-switcher">
      <h4>Choose Theme</h4>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => onThemeChange(theme.id)}
          >
            <div className={`theme-swatch ${theme.id}`}></div>
            <div>
              <div className="theme-name">{theme.name}</div>
              <div className="theme-desc">{theme.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;


