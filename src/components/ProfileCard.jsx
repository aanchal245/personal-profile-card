
import { useState, useEffect, useRef } from 'react'

function ProfileCard({
  name,
  title,
  email,
  phone,
  location,
  skills,
  github
}) {

  // 1. State for Likes
  const [likes, setLikes] = useState(0)

  // 2. State for Editable Name
  const [editedName, setEditedName] = useState(() => {
    const savedName = localStorage.getItem("profileName")

    return savedName !== null ? savedName : name
  })

  // 3. State for New Skill Input
  const [newSkill, setNewSkill] = useState("")

  // 4. State for Skills List
  const [skillList, setSkillList] = useState(() => {
    const savedSkills = localStorage.getItem("profileSkills")

    return savedSkills !== null
      ? JSON.parse(savedSkills)
      : skills
  })

  // 5. State for Availability
  const [isAvailable, setIsAvailable] = useState(true)

  // 6. Ref for Skill Input
  const skillInputRef = useRef(null)


  // EFFECT 1: Update browser tab title when likes change
  useEffect(() => {
    document.title = `${likes} Likes - My Profile`
  }, [likes])


  // EFFECT 2: Save edited name in Local Storage
  useEffect(() => {
    localStorage.setItem("profileName", editedName)
  }, [editedName])


  // EFFECT 3: Save skills in Local Storage
  useEffect(() => {
    localStorage.setItem(
      "profileSkills",
      JSON.stringify(skillList)
    )
  }, [skillList])


  // FUNCTION 1: Greeting
  function handleGreeting() {
    alert("Hello! Welcome to my profile.")
  }


  // FUNCTION 2: Handle Name Change
  function handleNameChange(event) {
    setEditedName(event.target.value)
  }


  // FUNCTION 3: Handle Skill Input Change
  function handleSkillChange(event) {
    setNewSkill(event.target.value)
  }


  // FUNCTION 4: Add New Skill
  function handleAddSkill(event) {
    event.preventDefault()

    if (newSkill.trim() === "") {
      return
    }

    setSkillList([...skillList, newSkill.trim()])

    setNewSkill("")
  }


  // FUNCTION 5: Delete Skill
  function handleDeleteSkill(skillToDelete) {
    setSkillList(
      skillList.filter((skill) => skill !== skillToDelete)
    )
  }


  // FUNCTION 6: Focus Skill Input using useRef
  function handleFocusInput() {
    skillInputRef.current?.focus()
  }


  return (
    <div className="profile-card">

      {/* Profile Information */}

      <h2>{editedName}</h2>

      <p>{title}</p>


      {/* Edit Name */}

      <input
        type="text"
        value={editedName}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />


      {/* Contact Information */}

      <h3>Contact Information</h3>

      <p>Email: {email}</p>

      <p>Phone: {phone}</p>

      <p>Location: {location}</p>


      {/* Conditional Rendering: GitHub */}

      {github && (
        <p>GitHub: {github}</p>
      )}


      {/* Conditional Rendering: Availability */}

      <h3>Availability</h3>

      {isAvailable ? (
        <p>I am available for opportunities!</p>
      ) : (
        <p>I am currently unavailable.</p>
      )}

      <button
        type="button"
        onClick={() => setIsAvailable(!isAvailable)}
      >
        Change Availability
      </button>


      {/* Skills Section */}

      <h3>My Skills</h3>

      {skillList.map((skill, index) => (
        <div className="skill-item" key={`${skill}-${index}`}>

          <span>{skill}</span>

          <button
            type="button"
            onClick={() => handleDeleteSkill(skill)}
          >
            Delete
          </button>

        </div>
      ))}


      {/* Add New Skill */}

      <h3>Add a New Skill</h3>

      <form onSubmit={handleAddSkill}>

        <input
          type="text"
          value={newSkill}
          onChange={handleSkillChange}
          placeholder="Enter a skill"
          ref={skillInputRef}
        />

        <button type="submit">
          Add Skill
        </button>

      </form>


      {/* Focus Input Button */}

      <button
        type="button"
        onClick={handleFocusInput}
      >
        Focus Skill Input
      </button>


      {/* Likes Section */}

      <h3>{likes} Likes</h3>

      <button
        type="button"
        onClick={() => setLikes(likes + 1)}
      >
        Like
      </button>


      {/* Greeting Button */}

      <button
        type="button"
        onClick={handleGreeting}
      >
        Say Hello
      </button>

    </div>
  )
}

export default ProfileCard
