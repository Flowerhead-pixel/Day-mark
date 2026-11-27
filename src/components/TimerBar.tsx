import { Link, useLocation } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import { pauseTimer, resumeTimer, stopTimer, useTimer } from '../lib/timer'
import { formatClock } from '../lib/time'
import { Button } from './ui/Button'

/** A slim bar shown on every screen (except Time) while a timer exists. */
export function TimerBar() {
  const { timer, elapsedSeconds } = useTimer()
  const { pathname } = useLocation()
  const activity = useLiveQuery(
    () => (timer ? db.activities.get(timer.activityId) : undefined),
    [timer?.activityId],
  )
  if (!timer || pathname === '/time') return null

  return (
    <div className="sticky top-0 z-30 -mx-4 mb-6 flex items-center justify-between gap-3 border-b border-line bg-paper px-4 py-2 md:-mx-10 md:px-10">
      <Link to="/time" className="min-w-0 flex-1 truncate text-sm">
        <span className="text-mute">{timer.state === 'running' ? 'Timing' : 'Paused'} · </span>
        {activity?.name ?? 'Activity'}
        <span className="ml-2 font-serif tabular-nums">{formatClock(elapsedSeconds)}</span>
      </Link>
      {timer.state === 'running' ? (
        <Button small onClick={pauseTimer}>
          Pause
        </Button>
      ) : (
        <Button small variant="primary" onClick={resumeTimer}>
          Resume
        </Button>
      )}
      <Button small variant="primary" onClick={() => stopTimer()}>
        Stop
      </Button>
    </div>
  )
}
