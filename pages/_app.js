import AppContext from "../context/appContext"
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import "../styles/index.css";
function MyApp({ Component, pageProps }) {
  return (
        <Index>
      <Component {...pageProps} />
        </Index>
  )
}

export default MyApp


const Index = ({ children })=>{
  return (
      <AppContext>
        { children }
      </AppContext>
  )
}