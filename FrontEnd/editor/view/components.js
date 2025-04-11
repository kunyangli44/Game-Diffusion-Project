import React, {Component} from 'react';

// TODO: Add recursion for ListGameObject so that it can contain itself.
// TODO: Replace props with full on JS objects.
class Transform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropDownVisible: false,
        }

        this.onDropdownClicked = this.onDropdownClicked.bind(this);
    }

    onDropdownClicked(event) {
        this.setState((prevState) => {
            return {isDropDownVisible: !prevState.isDropDownVisible};
        });
        return;
    }

    render() {
        return (
            <li className="dropdown">
            <button className="midBtn dropdownBtn" onClick={this.onDropdownClicked}>
                <iconify-icon icon="humbleicons:arrows"></iconify-icon>
                <strong>Transform</strong>
            </button>
            <ul className={this.state.isDropDownVisible ? "dropdownContent" : "dropdownContent hidden" }>
                <li>
                <p>Position</p>
                <div className="side-by-side">
                    <label>X</label>
                    <input type="number" name="number" step="0.001"/>
                </div>
                <div className="side-by-side">
                    <label>Y</label>
                    <input type="number" name="number" step="0.001"/>
                </div>
                </li>
                <li>
                <p>Rotation</p>
                <input type="number" name="number" min="-360" max="360" step="0.001"/>
                </li>
                <li>
                <p>Scale</p>
                <div className="side-by-side">
                    <label>X</label>
                    <input type="number" name="number" step="0.001"/>
                </div>
                <div className="side-by-side">
                    <label>Y</label>
                    <input type="number" name="number" step="0.001"/>
                </div>
                </li>
            </ul>
            </li> 
        )
    }
}

class ImageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropDownVisible: false,
        }
        this.state = {
            image: null
        }

        this.onDropdownClicked = this.onDropdownClicked.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
    }

    onDropdownClicked(event) {
        this.setState((prevState) => {
            return {isDropDownVisible: !prevState.isDropDownVisible};
        });
        return;
    }

    handleDrop(event) {
        alert("Image dropped!");
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.setState(() => {return{image:e.target.result};}, () => {console.log(this.state.image);}); // Save image preview in state
                };
                reader.readAsDataURL(file);
                
            } else {
                alert("Please drop an image file!");
            }
        }
    }

    handleDragOver(event) {
        event.preventDefault(); // Allow drop by preventing default behavior
    };

    handleFileInput(event) {
        alert("File inputted!");
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.setState(() => {return{image:e.target.result};}); 
            };
            reader.readAsDataURL(file);
            console.log(this.state.image);
        }
    };

    render() {
        return (
            <li className="dropdown">
            <button className="midBtn dropdownBtn" onClick={this.onDropdownClicked}>
                <iconify-icon icon="humbleicons:arrows"></iconify-icon>
                <strong>Image</strong>
            </button>
            <ul className={this.state.isDropDownVisible ? "dropdownContent" : "dropdownContent hidden" }>
                <li>
                <div className="side-by-side">
                    {this.state.image ? 
                        <div>
                        <img
                            src={this.state.image}
                            alt="Dropped Preview"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "150px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <button><strong>Clear Image</strong></button>
                        </div>
                    :
                    <div
                        id="drop-zone"
                        style={{
                            width: "300px",
                            height: "200px",
                            border: "2px dashed #ccc",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#888",
                            cursor: "pointer",
                        }}
                        onDrop={this.handleDrop}
                        onDragOver={this.handleDragOver}
                    >
                        Drag & Drop Image
                    </div>
                    }
                </div>
                </li>
            </ul>
            </li> 
        );   
    }
}

