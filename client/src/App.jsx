import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreateLising from "./pages/CreateLising"
import UpdateListing from "./pages/UpdateListing"
import ListingPage from "./pages/ListingPage"
import SearchPage from "./pages/Search"

function App() {

  return (
    <>
     <BrowserRouter >
        
          <Header />
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/sign-in" element={ <SignIn />} />
            <Route path="/sign-up" element={ <SignUp />} />
            <Route path="/about" element={ <About />} />
            <Route path="/search" element={ <SearchPage />} />
            <Route element={<PrivateRoute />} >
              <Route path="/profile" element={ <Profile />} />
              <Route path="/create-listing" element={<CreateLising />} />
              <Route path="/update-listing/:listingId" element={<UpdateListing />} />
            </Route>
            <Route path="/listing/:listingId" element={<ListingPage/>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
