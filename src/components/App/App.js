import React, { Component } from 'react';
import './App.css';
import Navbar from './../Navbar/Navbar';
import Main from './../Main/Main';
import { BASE_IMAGES_URL, fetchDataByCategoryName } from '../../services/service';
console.log(React.version);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            people: [],
            planets: [],
            starShips: [],
            activePage: 'people',
        };
    }

    componentDidMount() {
        this.getPeople();
    }

    getPeople = () => {
        this.setState({
            loading: this.state.people.length === 0,
            activePage: 'people',
        });

        fetchDataByCategoryName('people')
            .then((response) => {
                const arrPosts = response.results.map((post, i) => {
                    const { name, gender, birth_year, eye_color } = post;
                    const id = i + 1;
                    return {
                        id,
                        name,
                        img: `${`${BASE_IMAGES_URL}characters/${id}`}.jpg`,
                        content: { gender, birth_year, eye_color },
                    };
                });
                this.setState({
                    loading: false,
                    people: arrPosts,
                    dataToRender: arrPosts,
                });
            })
            .catch(() =>
                this.setState({
                    error: true,
                })
            );
    };

    getPlanets = () => {
        this.setState({
            loading: this.state.planets.length === 0,
            activePage: 'planets',
        });

        fetchDataByCategoryName('planets')
            .then((response) => {
                const arrPosts = response.results.map((post, i) => {
                    const { name, rotation_period, orbital_period, diameter } = post;
                    const id = i + 1;
                    return {
                        id,
                        name,
                        img: `${`${BASE_IMAGES_URL}planets/${id}`}.jpg`,
                        content: { rotation_period, orbital_period, diameter },
                    };
                });
                this.setState({
                    loading: false,
                    planets: arrPosts,
                });
            })
            .catch(() =>
                this.setState({
                    error: true,
                })
            );
    };

    getStarShips = () => {
        this.setState({
            loading: this.state.starShips.length === 0,
            activePage: 'starShips',
        });

        fetchDataByCategoryName('starships')
            .then((response) => {
                const arrPosts = response.results.map((post, i) => {
                    const { name, model, consumables, crew } = post;
                    const id = i + 1;
                    return {
                        id,
                        name,
                        img: `${`${BASE_IMAGES_URL}starships/${id}`}.jpg`,
                        content: { model, consumables, crew },
                    };
                });
                this.setState({
                    loading: false,
                    starShips: arrPosts,
                });
            })
            .catch(() =>
                this.setState({
                    error: true,
                })
            );
    };

    handleClick(activePage) {
        this.setState({ activePage });
        switch (activePage) {
            case 'people':
                this.getPeople();
                break;
            case 'planets':
                this.getPlanets();
                break;
            default:
                this.getStarShips();
        }
    }

    render() {
        const { loading, error } = this.state;
        const activePage = this.state.activePage;
        const data = this.state[activePage];

        if (loading) return <p>loading...</p>;
        if (error) return <p>error =( </p>;

        return (
            <div className="app-wrapper">
                <nav className="nav">
                    <Navbar
                        name="people"
                        isActive={activePage === 'people'}
                        onClick={() => this.handleClick('people')}
                    />
                    <Navbar
                        name="planets"
                        isActive={activePage === 'planets'}
                        onClick={() => this.handleClick('planets')}
                    />
                    <Navbar
                        name="starShips"
                        isActive={activePage === 'starShips'}
                        onClick={() => this.handleClick('starShips')}
                    />
                </nav>

                <Main posts={data} />
            </div>
        );
    }
}

export default App;