export class ListGameObject extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isGameObjectVisible:  true,
            isDropDownVisible: false,
        }
        this.onVisibleClicked = this.onVisibleClicked.bind(this);
        this.onDropdownClicked = this.onDropdownClicked.bind(this);
    }

    onVisibleClicked(event) {
        this.setState((prevState) => {
            return {isGameObjectVisible: !prevState.isGameObjectVisible};
        });
        return;
    }

    onDropdownClicked(event) {
        this.setState((prevState) => {
            return {isDropDownVisible: !prevState.isDropDownVisible};
        });
        return;
    }


    render() {
      return (
            <li  className="game-object dropdown">
                <div className="side-by-side">
                    <button className="sideBtn dropDownBtn" onClick={this.onDropdownClicked}>
                        <iconify-icon 
                        icon={this.state.isDropDownVisible ? "eva:arrow-up-fill": "eva:arrow-down-fill"}>
                        </iconify-icon>
                    </button>
                    <button 
                    className="midBtn game-object-btn" 
                    onClick={() => {this.props.onGameObjectClicked(this.props.id, this.props.type, this.props.name)}}>
                        <iconify-icon icon="majesticons:image-frame"></iconify-icon>
                    <strong>{this.props.name}</strong>
                    </button>
                    <button className="sideBtn visibilityBtn open" onClick={this.onVisibleClicked}>
                        <iconify-icon icon={this.state.isGameObjectVisible ? "mingcute:eye-2-fill" : "mingcute:eye-close-fill"}></iconify-icon>
                    </button>
                </div>
                <ul className={this.state.isDropDownVisible ? "dropdownContent" : "dropdownContent hidden"}>
                    <li className="game-object dropdown">
                        <div className="side-by-side">
                            <button className="sideBtn">
                            <iconify-icon icon="eva:arrow-down-fill"></iconify-icon>
                            </button>
                            <button className="midBtn game-object-btn">
                            <iconify-icon icon="majesticons:image-frame"></iconify-icon>
                            <strong>Sprite3</strong>
                            </button>
                            <button className="sideBtn visibilityBtn open">
                                <iconify-icon icon="mingcute:eye-2-fill"></iconify-icon>
                            </button>
                        </div>
                    </li>
                </ul>
            </li>
        );
    }
}

export class SideBar extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
        <section id="game-objects" className="sidebar">
        <h1>Game Objects</h1>
        <ul>
            <ListGameObject id="0" name="Sprite1" type="Sprite2D" onGameObjectClicked={this.props.onGameObjectClicked}/>
            <ListGameObject id="1" name="Sprite2" type="Sprite2D" onGameObjectClicked={this.props.onGameObjectClicked}/>
            <ListGameObject id="2" name="RigidBody" type="RigidBody2D" onGameObjectClicked={this.props.onGameObjectClicked}/>
        </ul>
        </section>
        );
    }
}

export class GameWindow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <section id="game-window" className="container">
            <h1>Game Editor</h1>
            <div>
                <button className="btn btn-build" id="buildGameBtn">Build Game</button>
                <button className="btn btn-play" id="playGameBtn">Play Game</button>
            </div>
            <canvas id="game-canvas" width="800" height="400"></canvas>
        </section>
        )
    }
}

export class ObjectEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropDownVisible: false,
        }

        this.onDropdownClicked = this.onDropdownClicked.bind(this);
    }

    onDropdownClicked(event) {
        this.setState((prevState) => {
            return {isDropDownVisible: !prevState.isDropDownVisible};
        });
        return;
    }

    render() {
        return (
        <section id="object-editor" className="sidebar">
            <h1>{this.props.object.type}</h1>
            <h2>{this.props.object.name}</h2>
            <ul>
                <ImageBox />
                <Transform />
                <li className="dropdown">
                <button className="midBtn">
                    <iconify-icon icon="mingcute:paper-line"></iconify-icon>
                    <strong>Add Script</strong>
                </button>
                </li>
            </ul>
        </section>
        );
    }
}

export class EditorView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeObject: {
                id: 0,
                type: "Sprite2D",
                name: "Sprite1"
            }
        }
        this.onGameObjectClicked = this.onGameObjectClicked.bind(this);
    }

    onGameObjectClicked(id, type, name) {
        this.setState(() => { return  {
            activeObject: {
                id: id,
                type: type,
                name: name,
            }
        }
        });
    }

    render() {
        return(
            <div className="side-by-side">
                <SideBar onGameObjectClicked={this.onGameObjectClicked}/>
                <GameWindow />
                <ObjectEditor object={this.state.activeObject}/>
            </div>
        )
    }
} 