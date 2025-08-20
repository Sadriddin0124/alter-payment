import YearTable from '@/components/edu-years/edu-years-table'
import Typography from '@/components/ui/typography'
import React from 'react'

const EduYears = () => {
  return (
    <div className='flex flex-col gap-8'>

        <Typography variant="h1">Oʻquv yillari</Typography>

        <YearTable/>
    </div>
  )
}

export default EduYears