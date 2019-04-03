import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { setJwtCookie, getUser } from "../services/AuthService";

class Dashboard extends Component {


    state = {
      // for filter 
        buildings: [],
        // for all the posts
        allBuildings: []
    };
    componentDidMount() {
        let url = `${apiUrl}/buildings`;
        console.log(url);
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status > 299) this.setState({
                    err: data.message
                });
                else {
                    console.log(data)
                    this.setState({
                        buildings: data.buildings,
                        allBuildings: data.buildings
                    });


                }
            })
            .catch(e => console.log(e));
    };

    // for filter by Gender
    filterByGender = (event) => {
      const gender = event.target.value;
      if (gender === "Both") {
        this.setState({ buildings: this.state.allBuildings })
      } else {
        const filteredBuildings = this.state.allBuildings.filter((building) => building.gender === gender)
        this.setState({buildings: filteredBuildings})
      }
    }


// for filter by Type
  filterByType = (event) => {
    const type = event.target.value;
     const filteredBuildings = this.state.allBuildings.filter((building) => building.type === type)
    this.setState({ buildings: filteredBuildings })
    
  }

    render() {
        return (
          <div>

            <select onChange={this.filterByGender} class="custom-select">
              <option selected>Select by Gender</option>

              <option value="Both">Both</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>

            <select onChange={this.filterByType} class="custom-select">

              <option selected>Select by Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Room">Room</option>
              <option value="Roommates">Roommates</option>
            
            </select>


            <div className="pt-5 mt-5">
                {this.state.buildings.map((building, index) => (
                    <div className="bulidingsDashbord xxxx"
                        onClick={() => { console.log(this.props); this.props.changeActiveBulding(building) }} >
                        {/* < div className="container xxxx " > */}
                        < div className="rowDahbord textInPost" >
                            <div class="columnDashbord">
                                < img className="imageDashbord" key={index + 'type'} src={building.image} />
                                {/* <p key={index+ 'location'}> Location: {building.location}</p>
                                 <p key={index + 'type'} > Type: {building.type}</p>  */}
                                <p className="textCityDashbord" key={index + 'city'}> City:{building.city}</p>
                                <p className="textGenderDashbord" key={index + 'gender'}> Gender:{building.gender}</p>
                                {/* <p key={index + 'description'}> description:{building.description}</p> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        );
    }
}



export default Dashboard;
