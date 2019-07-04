import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
// import Title from './Title';





class GenericChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      title: this.props.title
    }
  }
  componentWillMount(){
    this.props.query().then(data => {
      this.setState({data: data})
    })      
  }

  render() {
    const { data, title } = this.state
    const { xVar , yVar } = this.props
    return (<>
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
          <XAxis dataKey={xVar} />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              {title}
            </Label>
          </YAxis>
          <Line type="monotone" dataKey={yVar} stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
    )
  }

}
export default GenericChart