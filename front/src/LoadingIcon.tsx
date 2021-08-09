import SyncLoader from 'react-spinners/SyncLoader'

export default function LoadingIcon() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <SyncLoader />
      </div>
    </div>
  )
}
