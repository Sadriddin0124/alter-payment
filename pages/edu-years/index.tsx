import EduYearsModal from "@/components/edu-years/edu-years-modal";
import YearTable from "@/components/edu-years/edu-years-table";
import Typography from "@/components/ui/typography";
import React from "react";

const EduYears = () => {
  const [page, setPage] = React.useState(1);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between mt-8" >
        <Typography variant="h1">Oʻquv yillari</Typography>
        <EduYearsModal setPage={setPage} />
      </div>

      <YearTable page={page} setPage={setPage} />
    </div>
  );
};

export default EduYears;
