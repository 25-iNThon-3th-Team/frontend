import '../App.css'
import { DAYS, HOURS, hourToRow } from '../utils/scheduleUtils'

function SchedulePreview({ blocks = [] }) {
  return (
    <div className="schedule-grid">
      <div className="schedule-grid-header">
        <span />
        {DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="schedule-grid-body">
        <div className="time-column">
          {HOURS.map((hour) => (
            <span key={hour}>{`${hour}:00`}</span>
          ))}
        </div>
        {DAYS.map((day) => (
          <div className="day-column" key={day}>
            <div className="day-body" style={{ gridTemplateRows: `repeat(${HOURS.length}, 52px)` }}>
              {blocks
                .filter((block) => block.day === day)
                .sort((a, b) => a.start - b.start)
                .map((block) => (
                  <div
                    key={block.id}
                    className="schedule-block"
                    style={{
                      gridRow: `${hourToRow(block.start)} / span ${block.duration}`,
                      backgroundColor: block.color
                    }}
                  >
                    <strong>{block.subject}</strong>
                    <span>{`${block.room} · ${block.type}`}</span>
                    <span className="professor">{block.professor}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchedulePreview

