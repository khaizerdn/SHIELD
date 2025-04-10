import React, { useState, useEffect } from 'react';
import '../../css/elements/memberspage.css';
import axios from '../../backend/node_modules/axios';

const MembersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');

    setUserRole(role);
    setCurrentUserEmail(email);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setMessage("No results found.");
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/search', { searchQuery });
      if (response.data.length === 0) {
        setMessage("No results found.");
      } else {
        setMessage('');
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Error searching members:", error);
      setMessage("Error searching members.");
    } finally {
      setLoading(false);
    }
  };

  const toggleVerify = async (member) => {
    try {
      const endpoint = member.is_member
        ? 'http://localhost:8081/unverifyStudent'
        : 'http://localhost:8081/verifyStudent';
      const response = await axios.post(endpoint, { studentId: member.id });

      if (response.data.success) {
        setSearchResults((prevResults) =>
          prevResults.map((m) =>
            m.id === member.id ? { ...m, is_member: !m.is_member } : m
          )
        );
        setMessage(member.is_member ? "Student unverified successfully." : "Student verified successfully.");
      } else {
        setMessage("Error updating verification status.");
      }
    } catch (error) {
      console.error("Error updating verification status:", error);
      setMessage("Error updating verification status.");
    }
  };

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete('http://localhost:8081/deleteUser', {
        data: { email },
      });
      if (response.data.success) {
        setSearchResults((prevResults) =>
          prevResults.filter((member) => member.email !== email)
        );
        setMessage("User deleted successfully.");
      } else {
        setMessage("Error deleting user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user.");
    }
  };

  const shouldShowActions = (member) => {
    return (
      (userRole === 'superadmin' && member.email !== currentUserEmail) ||
      (userRole === 'adviser' && member.role !== 'superadmin' && member.email !== currentUserEmail && member.is_member && member.verified)
    );
  };

  const isCurrentUserStudentOrOther = (member) => {
    return (
      userRole === 'student' ||
      userRole === 'other' ||
      (userRole === 'adviser' && !member.is_member) // Include non-member adviser
    );
  };

  return (
    <div className="memberspage">
      <h1 className="section-title">SHIELD Members</h1>
      <div className="content">
        <div className="table-container">
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, section, or student number"
            />
            <div type="button" tabIndex="0" className="button-see-more" onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </div>
          </div>
          {message && <div className="search-message">{message}</div>}
          <div className="table-wrapper">
            <table className="search-results">
              <thead>
                <tr>
                  {/* Conditionally show 'Actions' or 'Verification Status' column */}
                  {!isCurrentUserStudentOrOther && <th>Actions</th>}
                  <th>Verification Status</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Birthdate</th>
                  <th>Address</th>
                  <th>Program Year/Section</th>
                  <th>Student Number</th>
                  <th>Contact Number</th>
                  <th>Guardian's Full Name</th>
                  <th>Guardian's Number</th>
                  <th>Role</th>
                  <th>Email</th>
                  {/* Conditionally show 'Verification Status' */}

                </tr>
              </thead>
              <tbody>
                {searchResults.map((member) => (
                  <tr key={member.id}>
                    {!isCurrentUserStudentOrOther && (  // Hide Actions column for student or other
                      <td>
                        {shouldShowActions(member) && (
                          <>
                            <div tabIndex="0" className='button-see-more' onClick={() => toggleVerify(member)}>
                              {member.is_member ? 'Unverify' : 'Verify'}
                            </div>
                            <div type="button" tabIndex="0" className="button-see-more" onClick={() => handleDelete(member.email)}>Delete</div>
                          </>
                        )}
                      </td>
                    )}
                    {!isCurrentUserStudentOrOther && (
                      <td>{member.is_member ? 'Verified' : 'Not Verified'}</td>
                    )}
                    {/* Verification status for students and 'other' roles */}
                    {isCurrentUserStudentOrOther && (
                      <td>{member.is_member ? 'Verified' : 'Not Verified'}</td>
                    )}
                    <td>{member.first_name}</td>
                    <td>{member.middle_name}</td>
                    <td>{member.last_name}</td>
                    <td>{member.gender}</td>
                    <td>{new Date(member.birthdate).toLocaleDateString('en-CA')}</td>
                    <td>{member.address}</td>
                    <td>{member.programYearAndSection}</td>
                    <td>{member.student_number}</td>
                    <td>{member.contact_number}</td>
                    <td>{member.guardians_full_name}</td>
                    <td>{member.guardians_number}</td>
                    <td>{member.role}</td>
                    <td>{member.email}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
