import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { personService } from '../services/personService';
import './Form.css';

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const item = location.state?.item;

  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    branch: '',
    email: '',
    phone: '',
    semester: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.usn || !formData.branch || !formData.email) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    
    try {
      const response = await personService.addPerson({
        ...formData,
        itemCode: item?.itemCode || ''
      });
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Form submitted successfully!' });
        
        // Navigate back after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to submit form. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <button onClick={() => navigate('/dashboard')} className="btn-back">← Back</button>
          <h2>Lend Item: {item?.itemName || 'Item'}</h2>
          <p>Please fill in all the required details</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="usn">USN *</label>
            <input
              id="usn"
              name="usn"
              type="text"
              placeholder="Enter your USN"
              value={formData.usn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="branch">Branch *</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select your branch</option>
              <option value="CSE">Computer Science Engineering</option>
              <option value="ISE">Information Science Engineering</option>
              <option value="ECE">Electronics and Communication</option>
              <option value="EEE">Electrical and Electronics</option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="CIVIL">Civil Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
            >
              <option value="">Select semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 1234567890"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Submitting...' : 'Submit Form'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
