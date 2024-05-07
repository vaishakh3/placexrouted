import React, { useState, useEffect } from 'react';
import './mentor.css'; 
import Navbar from'../Navbar'
import Footer from '../Components/Footer'

// Sample data for people
const peopleData = [
  { id: 1, name: 'Hadi Abdullah', job: 'Flutter Developer', imageUrl: 'https://media.licdn.com/dms/image/C4E03AQHEqrbb_tFfsA/profile-displayphoto-shrink_800_800/0/1638286261142?e=1720656000&v=beta&t=aHUVYzB4Yep64BIzwqM01nTlwPdswasoybaP_NUDMNk', appointments: [] },
  { id: 2, name: 'Jane Smith', job: 'Web Designer', imageUrl: 'https://www.automotivaters.com/sites/default/files/images/CamHead2018-150x150px.jpg', appointments: [] },
  { id: 3, name: 'Alice Johnson', job: 'Software Engineer', imageUrl: 'https://img.freepik.com/free-photo/smiling-confident-businesswoman-posing-with-arms-folded_1262-20950.jpg?w=740&t=st=1714987337~exp=1714987937~hmac=6c9c2ff67b8e757cc970ac5d8308c95fefb02008569001b8e7415328bd7f0020', appointments: [] },
  { id: 4, name: 'Anjali k', job: 'Data Scientist', imageUrl: 'https://www.shutterstock.com/image-photo/headshot-portrait-confident-young-indian-260nw-2021632466.jpg', appointments: [] },
  // Add more people as needed
];

const PersonCard = ({ person, onCardClick, isSelected }) => {
  return (
    
    <div className={`person-card ${isSelected ? 'selected' : ''}`} onClick={() => onCardClick(person)}>
      <img src={person.imageUrl} alt={person.name} />
      <h3>{person.name}</h3>
      <p>{person.job}</p> {/* Display the job information */}
    </div>
  );
};

const Mentor = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleCardClick = (person) => {
    if (selectedPerson && selectedPerson.id === person.id) {
      // Deselect the person if already selected
      setSelectedPerson(null);
    } else {
      setSelectedPerson(person);
    }
  };

  useEffect(() => {
    // Load Calendly script when component mounts
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Clean up function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Navbar/>
      <h1 className='head'>1-on-1 Mentoring</h1>
      <div className="containerj">
        {peopleData.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onCardClick={handleCardClick}
            isSelected={selectedPerson && selectedPerson.id === person.id}
          />
        ))}
      </div>
      <div className="calendly-inline-widget" data-url="https://calendly.com/hadiabdullaah33" style={{ minWidth: '320px', height: '700px' }} />
      <Footer/>
    </div>
  );
};

export default Mentor;
