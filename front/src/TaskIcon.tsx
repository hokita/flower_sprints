type TaskIconProps = {
  isDone: boolean
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
}

const TaskIcon: React.FC<TaskIconProps> = ({ isDone, onClick }) => {
  let classNames = ['material-icons', 'md-48', 'md-dark']
  if (!isDone) {
    classNames.push('md-inactive')
  }

  return (
    <span className={classNames.join(' ')} onClick={onClick}>
      filter_vintage
    </span>
  )
}

export default TaskIcon
