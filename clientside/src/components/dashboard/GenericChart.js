import React from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer,Area,Tooltip } from 'recharts';
// import Title from './Title';





class GenericChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      title: this.props.title
    }
  }
  componentWillMount() {
    this.props.query().then(data => {
      this.setState({ data: data })
    })
  }

  render() {
    const { data } = this.state
    const { xVar, yVar, yVar2 } = this.props
    return (<>
      <ResponsiveContainer>
      <AreaChart width={730} height={250} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xVar} />
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey={yVar} stroke="#8884d8" fillOpacity={1} fill="url(#colorTemp)" />
          <Area type="monotone" dataKey={yVar2} stroke="#82ca9d" fillOpacity={1} fill="url(#colorHumidity)" />
        </AreaChart>
      </ResponsiveContainer>
    </>
    )
  }

}
export default GenericChart