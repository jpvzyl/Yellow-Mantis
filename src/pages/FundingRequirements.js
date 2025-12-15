import React, { useState, useEffect } from 'react';
import MantisIcon from '../components/MantisIcon';
import './FundingRequirements.css';

const FundingRequirements = () => {
  // Valuations from IP_VALUATION_ANALYSIS.md with growth potential
  const valuations = {
    yqa: { 
      min: 15000000, max: 15000000, 
      label: 'Y-QA Platform', 
      stage: 'Rollout Q1 2026',
      tam: { value: '$4.8B', market: 'Software Testing', cagr: '12%' },
      growth: {
        moderate: { multiplier: 1.5, value: 22500000, timeline: '12-18 months' },
        high: { multiplier: 2.5, value: 37500000, timeline: '24-36 months' },
        maturity: { min: 30000000, max: 50000000 }
      }
    },
    quantum: { 
      min: 7500000, max: 12500000, 
      label: 'Quantum Bridge', 
      stage: 'Research/Alpha',
      tam: { value: '$1.3B → $8.6B', market: 'Quantum Software', cagr: '32%' },
      growth: {
        moderate: { multiplier: 1.3, valueMin: 13000000, valueMax: 16250000, timeline: '12-18 months' },
        high: { multiplier: '5x-10x', valueMin: 37500000, valueMax: 125000000, timeline: '24-36 months' },
        maturity: { min: 50000000, max: 150000000 }
      }
    },
    robotics: { 
      min: 5000000, max: 7500000, 
      label: 'Qyvella Robotics', 
      stage: 'Final R&D',
      tam: { value: '$18.4B', market: 'Personal/Educational Robotics', cagr: '15%' },
      growth: {
        moderate: { multiplier: 1.3, valueMin: 6500000, valueMax: 9750000, timeline: '12-18 months' },
        high: { multiplier: '3x-5x', valueMin: 15000000, valueMax: 37500000, timeline: '24-36 months' },
        maturity: { min: 15000000, max: 40000000 }
      }
    },
    accounting: { 
      min: 2500000, max: 5000000, 
      label: 'Y-Accounting (50%)', 
      stage: 'Rollout Q1 2026',
      tam: { value: '$19.6B', market: 'Accounting Software', cagr: '8%' },
      growth: {
        moderate: { multiplier: 1.4, valueMin: 3500000, valueMax: 7000000, timeline: '12-18 months' },
        high: { multiplier: 2, valueMin: 5000000, valueMax: 10000000, timeline: '24-36 months' },
        maturity: { min: 5000000, max: 12500000 }
      }
    },
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
        { name: 'Mechanical engineer', monthly: '', description: '' },
        { name: 'AI/ML developer', monthly: '', description: '' },
        { name: 'Electrical engineer', monthly: '', description: '' },
        { name: 'ISO auditor', monthly: '', description: '' },
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
      { category: 'Completed Unit Cost', items: [
        { name: 'Cost per completed unit', monthly: '', description: '', isUnitCost: true },
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
    unitQuantity: '',
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
    growthPercentages: {
      yqa: '',
      quantum: '',
      robotics: '',
      accounting: '',
    },
    sharePurchase: {
      yqa: { amount: '', percent: '', runningCost: '' },
      quantum: { amount: '', percent: '', runningCost: '' },
      robotics: { amount: '', percent: '', runningCost: '' },
      accounting: { amount: '', percent: '', runningCost: '' },
    },
    notes: '',
  });

  const [savedVersion, setSavedVersion] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('yqa');

  // Default sharePurchase structure
  const defaultSharePurchase = {
    yqa: { amount: '', percent: '', runningCost: '' },
    quantum: { amount: '', percent: '', runningCost: '' },
    robotics: { amount: '', percent: '', runningCost: '' },
    accounting: { amount: '', percent: '', runningCost: '' },
  };

  // Default growthPercentages structure
  const defaultGrowthPercentages = {
    yqa: '',
    quantum: '',
    robotics: '',
    accounting: '',
  };

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('yellowMantis_fundingRequirements');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        // Merge with defaults to ensure new fields exist
        setData(prev => ({
          ...prev,
          ...parsedData,
          growthPercentages: {
            ...defaultGrowthPercentages,
            ...(parsedData.growthPercentages || {}),
          },
          sharePurchase: {
            ...defaultSharePurchase,
            ...(parsedData.sharePurchase || {}),
          },
        }));
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Get runway months from executive settings
  const getRunwayMonths = () => {
    return parseInt(data.executive.runway) || 12;
  };

  // Calculate total for a project based on runway
  const calculateProjectTotal = (project) => {
    if (!project || !project.expenses) return 0;
    const runwayMonths = getRunwayMonths();
    let total = 0;
    project.expenses.forEach(category => {
      const isUnitCostCategory = category.category === 'Completed Unit Cost';
      category.items.forEach(item => {
        const monthly = parseFloat(item.monthly) || 0;
        if (isUnitCostCategory) {
          // For unit costs, multiply by quantity instead of runway
          const quantity = parseFloat(project.unitQuantity) || 0;
          total += monthly * quantity;
        } else {
          total += monthly * runwayMonths;
        }
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
    if (!value && value !== 0) return 'R0';
    return 'R' + Math.round(Number(value)).toLocaleString('en-ZA');
  };

  // Handle growth percentage changes
  const handleGrowthChange = (projectKey, value) => {
    setData(prev => ({
      ...prev,
      growthPercentages: {
        ...prev.growthPercentages,
        [projectKey]: value
      }
    }));
  };

  // Calculate IP valuation (base/current)
  const calculateIPValuation = () => {
    let total = 0;
    Object.keys(valuations).forEach(key => {
      total += (valuations[key].min + valuations[key].max) / 2;
    });
    return total;
  };

  // Calculate growth valuation based on percentages
  const calculateGrowthValuation = () => {
    let total = 0;
    Object.keys(valuations).forEach(key => {
      const baseValue = (valuations[key].min + valuations[key].max) / 2;
      const growthPercent = parseFloat(data.growthPercentages[key]) || 0;
      total += baseValue * (growthPercent / 100);
    });
    return total;
  };

  // Calculate total valuation (IP + Growth)
  const calculateTotalValuation = () => {
    return calculateIPValuation() + calculateGrowthValuation();
  };

  // Get project valuation with growth
  // Valuation = IP Value × (1 + Growth%)
  const getProjectValuationWithGrowth = (projectKey) => {
    const baseValue = (valuations[projectKey].min + valuations[projectKey].max) / 2;
    const growthPercent = parseFloat(data.growthPercentages?.[projectKey]) || 0;
    // Total = IP Value × (1 + Growth%/100) e.g. 15M × 1.5 = 22.5M for 50% growth
    const total = baseValue * (1 + growthPercent / 100);
    const growthValue = total - baseValue;
    return {
      base: baseValue,
      growth: growthValue,
      total: total
    };
  };

  // Calculate Equity Purchase for a project
  // Equity Purchase = Total Valuation × Equity %
  const getEquityPurchase = (projectKey) => {
    const projectVal = getProjectValuationWithGrowth(projectKey);
    const sharePurchase = data.sharePurchase || {};
    const equityPercent = parseFloat(sharePurchase[projectKey]?.percent) || 0;
    return projectVal.total * (equityPercent / 100);
  };

  // Calculate Running Cost Contribution for a project
  // Running Cost Contribution = Project Operating Cost × Running Cost %
  const getRunningCostContribution = (projectKey) => {
    const projectOperating = calculateProjectTotal(data[projectKey]);
    const sharePurchase = data.sharePurchase || {};
    const runningCostPercent = parseFloat(sharePurchase[projectKey]?.runningCost) || 0;
    return projectOperating * (runningCostPercent / 100);
  };

  // Handle share purchase changes - fields are independent for negotiation
  const handleSharePurchaseChange = (projectKey, field, value) => {
    setData(prev => {
      const newSharePurchase = { ...(prev.sharePurchase || defaultSharePurchase) };
      const currentProject = newSharePurchase[projectKey] || { amount: '', percent: '', runningCost: '' };
      
      newSharePurchase[projectKey] = {
        ...currentProject,
        [field]: value
      };
      
      return { ...prev, sharePurchase: newSharePurchase };
    });
  };

  // Calculate total share purchase amount (from manual inputs)
  const calculateTotalSharePurchase = () => {
    let total = 0;
    const sharePurchase = data.sharePurchase || {};
    Object.keys(sharePurchase).forEach(key => {
      total += parseFloat(sharePurchase[key]?.amount) || 0;
    });
    return total;
  };

  // Calculate total equity purchase (Equity % × Total Valuation for each project)
  const calculateTotalEquityPurchase = () => {
    let total = 0;
    Object.keys(valuations).forEach(key => {
      total += getEquityPurchase(key);
    });
    return total;
  };

  // Calculate total running cost contribution
  const calculateTotalRunningCostContribution = () => {
    let total = 0;
    Object.keys(valuations).forEach(key => {
      total += getRunningCostContribution(key);
    });
    return total;
  };

  // Calculate total equity percentage
  const calculateTotalEquityPercent = () => {
    let total = 0;
    const sharePurchase = data.sharePurchase || {};
    Object.keys(sharePurchase).forEach(key => {
      total += parseFloat(sharePurchase[key]?.percent) || 0;
    });
    return total;
  };

  // Calculate total running cost percentage
  const calculateTotalRunningCost = () => {
    let total = 0;
    const sharePurchase = data.sharePurchase || {};
    Object.keys(sharePurchase).forEach(key => {
      total += parseFloat(sharePurchase[key]?.runningCost) || 0;
    });
    return total;
  };

  // Get share purchase for a project
  const getProjectSharePurchase = (projectKey) => {
    const sharePurchase = data.sharePurchase || {};
    const projectShare = sharePurchase[projectKey] || { amount: '', percent: '', runningCost: '' };
    return {
      amount: parseFloat(projectShare.amount) || 0,
      percent: parseFloat(projectShare.percent) || 0,
      runningCost: parseFloat(projectShare.runningCost) || 0
    };
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

  // Handle unit quantity change for robotics
  const handleUnitQuantityChange = (projectKey, value) => {
    setData(prev => ({
      ...prev,
      [projectKey]: {
        ...prev[projectKey],
        unitQuantity: value
      }
    }));
  };

  // Render expense table for a project
  const renderExpenseTable = (projectKey, projectData) => {
    if (!projectData || !projectData.expenses) return null;
    
    return (
      <div className="expense-tables">
        {projectData.expenses.map((category, catIndex) => {
          const isUnitCostCategory = category.category === 'Completed Unit Cost';
          
          return (
            <div key={catIndex} className="expense-category">
              <h4 className="category-title">{category.category}</h4>
              {isUnitCostCategory ? (
                <div className="unit-cost-section">
                  <table className="expense-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Cost Per Unit (R)</th>
                        <th>Quantity</th>
                        <th>Total</th>
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
                          <td>
                            <input
                              type="number"
                              value={projectData.unitQuantity || ''}
                              onChange={(e) => handleUnitQuantityChange(projectKey, e.target.value)}
                              placeholder="0"
                              className="quantity-input"
                            />
                          </td>
                          <td className="calculated-total">
                            {formatCurrency((parseFloat(item.monthly) || 0) * (parseFloat(projectData.unitQuantity) || 0))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="unit-cost-note">
                    Enter the quoted cost per completed robot unit and the number of units to produce.
                  </p>
                </div>
              ) : (
                <table className="expense-table">
                  <thead>
                    <tr>
                      <th>Expense Item</th>
                      <th>Monthly Cost (R)</th>
                      <th>{getRunwayMonths()}-Month Total</th>
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
                          {formatCurrency((parseFloat(item.monthly) || 0) * getRunwayMonths())}
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
              )}
            </div>
          );
        })}
        
        <div className="project-subtotal">
          <span>Project Subtotal ({getRunwayMonths()} months):</span>
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
      {/* Hero Section */}
      <div className="funding-hero">
        <div className="funding-hero-bg"></div>
        <MantisIcon size={80} className="funding-hero-logo" />
        <h1>Funding Requirements</h1>
        <p className="funding-subtitle">Yellow Mantis Technology Group — Interactive Budget Planner</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={saveData}>
            💾 Save Progress
          </button>
          <button className="btn btn-secondary" onClick={exportData}>
            📤 Export JSON
          </button>
          <button className="btn btn-danger" onClick={clearData}>
            🗑️ Clear All
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
            <label>Total Funding Ask ({getRunwayMonths()} months)</label>
            <div className="calculated-value">
              {formatCurrency(calculateGrandTotal())}
            </div>
            <span className="per-month">
              ({formatCurrency(calculateGrandTotal() / getRunwayMonths())}/month)
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
        
        {/* Valuation Summary */}
        <div className="valuation-summary">
          <div className="valuation-summary-card ip">
            <span className="summary-label">IP Valuation</span>
            <span className="summary-value">{formatCurrency(calculateIPValuation())}</span>
            <span className="summary-note">Base/Current Value</span>
          </div>
          <div className="valuation-summary-card growth">
            <span className="summary-label">Growth Valuation</span>
            <span className="summary-value">{formatCurrency(calculateGrowthValuation())}</span>
            <span className="summary-note">Based on % below</span>
          </div>
          <div className="valuation-summary-card total">
            <span className="summary-label">Total Valuation</span>
            <span className="summary-value">{formatCurrency(calculateTotalValuation())}</span>
            <span className="summary-note">For investment breakdown</span>
          </div>
        </div>

        {/* Per-project breakdown */}
        <div className="valuations-grid">
          {Object.entries(valuations).map(([key, val]) => {
            const projectVal = getProjectValuationWithGrowth(key);
            return (
              <div key={key} className="valuation-card">
                <h4>{val.label}</h4>
                
                {/* TAM Badge */}
                <div className="tam-badge">
                  <span className="tam-value">{val.tam.value}</span>
                  <span className="tam-market">{val.tam.market}</span>
                  <span className="tam-cagr">{val.tam.cagr} CAGR</span>
                </div>

                <div className="valuation-breakdown">
                  <div className="val-row">
                    <span className="val-label">IP Value:</span>
                    <span className="val-amount">{formatCurrency(projectVal.base)}</span>
                  </div>
                  <div className="val-row growth-row">
                    <span className="val-label">Growth %:</span>
                    <div className="growth-input-wrapper">
                      <input
                        type="number"
                        value={data.growthPercentages[key]}
                        onChange={(e) => handleGrowthChange(key, e.target.value)}
                        placeholder="0"
                        className="growth-input"
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="val-row">
                    <span className="val-label">Growth Value:</span>
                    <span className="val-amount growth-amount">+{formatCurrency(projectVal.growth)}</span>
                  </div>
                  <div className="val-row total-row">
                    <span className="val-label">Total:</span>
                    <span className="val-amount total-amount">{formatCurrency(projectVal.total)}</span>
                  </div>
                </div>
                <span className="stage-badge">{val.stage}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Project Tabs */}
      <section className="projects-section">
        <div className="project-tabs">
          {tabs.map(tab => {
            const hasValuation = tab.id !== 'operating';
            const sharePurchase = hasValuation ? getProjectSharePurchase(tab.id) : null;
            return (
              <button
                key={tab.id}
                className={`project-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ '--tab-color': tab.color }}
              >
                {tab.label}
                <span className="tab-total">
                  Op: {formatCurrency(calculateProjectTotal(data[tab.id]))}
                </span>
                {hasValuation && (
                  <span className="tab-share">
                    Share: {formatCurrency(sharePurchase.amount)} ({sharePurchase.percent}%)
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="project-content">
          {activeTab === 'yqa' && (
            <div className="project-panel">
              <div className="project-header">
                <h3>🧪 Y-QA Platform</h3>
                <div className="project-meta">
                  <span className="valuation">Valuation: {formatCurrency(valuations.yqa.min)}</span>
                  <span className="tam-inline">TAM: {valuations.yqa.tam.value}</span>
                  <span className="stage">{valuations.yqa.stage}</span>
                </div>
              </div>
              <div className="growth-potential-box">
                <h4>📈 Growth Potential</h4>
                <div className="growth-scenarios">
                  <div className="growth-scenario">
                    <span className="scenario-label">Moderate ({valuations.yqa.growth.moderate.timeline})</span>
                    <span className="scenario-value">{formatCurrency(valuations.yqa.growth.moderate.value)}</span>
                    <span className="scenario-multiplier">{valuations.yqa.growth.moderate.multiplier}x</span>
                  </div>
                  <div className="growth-scenario">
                    <span className="scenario-label">High Growth ({valuations.yqa.growth.high.timeline})</span>
                    <span className="scenario-value">{formatCurrency(valuations.yqa.growth.high.value)}</span>
                    <span className="scenario-multiplier">{valuations.yqa.growth.high.multiplier}x</span>
                  </div>
                  <div className="growth-scenario maturity">
                    <span className="scenario-label">At Maturity</span>
                    <span className="scenario-value">{formatCurrency(valuations.yqa.growth.maturity.min)} - {formatCurrency(valuations.yqa.growth.maturity.max)}</span>
                  </div>
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
                  <span className="tam-inline">TAM: {valuations.quantum.tam.value}</span>
                  <span className="stage">{valuations.quantum.stage}</span>
                </div>
              </div>
              <div className="growth-potential-box highest-upside">
                <h4>📈 Growth Potential <span className="upside-badge">Highest Upside</span></h4>
                <div className="growth-scenarios">
                  <div className="growth-scenario">
                    <span className="scenario-label">Moderate ({valuations.quantum.growth.moderate.timeline})</span>
                    <span className="scenario-value">{formatCurrency(valuations.quantum.growth.moderate.valueMin)} - {formatCurrency(valuations.quantum.growth.moderate.valueMax)}</span>
                    <span className="scenario-multiplier">{valuations.quantum.growth.moderate.multiplier}x</span>
                  </div>
                  <div className="growth-scenario">
                    <span className="scenario-label">High Growth ({valuations.quantum.growth.high.timeline})</span>
                    <span className="scenario-value">{formatCurrency(valuations.quantum.growth.high.valueMin)} - {formatCurrency(valuations.quantum.growth.high.valueMax)}</span>
                    <span className="scenario-multiplier">{valuations.quantum.growth.high.multiplier}</span>
                  </div>
                  <div className="growth-scenario maturity">
                    <span className="scenario-label">At Maturity</span>
                    <span className="scenario-value">{formatCurrency(valuations.quantum.growth.maturity.min)} - {formatCurrency(valuations.quantum.growth.maturity.max)}</span>
                  </div>
                </div>
                <p className="growth-note">"Could become the Stripe of Quantum Computing"</p>
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
                  <span className="tam-inline">TAM: {valuations.robotics.tam.value}</span>
                  <span className="stage">{valuations.robotics.stage}</span>
                </div>
              </div>
              <div className="growth-potential-box">
                <h4>📈 Growth Potential</h4>
                <div className="growth-scenarios">
                  <div className="growth-scenario">
                    <span className="scenario-label">Moderate ({valuations.robotics.growth.moderate.timeline})</span>
                    <span className="scenario-value">{formatCurrency(valuations.robotics.growth.moderate.valueMin)} - {formatCurrency(valuations.robotics.growth.moderate.valueMax)}</span>
                    <span className="scenario-multiplier">{valuations.robotics.growth.moderate.multiplier}x</span>
                  </div>
                  <div className="growth-scenario">
                    <span className="scenario-label">High Growth ({valuations.robotics.growth.high.timeline})</span>
                    <span className="scenario-value">{formatCurrency(valuations.robotics.growth.high.valueMin)} - {formatCurrency(valuations.robotics.growth.high.valueMax)}</span>
                    <span className="scenario-multiplier">{valuations.robotics.growth.high.multiplier}</span>
                  </div>
                  <div className="growth-scenario maturity">
                    <span className="scenario-label">At Maturity</span>
                    <span className="scenario-value">{formatCurrency(valuations.robotics.growth.maturity.min)} - {formatCurrency(valuations.robotics.growth.maturity.max)}</span>
                  </div>
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
                  <span className="tam-inline">TAM: {valuations.accounting.tam.value}</span>
                  <span className="stage">{valuations.accounting.stage}</span>
                </div>
                <p className="third-party-note">In conjunction with a third party (50% ownership)</p>
              </div>
              <div className="growth-potential-box">
                <h4>📈 Growth Potential</h4>
                <div className="growth-scenarios">
                  <div className="growth-scenario">
                    <span className="scenario-label">Moderate ({valuations.accounting.growth.moderate.timeline})</span>
                    <span className="scenario-value">{formatCurrency(valuations.accounting.growth.moderate.valueMin)} - {formatCurrency(valuations.accounting.growth.moderate.valueMax)}</span>
                    <span className="scenario-multiplier">{valuations.accounting.growth.moderate.multiplier}x</span>
                  </div>
                  <div className="growth-scenario">
                    <span className="scenario-label">High Growth ({valuations.accounting.growth.high.timeline})</span>
                    <span className="scenario-value">{formatCurrency(valuations.accounting.growth.high.valueMin)} - {formatCurrency(valuations.accounting.growth.high.valueMax)}</span>
                    <span className="scenario-multiplier">{valuations.accounting.growth.high.multiplier}x</span>
                  </div>
                  <div className="growth-scenario maturity">
                    <span className="scenario-label">At Maturity</span>
                    <span className="scenario-value">{formatCurrency(valuations.accounting.growth.maturity.min)} - {formatCurrency(valuations.accounting.growth.maturity.max)}</span>
                  </div>
                </div>
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

      {/* Operational Funding */}
      <section className="total-summary">
        <h2>📈 Operational Funding</h2>
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
          <div className="breakdown-row subtotal-row">
            <span className="breakdown-label">OPERATIONAL TOTAL ({getRunwayMonths()} months)</span>
            <span className="breakdown-value">{formatCurrency(calculateGrandTotal())}</span>
          </div>
          <div className="breakdown-row monthly-row">
            <span className="breakdown-label">Monthly Burn Rate</span>
            <span className="breakdown-value">{formatCurrency(calculateGrandTotal() / getRunwayMonths())}</span>
          </div>
        </div>
      </section>

      {/* Share Purchase by Project */}
      <section className="share-purchase-section">
        <h2>💼 Share Purchase by Project</h2>
        <div className="share-purchase-grid">
          {Object.entries(valuations).map(([key, val]) => {
            const projectVal = getProjectValuationWithGrowth(key);
            const sharePurchaseData = data.sharePurchase || {};
            const sharePurchase = sharePurchaseData[key] || { amount: '', percent: '', runningCost: '' };
            return (
              <div key={key} className="share-purchase-card">
                <h4>{val.label}</h4>
                <div className="share-valuation">
                  Valuation: {formatCurrency(projectVal.total)}
                </div>
                <div className="share-inputs">
                  <div className="share-input-group">
                    <label>Share Sales (R)</label>
                    <input
                      type="number"
                      value={sharePurchase.amount}
                      onChange={(e) => handleSharePurchaseChange(key, 'amount', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="share-input-group">
                    <label>Equity (%)</label>
                    <input
                      type="number"
                      value={sharePurchase.percent}
                      onChange={(e) => handleSharePurchaseChange(key, 'percent', e.target.value)}
                      placeholder="0"
                      step="0.1"
                    />
                  </div>
                  <div className="share-input-group">
                    <label>Running Cost (%)</label>
                    <input
                      type="number"
                      value={sharePurchase.runningCost || ''}
                      onChange={(e) => handleSharePurchaseChange(key, 'runningCost', e.target.value)}
                      placeholder="0"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="share-card-total">
                  <span>Equity Purchase:</span>
                  <span className="card-total-value">{formatCurrency(getEquityPurchase(key))}</span>
                  <span className="card-total-percent">({parseFloat(sharePurchase.percent) || 0}% of {formatCurrency(projectVal.total)})</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Company Total */}
      <section className="company-total-section">
        <h2>🏢 Company Total</h2>
        <div className="company-total-grid">
          <div className="company-total-card valuation-card">
            <h4>Total Company Valuation</h4>
            <div className="company-value">{formatCurrency(Object.keys(valuations).reduce((sum, key) => sum + getProjectValuationWithGrowth(key).total, 0))}</div>
            <div className="company-breakdown">
              {Object.entries(valuations).map(([key, val]) => (
                <div key={key} className="company-breakdown-row">
                  <span>{val.label}</span>
                  <span>{formatCurrency(getProjectValuationWithGrowth(key).total)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="company-total-card sales-card">
            <h4>Total Share Sales</h4>
            <div className="company-value">{formatCurrency(calculateTotalSharePurchase())}</div>
            <div className="company-percent">Manual entries</div>
            <div className="company-breakdown">
              {Object.entries(valuations).map(([key, val]) => {
                const sharePurchaseData = data.sharePurchase || {};
                const amount = parseFloat(sharePurchaseData[key]?.amount) || 0;
                return (
                  <div key={key} className="company-breakdown-row">
                    <span>{val.label}</span>
                    <span>{formatCurrency(amount)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="company-total-card equity-card">
            <h4>Total Equity Purchase</h4>
            <div className="company-value">{formatCurrency(calculateTotalEquityPurchase())}</div>
            <div className="company-percent">{calculateTotalValuation() > 0 ? ((calculateTotalEquityPurchase() / calculateTotalValuation()) * 100).toFixed(2) : 0}% of portfolio</div>
            <div className="company-breakdown">
              {Object.entries(valuations).map(([key, val]) => (
                <div key={key} className="company-breakdown-row">
                  <span>{val.label}</span>
                  <span>{formatCurrency(getEquityPurchase(key))}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="company-total-card running-card">
            <h4>Investor Running Cost</h4>
            <div className="company-value">{calculateGrandTotal() > 0 ? ((calculateTotalRunningCostContribution() / calculateGrandTotal()) * 100).toFixed(2) : 0}%</div>
            <div className="company-amount">{formatCurrency(calculateTotalRunningCostContribution())}</div>
            <div className="company-breakdown">
              {Object.entries(valuations).map(([key, val]) => (
                <div key={key} className="company-breakdown-row">
                  <span>{val.label}</span>
                  <span>{formatCurrency(getRunningCostContribution(key))}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Total Investment Required */}
      <section className="total-investment-section">
        <h2>🎯 Total Investment Required</h2>
        <div className="summary-breakdown">
          <div className="breakdown-row">
            <span className="breakdown-label">📈 Investor Operating Contribution</span>
            <span className="breakdown-value">{formatCurrency(calculateTotalRunningCostContribution())}</span>
            <span className="breakdown-note">({calculateGrandTotal() > 0 ? ((calculateTotalRunningCostContribution() / calculateGrandTotal()) * 100).toFixed(2) : 0}% of {formatCurrency(calculateGrandTotal())} total ops)</span>
          </div>
          <div className="breakdown-row">
            <span className="breakdown-label">💼 Equity Purchase</span>
            <span className="breakdown-value">{formatCurrency(calculateTotalEquityPurchase())}</span>
            <span className="breakdown-note">({calculateTotalValuation() > 0 ? ((calculateTotalEquityPurchase() / calculateTotalValuation()) * 100).toFixed(2) : 0}% of total valuation)</span>
          </div>
          <div className="breakdown-row founder-row">
            <span className="breakdown-label">🔄 Founder Re-investment</span>
            <div className="founder-input-wrapper">
              <input
                type="number"
                value={data.executive.founderReinvestPercent || ''}
                onChange={(e) => handleExecutiveChange('founderReinvestPercent', e.target.value)}
                placeholder="0"
                step="0.1"
                className="founder-percent-input"
              />
              <span>%</span>
            </div>
            <span className="breakdown-value">{formatCurrency(calculateTotalEquityPurchase() * (parseFloat(data.executive.founderReinvestPercent) || 0) / 100)}</span>
          </div>
          <div className="breakdown-row total-row">
            <span className="breakdown-label">TOTAL INVESTMENT ASK</span>
            <span className="breakdown-value">{formatCurrency(calculateTotalRunningCostContribution() + calculateTotalEquityPurchase() - (calculateTotalEquityPurchase() * (parseFloat(data.executive.founderReinvestPercent) || 0) / 100))}</span>
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
