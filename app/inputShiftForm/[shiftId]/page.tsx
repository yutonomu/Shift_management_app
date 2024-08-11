// シフト情報を編集するフォーム
import React from 'react'

function Hogehoge({params}: {params: {shiftId: string}}) {
  return (
    <div>{params.shiftId}</div>
  )
}

export default Hogehoge