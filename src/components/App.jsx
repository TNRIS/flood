import React from 'react'
import { Content, Layout, Header, Navigation, Footer, FooterSection, FooterLinkList } from 'react-mdl'

import ga from '../util/GoogleAnalytics'
import MapContainer from '../containers/MapContainer'
import NavigationDrawer from '../components/NavigationDrawer'
import Disclaimer from '../components/Disclaimer'
import SubscribeContainer from '../containers/SubscribeContainer'
import AboutContainer from '../containers/AboutContainer'
import ToasterContainer from '../containers/ToasterContainer'

import TexasFloodLogoImage from '../images/texas_flood_logo_transparent.png'
import AboutLinkContainer from '../containers/AboutLinkContainer'
import ContactLink from './ContactLink'

ga.pageview(window.location.pathname)

function showGeocoder() {
  const geocoderControl = document.getElementById("geocoder")
  // geocoderControl.className = "showGeocoder"
  geocoderControl.classList.toggle("showGeocoder")
}

const contactLink = "mailto:tnrisdatasupport@twdb.texas.gov?subject=TexasFlood.org Version: " + VERSION
const App = () => (
  <div>
    <Disclaimer />
    <SubscribeContainer />
    <AboutContainer />
    <Layout fixedHeader>
      <Header transparent style={{color: 'white'}}>
        <div className="header__title">
          <a href="http://texasflood.org" target="_blank">
            <img src={TexasFloodLogoImage} alt="The Texas Flood dot org logo"/>
          </a>
        </div>
        <Navigation className="header__navigation">
          <a href="#"
             onClick={ showGeocoder }><i className="material-icons">search</i></a>
        </Navigation>
      </Header>
      <NavigationDrawer/>
      <Content>
        <MapContainer />
      </Content>
      <Footer size="mini">
        <FooterSection>
          <FooterLinkList>
            <AboutLinkContainer />
            <ContactLink text="contact"
                          href={contactLink}
                          target="_top" />
            <a href="http://www.twdb.texas.gov/flood/prep/" target="_blank">resources</a>
          </FooterLinkList>
        </FooterSection>
      </Footer>
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
