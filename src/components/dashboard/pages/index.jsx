import LineGraph from "./components/LineChart"
import StatCard from "./components/StatCard"
import TwoLevelPieChart from "./components/TwoLevelPieChart"
import SimpleBarChart from "./components/SimpleBarChart"
import StackBarChart from "./components/StackBarChart"
const Index = () =>{


    return(

        <>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 p-4 auto-rows-fr">

  {Array.from({ length: 6 }).map((_, index) => (

        <StatCard className="w-full h-40 p-4 bg-white/30 rounded-xl shadow-md flex flex-col justify-between"/>
  ))}

    <div className="col-span-4 row-span-2 rounded-lg p-2 bg-white/30">
    <LineGraph ></LineGraph>
  </div>

  {/* Card 2: 2 columns wide, 2 rows tall */}
  <div className="col-span-2 row-span-2 bg-white/30 rounded-lg">
    <TwoLevelPieChart/>
  </div>
  <div className="col-span-3 row-span-2 bg-white/30 rounded-lg">
    <SimpleBarChart></SimpleBarChart>
  </div>
  <div className="col-span-3 row-span-2 bg-white/30 rounded-lg">
    <StackBarChart></StackBarChart>
  </div>

</div>




        
        </>
    )
}
export default Index