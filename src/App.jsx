
import './App.css'
import ProfileCard from './components/ProfileCard.jsx'

function App() {
  

  return (
    <div>
      <h1>My Personal Profile Card</h1>

      <ProfileCard
        name="Aanchal Upreti"
        title="Aspiring Frontend Developer"
        email="aanchal@example.com"
        phone="9876543210"
        location="Bengaluru"
        skills={["HTML", "CSS", "JavaScript", "React", "Java"]}
        github="github.com/aanchal245"
      />

    </div>
  )
}

export default App