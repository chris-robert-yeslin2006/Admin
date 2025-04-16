export default function SkillDetails({ name, data }) {
  // Determine the background color based on skill name
  const getGseScoreStyle = () => {
    switch (name) {
      case "Sentence Mastery":
        return { backgroundColor: "#62A9D9" }
      case "Vocabulary":
        return { backgroundColor: "#419CB2" }
      case "Fluency":
        return { backgroundColor: "#8A4B9D" }
      case "Pronunciation":
        return { backgroundColor: "#AD3B59" }
      default:
        return { backgroundColor: "#62A9D9" }
    }
  }

  // Get the understanding text based on skill name
  const getUnderstandingText = () => {
    switch (name) {
      case "Sentence Mastery":
        return "Sentence Mastery reflects the ability to understand, recall and produce English phrases and clauses in complete sentences. Performance depends on accurate syntactic processing and appropriate usage of words, phrases and clauses in meaningful sentence structure."
      case "Vocabulary":
        return "Vocabulary reflects the ability to understand common everyday words spoken in sentence context and to produce such words as needed. Performance depends on familiarity with the form and meaning of everyday words and their use in connected speech."
      case "Fluency":
        return "Fluency reflects the rhythm, phrasing and timing evident in constructing, reading and repeating sentences.Performance depends on familiarity with the form and meaning of everyday words and their use in connected speech."
      case "Pronunciation":
        return "Pronunciation reflects the ability to produce consonants, vowels and stress in a native-like manner in sentence context. Performance depends on knowledge of the phonological structure of everyday words."
      default:
        return ""
    }
  }

  return (
    <div
      className="skill-card"
      style={{
        padding: "8px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid #eaeaea",
        marginBottom: "8px",
        backgroundColor: "#ffffff",
        width: "100%",
        breakInside: "avoid", // CSS property to avoid breaking inside this element
      }}
    >
      <div
        className="skill-card-header"
      >
        <div
          className="skill-name"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#2d3748",
          }}
        >
          {name}
        </div>
        <div
          className="skill-scores"
          style={{
            display: "flex",
            gap: "6px",
          }}
        >
          <div
            className="gse-score"
            style={{
              ...getGseScoreStyle(),
              fontSize: "14px",
              fontWeight: "bold",
              padding: "4px 8px",
              borderRadius: "6px",
              color: "#ffffff",
            }}
          >
            GSE: {data.score}/90
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              padding: "4px 8px",
              color: "rgb(255,0,0)",
            }}
          >
            CEFR: {data.cefr}
          </div>
        </div>
      </div>

      {/* New layout with skill details and understanding side by side */}
      <div
        className="skill-content-container"
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "5px",
          width: "100%",
          minHeight: "100%", // Ensure container takes full height
        }}
      >
        <div
          className="skill-details"
          style={{
            flex: "3",
            visibility: "visible",
            display: "block",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              lineHeight: "1.5",
              color: "#4a5568",
              marginBottom: "8px",
              visibility: "visible",
              display: "block",
            }}
          >
            {data.description}
          </div>

          <div
            style={{
              marginTop: "8px",
              visibility: "visible",
              display: "block",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                marginBottom: "5px",
                color: "#2d3748",
              }}
            >
              Tips to improve:
            </div>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "15px",
                margin: "0",
                visibility: "visible",
              }}
            >
              {data.tips.map((tip, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "5px",
                    fontSize: "13px",
                    lineHeight: "1.4",
                    visibility: "visible",
                    display: "list-item",
                  }}
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side: Skill understanding */}
        <div
          className="skill-understanding"
          style={{
            flex: "2",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            borderRadius: "6px",
            border: "1px solid #eaeaea",
            visibility: "visible",
            display: "flex",
            flexDirection: "column",
            alignSelf: "stretch", // Stretch to match the height of the container
          }}
        >
          <div
            className="understanding-title"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#2d3748",
              marginBottom: "5px",
            }}
          >
            Understanding {name}
          </div>
          <div
            className="understanding-text"
            style={{
              color: "#4a5568",
              lineHeight: "1.5",
              fontSize: "12px",
              flex: "1", // Take remaining space
            }}
          >
            {getUnderstandingText()}
          </div>
        </div>
      </div>
    </div>
  )
}