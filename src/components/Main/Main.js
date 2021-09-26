import React, { Component } from 'react';
import { BASE_IMAGES_URL } from '../../services/service';
import './Main.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
        this.handlerOnClick = this.handlerOnClick.bind(this);
    }

    handlerOnClick() {
        this.setState((prev) => {
            const nextCount = prev.count < this.props.posts.length - 1 ? prev.count + 1 : 0;
            return {
                count: nextCount,
            };
        });
    }

    addDefaultSrc(ev) {
        ev.target.src = `${BASE_IMAGES_URL}big-placeholder.jpg`;
    }

    render() {
        const posts = this.props.posts;
        const i = this.state.count;
        const post = posts[i];

        return (
            <div className="main">
                <button type="button" className="main-button" onClick={this.handlerOnClick}>
                    NEXT
                </button>
                <div className="main-header">
                    <img
                        src={post.img}
                        alt={post.name}
                        onError={(e) => this.addDefaultSrc(e)}
                        className="main-img"
                    />
                    <h3 className="main-title">{post.name}</h3>
                </div>
                <ul className="main-list">
                    {Object.keys(post.content).map((key) => (
                        <li key={key} className="card-panel">
                            {key}: {post.content[key]}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Main;
