import '../App.css'
import { DAYS, HOURS, formatTimeRange } from '../utils/scheduleUtils'

function BlockEditPanel({ schedule, newBlock, onChange, onAdd, onRemoveBlock }) {
  return (
    <div className="edit-panel">
      <div className="block-list">
        {schedule.blocks.length === 0 && <p className="hint-text">아직 등록된 수업이 없어요.</p>}
        {schedule.blocks.map((block) => (
          <div className="block-item" key={block.id}>
            <div>
              <strong>{block.subject}</strong>
              <span>{`${block.day} · ${formatTimeRange(block.start, block.duration)} · ${block.room}`}</span>
            </div>
            <button type="button" className="ghost-button danger" onClick={() => onRemoveBlock(block.id)}>
              삭제
            </button>
          </div>
        ))}
      </div>
      <div className="edit-form">
        <div className="edit-form-row">
          <input
            type="text"
            placeholder="과목명"
            value={newBlock.subject}
            onChange={(event) => onChange('subject', event.target.value)}
          />
          <input
            type="text"
            placeholder="교수명"
            value={newBlock.professor}
            onChange={(event) => onChange('professor', event.target.value)}
          />
        </div>
        <div className="edit-form-row">
          <select value={newBlock.day} onChange={(event) => onChange('day', event.target.value)}>
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={HOURS[0]}
            max={HOURS[0] + HOURS.length - 1}
            placeholder="시작 (시)"
            value={newBlock.start}
            onChange={(event) => onChange('start', event.target.value)}
          />
          <input
            type="number"
            min={1}
            max={4}
            placeholder="길이 (시간)"
            value={newBlock.duration}
            onChange={(event) => onChange('duration', event.target.value)}
          />
        </div>
        <div className="edit-form-row">
          <input
            type="text"
            placeholder="강의실"
            value={newBlock.room}
            onChange={(event) => onChange('room', event.target.value)}
          />
          <input
            type="text"
            placeholder="구분 (전공/교양 등)"
            value={newBlock.type}
            onChange={(event) => onChange('type', event.target.value)}
          />
        </div>
        <button type="button" className="primary-button" onClick={onAdd}>
          수업 추가
        </button>
      </div>
    </div>
  )
}

export default BlockEditPanel

