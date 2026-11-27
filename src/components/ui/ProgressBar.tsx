import { clampPercent } from '../../lib/progress'

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-wash"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clampPercent(percent))}
    >
      <div className="h-full rounded-full bg-ink" style={{ width: `${clampPercent(percent)}%` }} />
    </div>
  )
}
