import { Outlet } from "react-router-dom"
import NavbarPanel from "./NavbarPanel"
import { Provider } from "react-redux"
import store from "../store/Store"

const Layout = () => {
  return (
    <>
      <Provider store={store}>
        <NavbarPanel/>
          <main>
            <Outlet />
          </main>
      </Provider>
    </>
  )
}

export default Layout