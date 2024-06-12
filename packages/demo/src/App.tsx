import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Calendar, CalendarBuilder } from '@duchi-timeline/core';

function App() {
  const [count, setCount] = useState(0);
  const [mainCalendar, setMainCalendar] = useState(
    new CalendarBuilder()
      .setMeta({
        currentDate: new Date(),
        timeScale: 'day',
        isSubCalendar: false,
      })
      .setRange()
      .setCells()
      .build(),
  );

  const calendarManager = new Calendar(mainCalendar);
  console.log(calendarManager.mainCalendar?.cells);

  const handlePrevious = () => {
    setMainCalendar(calendarManager.attachPreviousCells().mainCalendar);
    console.log(mainCalendar);
  };

  const handleNext = () => {
    setMainCalendar(calendarManager.attachNextCells().mainCalendar);
    console.log(mainCalendar);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="calendar-wrap">
        {mainCalendar.cells.map((cell) => (
          <div className="calendar-cell">{cell.formattedDate}</div>
        ))}
      </div>
      <div className="card">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleNext}>Next</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
