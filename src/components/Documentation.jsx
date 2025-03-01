import React from "react";
import { useState, useEffect } from "react";
import {subjects} from "../constant/index.jsx"


const Documentation = () => {
  const [completedTopics, setCompletedTopics] = useState({})
  const [selectedSubject, setSelectedSubject] = useState(null)

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("completedTopics")) || {}
    setCompletedTopics(savedProgress);
  }, [])

  useEffect(() => {
    if (Object.keys(completedTopics).length > 0) {
      localStorage.setItem("completedTopics", JSON.stringify(completedTopics))
    }
  }, [completedTopics])
  

  const toggleOnCompletion = (subjectId, topicId) => {
    setCompletedTopics((prev) => {
      const updated = { ...prev }
      if (!updated[subjectId]) updated[subjectId] = []
      updated[subjectId] = updated[subjectId].includes(topicId)
        ? updated[subjectId].filter((id) => id !== topicId)
        : [...updated[subjectId], topicId]
      return updated
    })
  }

  const getProgressbar = (subjectId) => {
    const total = subjects.find((sub) => sub.id === subjectId).topics.length
    const completed = completedTopics[subjectId]?.length || 0
    return (completed / total) * 100;
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Documentation of Topic wise</h1>

      {/* This theCards */}
      {!selectedSubject && (
        <div className="border grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="p-4 bg-white shadow-md rounded-md cursor-pointer"
              onClick={() => setSelectedSubject(subject.id)}
            >
              <h2 className="text-lg font-semibold mb-2">{subject.name}</h2>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="h-4 bg-green-500 rounded-full"
                  style={{ width: `${getProgressbar(subject.id)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Documentation start from here */}
      {selectedSubject && (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setSelectedSubject(null)}
          >
            Back to Subjects
          </button>
          <div className="flex">
            {/* this is the Sidebar for subjects */}
            <aside className="w-64 bg-white p-4 shadow-lg">
              <h2 className="text-lg font-bold">Topics</h2>
              <ul>
                {subjects
                  .find((sub) => sub.id === selectedSubject)
                  .topics.map((topic) => (
                    <li key={topic.id} className="flex items-center gap-2 py-2">
                      <input
                        type="checkbox"
                        checked={completedTopics[selectedSubject]?.includes(topic.id) || false}
                        onChange={() => toggleOnCompletion(selectedSubject, topic.id)}
                        className="h-4 w-4 text-blue-500"
                      />
                      {topic.name}
                    </li>
                  ))}
              </ul>
            </aside>

            {/* inner side Content */}
            <div className="flex-1 p-6">
              {subjects
                .find((sub) => sub.id === selectedSubject)
                .topics.map((topic) => (
                  <div key={topic.id} className="mb-6 p-4 bg-white shadow-md rounded-md">
                    <h3 className="text-xl font-semibold">{topic.name}</h3>
                    <p className="text-gray-600">Lorem ipsum content for {topic.name}...</p>
                    <button
                      onClick={() => toggleOnCompletion(selectedSubject, topic.id)}
                      className={`mt-2 px-4 py-2 rounded-md text-white transition duration-300 ${
                        completedTopics[selectedSubject]?.includes(topic.id)
                          ? "bg-green-500" : "bg-blue-800"
                      }`}
                    >
                      {completedTopics[selectedSubject]?.includes(topic.id)
                        ? "Marking as Incomplete"
                        : "Marking as Completed"}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Documentation




