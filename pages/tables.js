import ComponentChildren from "../src/components/Home/ComponentChildrenTables"
import ComponentFather from "../src/components/Home/ComponentFather"
import AmenitiesState from "../src/context/amenities/amenitiesState"

const App = () => {
  return (<AmenitiesState>
    <ComponentFather>
        <ComponentChildren/>
    </ComponentFather>
  </AmenitiesState>)
}

export default App
