import React from 'react';
import { useParams } from 'react-router-dom';
import { useBoardChartQuery } from '../../../services/api';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Chart = () => {
  const { id:boardId } = useParams();
  const { data: chartData, isSuccess: chartIsSuccess } = useBoardChartQuery(parseInt(boardId))

  const statusPieChart =  chartIsSuccess && [
    {name: "open", value: chartData.open, color: "#FFFF00"},
    {name: "in progress", value: chartData.in_progress, color: "#FF7F00"},
    {name: "need assistance", value: chartData.need_assistance, color: "#0000FF"},
    {name: "on hold", value: chartData.on_hold, color: "#EBC334"},
    {name: "client review", value: chartData.client_review, color: "#9400D3"},
    {name: "verify and close", value: chartData.verify_and_close, color: "#4B0082"},
    {name: "done", value: chartData.done, color: "#00FF00"},
  ]

  const priorityPieChart =  chartIsSuccess && [
    {name: "urgent", value: chartData.urgent, color: "#EBC334"},
    {name: "high", value: chartData.high, color: "#FF7403"},
    {name: "normal", value: chartData.normal, color: "#FFDD03"},
    {name: "low", value: chartData.low, color: "#0000FF"},
    {name: "no priority", value: chartData.no_priority, color: "#808080"},
  ]

  const boardProgressChart = chartIsSuccess && [
    {name: "Completed", value: chartData.checked, color: "#00FF00"},
    {name: "InComplete", value: chartData.unchecked, color: "#0000FF"}
  ]

  const statusColors = ["#FFFF00", "#FF7F00", "#0000FF", "#EBC334", "#9400D3", "#4B0082", "#00FF00"]
  const priorityColors = ["#EBC334", "#FF7403", "#FFDD03", "#0000FF", "#808080"]
  const boardProgressColors = ["#00FF00", "#0000FF"]
  
  return (
    <div>
      <section className='chart-section-1' >
        {
          chartIsSuccess && 
          <div className='chart-card-1' >
            <div className='chart-contain-1' >
              <ResponsiveContainer width={'100%'} height={'100%'}>
                <PieChart margin={{
                    top: -100,
                    right: 30,
                    left: -10,
                    bottom: 0,
                  }} 
                >
                  <Pie
                    data={statusPieChart}
                    cx={120}
                    cy={200}
                    innerRadius={80}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusPieChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <h2 className='chart-label-1' >Status Count</h2>
              <div>
                <ul style={{listStyle:"none"}} >
                  {
                    statusPieChart.map((item, index)=> (
                      <li key={index} className="chart-desc" >
                        <div style={{background:item.color}} className="chart-desc-color"></div> 
                        <p className='chart-desc-label' >{item.name}  </p>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className='chart-contain-1' >
              <ResponsiveContainer width={'100%'} height={'100%'}>
                <PieChart margin={{
                    top: -100,
                    right: 30,
                    left: -10,
                    bottom: 0,
                  }} 
                >
                  <Pie
                    data={priorityPieChart}
                    cx={120}
                    cy={200}
                    innerRadius={80}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {priorityPieChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={priorityColors[index % priorityColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <h2 className='chart-label-1' >Priority Count</h2>
              <div>
                <ul style={{listStyle:"none"}} >
                  {
                    priorityPieChart.map((item, index)=> (
                      <li key={index} className='chart-desc' >
                        <div style={{background:item.color}} className="chart-desc-color" ></div> 
                        <p className='chart-desc-label' >{item.name}  </p>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        }
      </section>
      <section className='chart-section-2'>
        {
          chartIsSuccess && 
          <div className='chart-contain-2' >
            <ResponsiveContainer width={'100%'} height={'100%'}>
                <PieChart margin={{
                    top: -100,
                    right: 30,
                    left: -10,
                    bottom: 0,
                  }} 
                >
                  <Pie
                    data={boardProgressChart}
                    cx={150}
                    cy={260}
                    innerRadius={100}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {boardProgressChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={boardProgressColors[index % boardProgressColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <h2 className='chart-label-2' >Status Count</h2>
              <div>
                <ul style={{listStyle:"none"}} >
                  {
                    boardProgressChart.map((item, index)=> (
                      <li key={index} className='chart-desc' >
                        <div style={{background:item.color}} className="chart-desc-color" ></div> 
                        <p className='chart-desc-label' >{item.name}  </p>
                      </li>
                    ))
                  }
                  <li className='chart-desc' > <h4> 
                      {((chartData.checked/chartData.checklists_total) * 100).toFixed(2)}
                      %{" "} of tasks completed
                    </h4> 
                  </li>
                </ul>
              </div>
          </div>
        }
      </section>
    </div>
  )
}

export default Chart