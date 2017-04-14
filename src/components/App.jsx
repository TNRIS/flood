import React from 'react'
import { Content, Layout } from 'react-mdl'

import ga from '../util/GoogleAnalytics'
import MapContainer from '../containers/MapContainer'
import NavigationDrawer from '../components/NavigationDrawer'
import Disclaimer from '../components/Disclaimer'
import SubscribeContainer from '../containers/SubscribeContainer'
import AboutContainer from '../containers/AboutContainer'
import ToasterContainer from '../containers/ToasterContainer'
import FloodHeader from './FloodHeader'
import FloodFooter from './FloodFooter'

ga.pageview(window.location.pathname)

const App = () => (
  <div>
    <Disclaimer />
    <SubscribeContainer />
    <AboutContainer />
    <Layout fixedHeader>
      <FloodHeader />
      <NavigationDrawer />
      <Content>
        <MapContainer />
      </Content>
      <FloodFooter />
      <ToasterContainer />
    </Layout>
  </div>
)

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // if (this.props.gage) {
    //   const gageinfo = this.props.gageInfo[this.props.gage.toUpperCase()]
    //   this.props.setCenterAndZoom(gageinfo.latitude, gageinfo.longitude, 13)
    // }

    return (
      <div>
        <Disclaimer />
        <SubscribeContainer />
        <AboutContainer />
        <Layout fixedDrawer style={{background: 'white'}}>
          <NavigationDrawer/>
          <Content>
            <MapContainer
              initialCenter={{
                lat: this.props.params.lat || null,
                lng: this.props.params.lng || null,
                zoom: this.props.params.zoom || null
              }}
              gageCenter={{
                lid: this.props.params.lid || null
              }} />
          </Content>
          <ToasterContainer />
        </Layout>
      </div>
    )
  }
}
