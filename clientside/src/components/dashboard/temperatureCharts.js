import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
// import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}
//da fare una query su db
const data = [
  createData('00:00', 0),
  createData('03:00', 20),
  createData('06:00', 22),
  createData('09:00', 35),
  createData('12:00', 36),
  createData('15:00', 38),
  createData('18:00', 30),
  createData('21:00', 25),
  createData('24:00', 0),
];

export default function Chart() {
  return (
    <React.Fragment>
      {/* <Title>Temperature di oggi</Title> */}
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Temperature
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}