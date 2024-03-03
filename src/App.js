import React, { useState, useEffect, useRef } from 'react';
import Joyride from 'react-joyride';

const App = () => {
  const [runTour, setRunTour] = useState(false);
  const [steps, setSteps] = useState([]);
  const [queryCount, setQueryCount] = useState(0); // Tracks query submissions
  const contentRef = useRef(null);

  // This useEffect hook reacts to changes in queryCount
  useEffect(() => {
    if (queryCount > 0) { // Ensures the tour is triggered only after a query is made
      setRunTour(true);
    }
  }, [queryCount]); // Depend on queryCount to trigger this effect

  const handleQuery = (query) => {
    if (query.toLowerCase().includes("hello world")) {
      if (contentRef.current) {
        const htmlContent = contentRef.current.innerHTML;
        console.log(htmlContent);
      }
      const dynamicSteps = [
        {
          target: 'body',
          content: 'Welcome to your first step towards "Hello World"!',
          placement: 'center',
        },
        // Add more dynamic steps based on the query
      ];
      setSteps(dynamicSteps);
      setQueryCount((prevCount) => prevCount + 1); // Increment query count to trigger the tour
    } else {
      alert("Query not recognized. Please ask about 'Hello World'.");
    }
  };

  return (
    <div className="App" ref={contentRef}> {/* Attach the ref here to capture the entire App's content */}
      <input
        type="text"
        placeholder="Ask me something..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleQuery(e.target.value);
            e.target.value = ''; // Clear input after query
          }
        }}
      />
      <Joyride
        continuous
        scrollToFirstStep
        showProgress
        showSkipButton
        run={runTour}
        steps={steps}
        callback={(data) => {
          if (data.status === 'finished' || data.status === 'skipped') {
            setRunTour(false); // Ready for the next query to trigger the tour again
          }
        }}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
    </div>
  );
};

export default App;
