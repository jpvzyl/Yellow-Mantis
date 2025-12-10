import React, { useState, useEffect } from 'react';
import MantisIcon from '../components/MantisIcon';
import './FundingRequirements.css';

const FundingRequirements = () => {
  // Valuations from IP_VALUATION_ANALYSIS.md
  const valuations = {
    yqa: { min: 15000000, max: 15000000, label: 'Y-QA Platform', stage: 'Rollout Q1 2026' },
    quantum: { min: 7500000, max: 12500000, label: 'Quantum Bridge', stage: 'Research/Alpha' },
    robotics: { min: 5000000, max: 7500000, label: 'Qyvella Robotics', stage: 'Final R&D' },
    accounting: { min: 2500000, max: 5000000, label: 'Y-Accounting (50%)', stage: 'Rollout Q1 2026' },
  };

  // Initial state for all projects
  const createEmptyProject = () => ({
    expenses: [
      { category: 'Personnel / Resources', items: [
        { name: 'Developer salaries', monthly: '', description: '' },
        { name: 'QA / Testing', monthly: '', description: '' },
        { name: 'Project management', monthly: '', description: '' },
      ]},
      { category: 'Infrastructure', items: [
        { name: 'Cloud hosting', monthly: '', description: '' },
        { name: 'API costs (AI/Quantum)', monthly: '', description: '' },
        { name: 'Software licenses', monthly: '', description: '' },
      ]},
      { category: 'Hardware', items: [
        { name: 'Equipment', monthly: '', description: '' },
        { name: 'Components', monthly: '', description: '' },
      ]},
      { category: 'Other', items: [
        { name: 'Marketing', monthly: '', description: '' },
        { name: 'Miscellaneous', monthly: '', description: '' },
      ]},
    ],
    milestones: [
      { name: '', targetDate: '', fundingUnlocked: '' },
      { name: '', targetDate: '', fundingUnlocked: '' },
      { name: '', targetDate: '', fundingUnlocked: '' },
    ]
  });

  const createRoboticsProject = () => ({
    expenses: [
      { category: 'Personnel / Resources', items: [
        { name: 'Robotics engineer', monthly: '', description: '' },
        { name: 'AI/ML developer', monthly: '', description: '' },
        { name: 'Other personnel', monthly: '', description: '' },
      ]},
      { category: 'Hardware Costs', items: [
        { name: 'Servo motors & actuators', monthly: '', description: '' },
        { name: 'Raspberry Pi / controllers', monthly: '', description: '' },
        { name: '3D printing materials', monthly: '', description: '' },
        { name: 'Sensors & cameras', monthly: '', description: '' },
        { name: 'Power supplies', monthly: '', description: '' },
        { name: 'Prototype units', monthly: '', description: '' },
      ]},
      { category: 'Facilities', items: [
        { name: 'Workshop / lab rent', monthly: '', description: '' },
        { name: 'Equipment & tools', monthly: '', description: '' },
      ]},
      { category: 'Manufacturing Prep', items: [
        { name: 'Mold / tooling', monthly: '', description: '' },
        { name: 'First production run', monthly: '', description: '' },
      ]},
    ],
    milestones: [
      { name: '', targetDate: '', fundingUnlocked: '' },
      { name: '', targetDate: '', fundingUnlocked: '' },
      { name: '', targetDate: '', fundingUnlocked: '' },
    ]
  });

  // State management
  const [data, setData] = useState({
    yqa: createEmptyProject(),
    quantum: createEmptyProject(),
    robotics: createRoboticsProject(),
    accounting: createEmptyProject(),
    operating: {
      expenses: [
        { category: 'Office / Workspace', items: [
          { name: 'Office rent', monthly: '', description: '' },
          { name: 'Utilities', monthly: '', description: '' },
          { name: 'Internet', monthly: '', description: '' },
        ]},
        { category: 'Corporate / Admin', items: [
          { name: 'Legal fees', monthly: '', description: '' },
          { name: 'Accounting / audit', monthly: '', description: '' },
          { name: 'Insurance', monthly: '', description: '' },
        ]},
        { category: 'Founder / Key Personnel', items: [
          { name: 'Founder salary', monthly: '', description: '' },
          { name: 'Key hire #1', monthly: '', description: '' },
          { name: 'Key hire #2', monthly: '', description: '' },
        ]},
        { category: 'Equipment', items: [
          { name: 'Laptops / workstations', monthly: '', description: '' },
          { name: 'Software licenses', monthly: '', description: '' },
        ]},
        { category: 'Buffer', items: [
          { name: 'Contingency (10-15%)', monthly: '', description: '' },
        ]},
      ],
    },
    executive: {
      totalAsk: '',
      premoneyValuation: '',
      fundingType: '',
      runway: '12',
      investmentType: '',
      equityOffered: '',
      minimumInvestment: '',
    },
    notes: '',
  });

  const [savedVersion, setSavedVersion] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('yqa');

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('yellowMantis_fundingRequirements');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Calculate 12-month total for a project
  const calculateProjectTotal = (project) => {
    if (!project || !project.expenses) return 0;
    let total = 0;
    project.expenses.forEach(category => {
      category.items.forEach(item => {
        const monthly = parseFloat(item.monthly) || 0;
        total += monthly * 12;
      });
    });
    return total;
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    return (
      calculateProjectTotal(data.yqa) +
      calculateProjectTotal(data.quantum) +
      calculateProjectTotal(data.robotics) +
      calculateProjectTotal(data.accounting) +
      calculateProjectTotal(data.operating)
    );
  };

  // Format currency
  const formatCurrency = (value) => {
    if (!value) return 'R0';
    return 'R' + parseInt(value).toLocaleString('en-ZA');
  };

  // Handle input changes
  const handleExpenseChange = (projectKey, categoryIndex, itemIndex, field, value) => {
    setData(prev => {
      const newData = { ...prev };
      const project = { ...newData[projectKey] };
      const expenses = [...project.expenses];
      const category = { ...expenses[categoryIndex] };
      const items = [...category.items];
      items[itemIndex] = { ...items[itemIndex], [field]: value };
      category.items = items;
      expenses[categoryIndex] = category;
      project.expenses = expenses;
      newData[projectKey] = project;
      return newData;
    });
  };

  const handleMilestoneChange = (projectKey, index, field, value) => {
    setData(prev => {
      const newData = { ...prev };
      const project = { ...newData[projectKey] };
      const milestones = [...project.milestones];
      milestones[index] = { ...milestones[index], [field]: value };
      project.milestones = milestones;
      newData[projectKey] = project;
      return newData;
    });
  };

  const handleExecutiveChange = (field, value) => {
    setData(prev => ({
      ...prev,
      executive: { ...prev.executive, [field]: value }
    }));
  };

  // Save data
  const saveData = () => {
    const version = {
      ...data,
      savedAt: new Date().toISOString(),
      version: Date.now(),
    };
    localStorage.setItem('yellowMantis_fundingRequirements', JSON.stringify(data));
    setSavedVersion(version.savedAt);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  // Clear all data
  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('yellowMantis_fundingRequirements');
      window.location.reload();
    }
  };

  // Export as JSON
  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `funding_requirements_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render expense table for a project
  const renderExpenseTable = (projectKey, projectData) => {
    if (!projectData || !projectData.expenses) return null;
    
    return (
      <div className="expense-tables">
        {projectData.expenses.map((category, catIndex) => (
          <div key={catIndex} className="expense-category">
            <h4 className="category-title">{category.category}</h4>
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Expense Item</th>
                  <th>Monthly Cost (R)</th>
                  <th>12-Month Total</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className="item-name">{item.name}</td>
                    <td>
                      <input
                        type="number"
                        value={item.monthly}
                        onChange={(e) => handleExpenseChange(projectKey, catIndex, itemIndex, 'monthly', e.target.value)}
                        placeholder="0"
                        className="currency-input"
                      />
                    </td>
                    <td className="calculated-total">
                      {formatCurrency((parseFloat(item.monthly) || 0) * 12)}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleExpenseChange(projectKey, catIndex, itemIndex, 'description', e.target.value)}
                        placeholder="Notes..."
                        className="notes-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        
        <div className="project-subtotal">
          <span>Project Subtotal (12 months):</span>
          <span className="subtotal-value">{formatCurrency(calculateProjectTotal(projectData))}</span>
        </div>

        {projectData.milestones && (
          <div className="milestones-section">
            <h4>Milestones & Deliverables</h4>
            <table className="milestone-table">
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>Target Date</th>
                  <th>Funding Unlocked (R)</th>
                </tr>
              </thead>
              <tbody>
                {projectData.milestones.map((milestone, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={milestone.name}
                        onChange={(e) => handleMilestoneChange(projectKey, index, 'name', e.target.value)}
                        placeholder="Milestone description..."
                        className="milestone-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={milestone.targetDate}
                        onChange={(e) => handleMilestoneChange(projectKey, index, 'targetDate', e.target.value)}
                        placeholder="Q1 2026"
                        className="date-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={milestone.fundingUnlocked}
                        onChange={(e) => handleMilestoneChange(projectKey, index, 'fundingUnlocked', e.target.value)}
                        placeholder="0"
                        className="currency-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const tabs = [
    { id: 'yqa', label: '🧪 Y-QA', color: '#3498db' },
    { id: 'quantum', label: '🔮 Quantum', color: '#9b59b6' },
    { id: 'robotics', label: '🤖 Robotics', color: '#e74c3c' },
    { id: 'accounting', label: '💰 Y-Accounting', color: '#f39c12' },
    { id: 'operating', label: '🏢 Operating', color: '#27ae60' },
  ];

  return (
    <div className="funding-page">
      {/* Header */}
      <div className="funding-header">
        <div className="header-logo">
          <MantisIcon size={50} />
          <div className="header-text">
            <h1>Funding Requirements</h1>
            <p>Interactive Budget Planner</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="action-btn save-btn" onClick={saveData}>
            💾 Save
          </button>
          <button className="action-btn export-btn" onClick={exportData}>
            📤 Export
          </button>
          <button className="action-btn clear-btn" onClick={clearData}>
            🗑️ Clear
          </button>
        </div>
        {showSaved && (
          <div className="saved-notification">
            ✅ Saved successfully!
          </div>
        )}
      </div>

      {/* Executive Summary */}
      <section className="executive-summary">
        <h2>📊 Executive Summary</h2>
        <div className="summary-grid">
          <div className="summary-card total">
            <label>Total Funding Ask</label>
            <div className="calculated-value">
              {formatCurrency(calculateGrandTotal())}
            </div>
            <span className="per-month">
              ({formatCurrency(calculateGrandTotal() / 12)}/month)
            </span>
          </div>
          
          <div className="summary-card">
            <label>Runway Target</label>
            <select
              value={data.executive.runway}
              onChange={(e) => handleExecutiveChange('runway', e.target.value)}
              className="summary-select"
            >
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
            </select>
          </div>

          <div className="summary-card">
            <label>Funding Type</label>
            <select
              value={data.executive.fundingType}
              onChange={(e) => handleExecutiveChange('fundingType', e.target.value)}
              className="summary-select"
            >
              <option value="">Select...</option>
              <option value="seed">Seed</option>
              <option value="pre-seed">Pre-Seed</option>
              <option value="angel">Angel</option>
              <option value="series-a">Series A</option>
            </select>
          </div>

          <div className="summary-card">
            <label>Investment Type</label>
            <select
              value={data.executive.investmentType}
              onChange={(e) => handleExecutiveChange('investmentType', e.target.value)}
              className="summary-select"
            >
              <option value="">Select...</option>
              <option value="equity">Equity</option>
              <option value="safe">SAFE</option>
              <option value="convertible">Convertible Note</option>
            </select>
          </div>
        </div>
      </section>

      {/* Current Valuations */}
      <section className="valuations-section">
        <h2>💎 Current Portfolio Valuations</h2>
        <div className="valuations-grid">
          {Object.entries(valuations).map(([key, val]) => (
            <div key={key} className="valuation-card">
              <h4>{val.label}</h4>
              <div className="valuation-range">
                {val.min === val.max 
                  ? formatCurrency(val.min)
                  : `${formatCurrency(val.min)} - ${formatCurrency(val.max)}`
                }
              </div>
              <span className="stage-badge">{val.stage}</span>
            </div>
          ))}
          <div className="valuation-card total-valuation">
            <h4>Total Portfolio</h4>
            <div className="valuation-range">
              R30,000,000 - R40,000,000
            </div>
            <span className="stage-badge">Conservative</span>
          </div>
        </div>
      </section>

      {/* Project Tabs */}
      <section className="projects-section">
        <div className="project-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`project-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ '--tab-color': tab.color }}
            >
              {tab.label}
              <span className="tab-total">
                {formatCurrency(calculateProjectTotal(data[tab.id]))}
              </span>
            </button>
          ))}
        </div>

        <div className="project-content">
          {activeTab === 'yqa' && (
            <div className="project-panel">
              <div className="project-header">
                <h3>🧪 Y-QA Platform</h3>
                <div className="project-meta">
                  <span className="valuation">Valuation: {formatCurrency(valuations.yqa.min)}</span>
                  <span className="stage">{valuations.yqa.stage}</span>
                </div>
              </div>
              {renderExpenseTable('yqa', data.yqa)}
            </div>
          )}

          {activeTab === 'quantum' && (
            <div className="project-panel">
              <div className="project-header">
                <h3>🔮 Quantum Bridge Framework</h3>
                <div className="project-meta">
                  <span className="valuation">Valuation: {formatCurrency(valuations.quantum.min)} - {formatCurrency(valuations.quantum.max)}</span>
                  <span className="stage">{valuations.quantum.stage}</span>
                </div>
              </div>
              {renderExpenseTable('quantum', data.quantum)}
            </div>
          )}

          {activeTab === 'robotics' && (
            <div className="project-panel">
              <div className="project-header">
                <h3>🤖 Qyvella Robotics</h3>
                <div className="project-meta">
                  <span className="valuation">Valuation: {formatCurrency(valuations.robotics.min)} - {formatCurrency(valuations.robotics.max)}</span>
                  <span className="stage">{valuations.robotics.stage}</span>
                </div>
              </div>
              {renderExpenseTable('robotics', data.robotics)}
            </div>
          )}

          {activeTab === 'accounting' && (
            <div className="project-panel">
              <div className="project-header">
                <h3>💰 Y-Accounting</h3>
                <div className="project-meta">
                  <span className="valuation">Valuation: {formatCurrency(valuations.accounting.min)} - {formatCurrency(valuations.accounting.max)}</span>
                  <span className="stage">{valuations.accounting.stage}</span>
                </div>
                <p className="third-party-note">In conjunction with a third party (50% ownership)</p>
              </div>
              {renderExpenseTable('accounting', data.accounting)}
            </div>
          )}

          {activeTab === 'operating' && (
            <div className="project-panel">
              <div className="project-header">
                <h3>🏢 General Operating Expenses</h3>
                <div className="project-meta">
                  <span className="valuation">Yellow Mantis HQ</span>
                  <span className="stage">Ongoing</span>
                </div>
              </div>
              {renderExpenseTable('operating', data.operating)}
            </div>
          )}
        </div>
      </section>

      {/* Total Summary */}
      <section className="total-summary">
        <h2>📈 Total Funding Summary</h2>
        <div className="summary-breakdown">
          <div className="breakdown-row">
            <span className="breakdown-label">🧪 Y-QA Platform</span>
            <span className="breakdown-value">{formatCurrency(calculateProjectTotal(data.yqa))}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">🔮 Quantum Bridge</span>
            <span className="breakdown-value">{formatCurrency(calculateProjectTotal(data.quantum))}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">🤖 Qyvella Robotics</span>
            <span className="breakdown-value">{formatCurrency(calculateProjectTotal(data.robotics))}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">💰 Y-Accounting</span>
            <span className="breakdown-value">{formatCurrency(calculateProjectTotal(data.accounting))}</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">🏢 General Operating</span>
            <span className="breakdown-value">{formatCurrency(calculateProjectTotal(data.operating))}</span>
          </div>
          <div className="breakdown-row total-row">
            <span className="breakdown-label">TOTAL FUNDING ASK (12 months)</span>
            <span className="breakdown-value">{formatCurrency(calculateGrandTotal())}</span>
          </div>
          <div className="breakdown-row monthly-row">
            <span className="breakdown-label">Monthly Burn Rate</span>
            <span className="breakdown-value">{formatCurrency(calculateGrandTotal() / 12)}</span>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="notes-section">
        <h2>📝 Notes & Additional Items</h2>
        <textarea
          value={data.notes}
          onChange={(e) => setData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Add any additional context, explanations, or items to discuss..."
          className="notes-textarea"
          rows={6}
        />
      </section>

      {/* Footer */}
      <footer className="funding-footer">
        <p>
          <strong>Prepared by:</strong> JP van Zyl — Founder<br />
          <strong>Contact:</strong> jp@yellow-mantis.com<br />
          <strong>Yellow Mantis Technology Group</strong> — December 2025
        </p>
        {savedVersion && (
          <p className="last-saved">
            Last saved: {new Date(savedVersion).toLocaleString()}
          </p>
        )}
      </footer>
    </div>
  );
};

export default FundingRequirements;
