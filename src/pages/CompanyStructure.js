import React, { useState, useEffect, useRef, useCallback } from 'react';
import MantisIcon from '../components/MantisIcon';
import './CompanyStructure.css';

const CompanyStructure = ({ structureId }) => {
  const canvasRef = useRef(null);
  const [companies, setCompanies] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyType, setNewCompanyType] = useState('subsidiary');
  const [notes, setNotes] = useState('');
  const [showSaved, setShowSaved] = useState(false);
  const [editingConnection, setEditingConnection] = useState(null);
  const [connectionPercent, setConnectionPercent] = useState('');

  const storageKey = `yellowMantis_companyStructure_${structureId}`;

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompanies(parsed.companies || []);
        setConnections(parsed.connections || []);
        setNotes(parsed.notes || '');
      } catch (e) {
        console.error('Error loading saved structure:', e);
      }
    }
  }, [storageKey]);

  // Save data
  const saveData = () => {
    const data = { companies, connections, notes, savedAt: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(data));
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  // Add new company
  const addCompany = () => {
    if (!newCompanyName.trim()) return;
    
    const newCompany = {
      id: Date.now().toString(),
      name: newCompanyName.trim(),
      type: newCompanyType,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      color: getTypeColor(newCompanyType),
    };
    
    setCompanies([...companies, newCompany]);
    setNewCompanyName('');
    setShowAddModal(false);
  };

  // Get color based on company type
  const getTypeColor = (type) => {
    const colors = {
      holding: '#F2D974',
      subsidiary: '#3498db',
      associate: '#9b59b6',
      joint: '#27ae60',
      trust: '#e74c3c',
      external: '#95a5a6',
    };
    return colors[type] || '#3498db';
  };

  // Delete company
  const deleteCompany = (id) => {
    setCompanies(companies.filter(c => c.id !== id));
    setConnections(connections.filter(conn => conn.from !== id && conn.to !== id));
    setSelectedCompany(null);
  };

  // Start connecting
  const startConnecting = (companyId) => {
    if (connectingFrom === companyId) {
      setConnectingFrom(null);
    } else if (connectingFrom) {
      // Create connection
      if (connectingFrom !== companyId) {
        const existingConnection = connections.find(
          c => (c.from === connectingFrom && c.to === companyId) || 
               (c.from === companyId && c.to === connectingFrom)
        );
        
        if (!existingConnection) {
          setConnections([...connections, {
            id: Date.now().toString(),
            from: connectingFrom,
            to: companyId,
            percent: 0,
            label: '',
          }]);
        }
      }
      setConnectingFrom(null);
    } else {
      setConnectingFrom(companyId);
    }
  };

  // Delete connection
  const deleteConnection = (connId) => {
    setConnections(connections.filter(c => c.id !== connId));
    setEditingConnection(null);
  };

  // Update connection
  const updateConnection = (connId, field, value) => {
    setConnections(connections.map(c => 
      c.id === connId ? { ...c, [field]: value } : c
    ));
  };

  // Handle drag start
  const handleDragStart = (e, company) => {
    e.stopPropagation();
    const rect = canvasRef.current.getBoundingClientRect();
    setDragging(company.id);
    setDragOffset({
      x: e.clientX - rect.left - company.x,
      y: e.clientY - rect.top - company.y,
    });
  };

  // Handle drag
  const handleDrag = useCallback((e) => {
    if (!dragging || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - dragOffset.x, rect.width - 160));
    const y = Math.max(0, Math.min(e.clientY - rect.top - dragOffset.y, rect.height - 80));
    
    setCompanies(companies.map(c => 
      c.id === dragging ? { ...c, x, y } : c
    ));
  }, [dragging, dragOffset, companies]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDragging(null);
  }, []);

  // Mouse move/up listeners
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [dragging, handleDrag, handleDragEnd]);

  // Get center of company node
  const getNodeCenter = (company) => ({
    x: company.x + 80,
    y: company.y + 40,
  });

  // Calculate arrow path
  const getArrowPath = (from, to) => {
    const start = getNodeCenter(from);
    const end = getNodeCenter(to);
    
    // Calculate angle
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    
    // Offset from node edges
    const startOffset = 85;
    const endOffset = 85;
    
    const x1 = start.x + Math.cos(angle) * startOffset;
    const y1 = start.y + Math.sin(angle) * startOffset;
    const x2 = end.x - Math.cos(angle) * endOffset;
    const y2 = end.y - Math.sin(angle) * endOffset;
    
    return { x1, y1, x2, y2, midX: (x1 + x2) / 2, midY: (y1 + y2) / 2 };
  };

  // Export as JSON
  const exportData = () => {
    const data = { companies, connections, notes, exportedAt: new Date().toISOString() };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `company_structure_${structureId}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Clear all
  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all companies and connections?')) {
      setCompanies([]);
      setConnections([]);
      setNotes('');
      setSelectedCompany(null);
      setConnectingFrom(null);
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="structure-page">
      {/* Hero Section */}
      <div className="structure-hero">
        <div className="structure-hero-bg"></div>
        <MantisIcon size={60} className="structure-hero-logo" />
        <h1>Company Structure</h1>
        <p className="structure-subtitle">Interactive Ownership Diagram</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            ➕ Add Company
          </button>
          <button className="btn btn-secondary" onClick={saveData}>
            💾 Save
          </button>
          <button className="btn btn-secondary" onClick={exportData}>
            📤 Export
          </button>
          <button className="btn btn-danger" onClick={clearAll}>
            🗑️ Clear
          </button>
        </div>
        {showSaved && <div className="saved-notification">✅ Saved successfully!</div>}
      </div>

      {/* Legend */}
      <div className="structure-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#F2D974' }}></span>
          Holding Company
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#3498db' }}></span>
          Subsidiary
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#9b59b6' }}></span>
          Associate
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#27ae60' }}></span>
          Joint Venture
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#e74c3c' }}></span>
          Trust
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#95a5a6' }}></span>
          External
        </div>
      </div>

      {/* Instructions */}
      <div className="structure-instructions">
        <p>
          <strong>Instructions:</strong> Click "Add Company" to create nodes. 
          Drag nodes to position them. Click a node, then click another to connect them. 
          Click connections to edit shareholding %.
        </p>
      </div>

      {/* Canvas */}
      <div 
        className="structure-canvas" 
        ref={canvasRef}
        onClick={() => {
          setSelectedCompany(null);
          setConnectingFrom(null);
          setEditingConnection(null);
        }}
      >
        {/* SVG for connections */}
        <svg className="connections-svg">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#F2D974" />
            </marker>
          </defs>
          
          {connections.map(conn => {
            const fromCompany = companies.find(c => c.id === conn.from);
            const toCompany = companies.find(c => c.id === conn.to);
            if (!fromCompany || !toCompany) return null;
            
            const path = getArrowPath(fromCompany, toCompany);
            const isEditing = editingConnection === conn.id;
            
            return (
              <g key={conn.id}>
                <line
                  x1={path.x1}
                  y1={path.y1}
                  x2={path.x2}
                  y2={path.y2}
                  className={`connection-line ${isEditing ? 'editing' : ''}`}
                  markerEnd="url(#arrowhead)"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingConnection(conn.id);
                    setConnectionPercent(conn.percent || '');
                  }}
                />
                {/* Shareholding label */}
                <g 
                  className="connection-label-group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingConnection(conn.id);
                    setConnectionPercent(conn.percent || '');
                  }}
                >
                  <rect
                    x={path.midX - 30}
                    y={path.midY - 12}
                    width="60"
                    height="24"
                    rx="4"
                    className="connection-label-bg"
                  />
                  <text
                    x={path.midX}
                    y={path.midY + 4}
                    className="connection-label-text"
                  >
                    {conn.percent ? `${conn.percent}%` : 'Click'}
                  </text>
                </g>
              </g>
            );
          })}
          
          {/* Connection preview line */}
          {connectingFrom && (
            <line
              x1={getNodeCenter(companies.find(c => c.id === connectingFrom)).x}
              y1={getNodeCenter(companies.find(c => c.id === connectingFrom)).y}
              x2={getNodeCenter(companies.find(c => c.id === connectingFrom)).x}
              y2={getNodeCenter(companies.find(c => c.id === connectingFrom)).y}
              className="connection-preview"
            />
          )}
        </svg>

        {/* Company nodes */}
        {companies.map(company => (
          <div
            key={company.id}
            className={`company-node ${selectedCompany === company.id ? 'selected' : ''} ${connectingFrom === company.id ? 'connecting' : ''} ${dragging === company.id ? 'dragging' : ''}`}
            style={{
              left: company.x,
              top: company.y,
              '--node-color': company.color,
            }}
            onMouseDown={(e) => handleDragStart(e, company)}
            onClick={(e) => {
              e.stopPropagation();
              if (!dragging) {
                if (connectingFrom) {
                  startConnecting(company.id);
                } else {
                  setSelectedCompany(selectedCompany === company.id ? null : company.id);
                }
              }
            }}
          >
            <div className="node-header" style={{ background: company.color }}>
              <span className="node-type">{company.type}</span>
            </div>
            <div className="node-name">{company.name}</div>
            
            {selectedCompany === company.id && (
              <div className="node-actions">
                <button 
                  className="node-action-btn connect"
                  onClick={(e) => {
                    e.stopPropagation();
                    startConnecting(company.id);
                  }}
                  title="Connect to another company"
                >
                  🔗
                </button>
                <button 
                  className="node-action-btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCompany(company.id);
                  }}
                  title="Delete company"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Empty state */}
        {companies.length === 0 && (
          <div className="empty-canvas">
            <p>No companies added yet</p>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              ➕ Add Your First Company
            </button>
          </div>
        )}
      </div>

      {/* Connection Editor */}
      {editingConnection && (
        <div className="connection-editor" onClick={(e) => e.stopPropagation()}>
          <h4>Edit Connection</h4>
          <div className="editor-row">
            <label>Shareholding %</label>
            <input
              type="number"
              value={connectionPercent}
              onChange={(e) => {
                setConnectionPercent(e.target.value);
                updateConnection(editingConnection, 'percent', e.target.value);
              }}
              placeholder="0"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div className="editor-actions">
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => deleteConnection(editingConnection)}
            >
              Delete Connection
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setEditingConnection(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notes Section */}
      <section className="structure-notes">
        <h2>📝 Notes & Context</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about the company structure, shareholding arrangements, legal considerations..."
          rows={6}
        />
      </section>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Company</h3>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                placeholder="Enter company name..."
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Company Type</label>
              <select
                value={newCompanyType}
                onChange={(e) => setNewCompanyType(e.target.value)}
              >
                <option value="holding">Holding Company</option>
                <option value="subsidiary">Subsidiary</option>
                <option value="associate">Associate</option>
                <option value="joint">Joint Venture</option>
                <option value="trust">Trust</option>
                <option value="external">External Entity</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={addCompany}>
                Add Company
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="structure-footer">
        <p>
          <strong>Yellow Mantis Technology Group</strong><br />
          Company Structure Diagram — ID: {structureId}
        </p>
      </footer>
    </div>
  );
};

export default CompanyStructure;

