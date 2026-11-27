import { Link } from 'react-router-dom'
import type { Goal } from '../db/schema'
import { deadlineInfo, deadlineText, STATUS_LABEL, TYPE_LABEL } from '../lib/deadline'
import { computeProgress, type GoalStats } from '../lib/progress'
import { ProgressBar } from './ui/ProgressBar'

export function GoalCard({
  goal,
  stats,
  categoryName,
  today,
  large,
}: {
  goal: Goal
  stats: GoalStats
  categoryName: string
  today: string
  large?: boolean
}) {
  const info = deadlineInfo(goal, today)
  const progress = computeProgress(goal, stats)
  const date = deadlineText(goal)

  return (
    <Link
      to={`/goals/${goal.id}`}
      className={`block rounded-lg border bg-white p-4 transition-colors hover:border-ink ${
        info.tone === 'past' ? 'border-l-4 border-line border-l-ink' : 'border-line'
      } ${large ? 'sm:p-5' : ''}`}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="label-caps truncate">
          {categoryName} · {TYPE_LABEL[goal.type]}
        </span>
        <span className="shrink-0 text-xs text-mute">
          {[goal.pinned && 'Pinned', goal.status !== 'active' && STATUS_LABEL[goal.status]].filter(Boolean).join(' · ')}
        </span>
      </div>
      <h3 className={`${large ? 'text-2xl' : 'text-xl'} leading-snug`}>{goal.title}</h3>
      <p className="mt-1 text-sm text-mute">
        {date && <span>{date} · </span>}
        <span className={info.tone === 'soon' ? 'font-medium text-ink' : ''}>{info.text}</span>
      </p>
      {(progress.percent !== null || progress.summary) && (
        <div className="mt-3">
          {progress.percent !== null && <ProgressBar percent={progress.percent} />}
          <div className="mt-1.5 flex justify-between text-xs text-mute">
            <span>{progress.summary}</span>
            {progress.percent !== null && (
              <span className="font-medium text-ink">{Math.round(progress.percent)}%</span>
            )}
          </div>
        </div>
      )}
    </Link>
  )
}
