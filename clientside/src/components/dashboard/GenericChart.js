import React from 'react';
import {
  AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area,
  Tooltip, Legend
} from 'recharts';
import { RingLoader } from 'react-spinners'
import { Grid } from '@material-ui/core'



class GenericChart extends React.Component {

  render() {

    const { xVar, yVar, yVar2, data, render } = this.props
    if (render)
      return (
        <ResponsiveContainer width="90%" height="100%">
          <AreaChart data={data}
            margin={{ top: 15, right: 30, left: 0, bottom: 15 }}>
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
            <Legend verticalAlign="top" height={36} />
            <XAxis dataKey={xVar}
              domain={[0.0, 23.59]}
            />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area animationDuration={2000}
              name="Temperatura" type="monotone" dataKey={yVar} stroke="#8884d8" fillOpacity={1} fill="url(#colorTemp)" />
            <Area animationDuration={1000}
              name="Umidità" type="monotone" dataKey={yVar2} stroke="#82ca9d" fillOpacity={1} fill="url(#colorHumidity)" />
          </AreaChart>
        </ResponsiveContainer>
      )
    else
      return (
        <Grid container justify='center' alignItems='center'>
          <Grid item>
            <RingLoader
              sizeUnit={"vh"}
              size={3}
              color={'#ff9800'}
            />
          </Grid>
        </Grid>

      )
  }

}
export default GenericChart