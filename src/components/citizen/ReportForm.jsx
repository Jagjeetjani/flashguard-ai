import React, { useState } from 'react';
import { Camera, Send } from 'lucide-react';
import useFloodStore from '../../store/useFloodStore';

const ReportForm = () => {
  const addCitizenReport = useFloodStore(state => state.addCitizenReport);
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    severity: 'Medium'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.location || !formData.description) return;

    const aiAssessment = `Analysis of report at ${formData.location}: The described ${formData.severity.toLowerCase()} severity conditions align with local topography. Recommend field verification.`;
    
    addCitizenReport({
      id: `rep-${Date.now()}`,
      location: formData.location,
      description: formData.description,
      severity: formData.severity,
      timestamp: new Date().toISOString(),
      aiAssessment,
      status: 'REQUIRES VERIFICATION',
      photo: 'simulated-photo.jpg'
    });

    setSubmitted(true);
    setFormData({ location: '', description: '', severity: 'Medium' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-black/5 border border-[#E2E8F0] rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[#172033] mb-4">Submit Flood Report</h2>
      
      {submitted && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-[#25844B]/20 text-[#25844B] rounded-lg text-sm">
          Report submitted successfully! Thank you for your contribution.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#788597] mb-1">Location</label>
          <input 
            type="text" 
            placeholder="e.g., Near Reni Bridge" 
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 text-[#2D3748] focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#788597] mb-1">Description</label>
          <textarea 
            placeholder="Describe what you observed..." 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 text-[#2D3748] focus:outline-none focus:border-blue-500 min-h-[100px]"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#788597] mb-1">Observed Severity</label>
          <select 
            value={formData.severity}
            onChange={(e) => setFormData({...formData, severity: e.target.value})}
            className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 text-[#2D3748] focus:outline-none focus:border-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#788597] mb-1">Photo (Optional)</label>
          <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center text-[#8994A3] cursor-pointer hover:bg-[#EAF3FC]/50 hover:border-[#E2E8F0] transition-colors">
            <Camera size={24} className="mb-2" />
            <span className="text-sm">Click or drag photo here</span>
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full py-2 px-4 bg-[#1976D2] hover:bg-[#1976D2] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Send size={18} />
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
