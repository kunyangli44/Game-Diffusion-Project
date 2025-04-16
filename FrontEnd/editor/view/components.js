import React, {Component} from 'react';

/* Game Object Types */
/*
Sprite2D {
    ID: int, 
    Type: "Sprite2D", 
    Name: String,
    Components: [
    ImageBox,
    Transform,
    AddScript
    ]
}

RigidBody2D {
    ID: int, 
    Type: "RigidBody2D", 
    Name: String,
    Components: [
    Transform,
    AddScript
    ]
}

TileMap2D {
    ID: int,
    Type: "TileMap2D", 
    Name: String,
    Components: [
        TileSet,
        BackgroundColor,
        LineColor,
        DrawGrid,
        AddScript
    ]
}
*/
// TODO: Add recursion for ListGameObject so that it can contain itself.
// TODO: Replace props with full on JS objects.
// TODO: Add customizability for the grid.
/* ObjectEditor List Components*/
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

class AddScript extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <li className="dropdown">
                <button className="midBtn">
                    <iconify-icon icon="mingcute:paper-line"></iconify-icon>
                    <strong>Add Script</strong>
                </button>
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

class TileSet extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="dropdown">
                <button className="midBtn">
                    <iconify-icon icon="mdi:grid"></iconify-icon>
                    <strong>Tile Set</strong>
                </button>
            </li>
        )
    }
}

class BackgroundColor extends Component {
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
                <button className="midBtn" onClick={this.onDropdownClicked}>
                    <iconify-icon icon="mdi:grid"></iconify-icon>
                    <strong>Background Color</strong>
                </button>
                <ul className={this.state.isDropDownVisible ? "dropdownContent" : "dropdownContent hidden" }>
                    <li>
                        <input
                            type="text"
                            onChange={this.props.onBackgroundColorChange}
                            placeholder="Enter text here"
                        />
                    </li>
                </ul>
            </li>
        )
    }
}

class LineColor extends Component {
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
                <button className="midBtn" onClick={this.onDropdownClicked}>
                    <iconify-icon icon="mdi:grid"></iconify-icon>
                    <strong>Line Color</strong>
                </button>
                <ul className={this.state.isDropDownVisible ? "dropdownContent" : "dropdownContent hidden" }>
                    <li>
                        <input
                            type="text"
                            onChange={this.props.onLineColorChange}
                            placeholder="Enter text here"
                        />
                    </li>
                </ul>
            </li>
        )
    }
}

class DrawGrid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="dropdown">
                <button className="midBtn" onClick={this.props.onDrawGridClick}>
                    <iconify-icon icon="mdi:grid"></iconify-icon>
                    <strong>Draw Grid</strong>
                </button>
            </li>
        )
    }
}
/* Miscellaneous Components */
class ListGameObject extends Component {
    
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
        const {onGameObjectClicked, gameObject} = this.props;
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
                    onClick={() => {onGameObjectClicked(gameObject)}}>
                        <iconify-icon icon="majesticons:image-frame"></iconify-icon>
                    <strong>{gameObject.name}</strong>
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

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.drawCanvas = this.drawCanvas.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.drawImageOnTile = this.drawImageOnTile.bind(this);
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate(prevProps) {
    // Re-draw the canvas if props like width, height, tileSize, or backgroundColor change
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height ||
      prevProps.tileSize !== this.props.tileSize ||
      prevProps.backgroundColor !== this.props.backgroundColor ||
      prevProps.drawGrid !== this.props.drawGrid
    ) {
      this.drawCanvas();
    }
  }

  drawCanvas() {
    const {width, height, drawGrid, backgroundColor, lineColor} = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas and set background color
    ctx.fillStyle = backgroundColor || 'white';
    ctx.fillRect(0, 0, width, height);


    // Optionally draw the grid
    if (drawGrid) {
      const { width, height, tileSize } = this.props;
      ctx.strokeStyle = lineColor;

      for (let x = 0; x <= width; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
  };

  handleClick(event) {
    const canvas = this.canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const { tileSize, onTileClick } = this.props;

    const x = Math.floor((event.clientX - rect.left) / tileSize);
    const y = Math.floor((event.clientY - rect.top) / tileSize);

    this.drawImageOnTile(x, y); // Draw the image on the clicked tile

    if (onTileClick) {
      onTileClick(x, y); // Pass the clicked tile coordinates to the parent component
    }
  };

  drawImageOnTile(tileX, tileY) {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { tileSize, selectedTile } = this.props;
    ctx.drawImage(
      selectedTile, // The loaded image
      tileX * tileSize, // X position on the canvas
      tileY * tileSize, // Y position on the canvas
      tileSize, // Width of the image (scaled to the tile size)
      tileSize // Height of the image (scaled to the tile size)
    );
  };

  render() {
    const { width, height } = this.props;

    return (
      <canvas
        ref={this.canvasRef}
        width={width}
        height={height}
        style={{ border: '1px solid black' }}
        onClick={this.handleClick}
      ></canvas>
    );
  }
}

/* Sections of the editor */
class SideBar extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        const listGameObjects = this.props.gameObjects.map((gameObject, index) => {
            return (<ListGameObject key={index} gameObject={gameObject} onGameObjectClicked={this.props.onGameObjectClicked}/>)
        });

        return (
        <section id="game-objects" className="sidebar">
        <h1>Game Objects</h1>
        <ul>
            {listGameObjects}
        </ul>
        </section>
        );
    }
}

class GameWindow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {tileSize, backgroundColor, lineColor, drawGrid, selectedTile, onTileClick} = this.props;
        return (
        <section id="game-window" className="container">
            <h1>Game Editor</h1>
            <div>
                <button className="btn" id="playGameBtn">Play Game</button>
                <button className="btn" id="buildGameBtn">Build Game</button>
            </div>
            <Canvas
            width={800}
            height={400}
            tileSize={tileSize}
            backgroundColor={backgroundColor}
            lineColor={lineColor}
            drawGrid={drawGrid}
            selectedTile={selectedTile}
            onTileClick={onTileClick}
            />
            </section>
        )
    }
}

class ObjectEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {gameObject} = this.props;
        return (
        <section id="object-editor" className="sidebar">
            <h1>{gameObject.type}</h1>
            <h2>{gameObject.name}</h2>
            <ul>
                {gameObject.components}
            </ul>
        </section>
        );
    }
}

/* Complete view */
export class EditorView extends Component {
    constructor(props) {
        super(props);
        this.onDrawGridClick = this.onDrawGridClick.bind(this);
        this.onBackgroundColorChange = this.onBackgroundColorChange.bind(this);
        this.onLineColorChange = this.onLineColorChange.bind(this);
        this.state = {
            activeObject: {
                id: 0,
                type: "Sprite2D",
                name: "Sprite1",
                components: [<ImageBox key={0}/>,
                    <Transform key={1}/>,
                    <AddScript key={2}/>
                ]
            },
            gameObjects: [
                {
                    id:0, 
                    name:"Sprite1", 
                    type:"Sprite2D",
                    components: [<ImageBox key={3}/>,
                        <Transform key={4}/>,
                        <AddScript key={5}/>
                    ]
                },
                {
                    id:1, 
                    name:"Sprite2", 
                    type:"Sprite2D",
                    components: [<ImageBox key={6}/>,
                        <Transform key={7}/>,
                        <AddScript key={8}/>
                    ]
                },
                {
                    id:2, 
                    name:"RigidBody", 
                    type:"RigidBody2D",
                    components: [
                        <Transform key={9}/>,
                        <AddScript key={10}/>
                    ]
                },
                {
                    id:3, 
                    name:"Tilemap", 
                    type:"Grid2D",
                    components: [
                        <Transform key={11}/>,
                        <TileSet key={12}/>,
                        <BackgroundColor key={13} onBackgroundColorChange={this.onBackgroundColorChange}/>,
                        <LineColor key={14} onLineColorChange={this.onLineColorChange}/>,
                        <DrawGrid key={15} onDrawGridClick={this.onDrawGridClick}/>,
                        <AddScript key={16}/>
                    ]
                },
            ],
            tileSize: 20,
            backgroundColor: 'gray',
            lineColor: 'black',
            drawGrid: false,
        };
        this.onGameObjectClicked = this.onGameObjectClicked.bind(this);
        this.onTileClick = this.onTileClick.bind(this);
    }

    onGameObjectClicked(gameObject) {
        this.setState(() => { return  {activeObject: gameObject}});
    }

    onDrawGridClick() {
        console.log("this:", this);
        this.setState((prevState) => {return {drawGrid: !prevState.drawGrid};});
    }

    onTileClick(x, y) {
        console.log(`Tile clicked at (${x}, ${y})`);
    };

    onBackgroundColorChange(event) {
        this.setState({ backgroundColor: event.target.value });
    }

    onLineColorChange(event) {
        this.setState({ lineColor: event.target.value });
    }

    componentDidMount() {
        var rows = 5;
        var cols = 5;
        const initialGrid = Array.from({ length: rows }, () =>Array.from({ length: cols }, () => null));
        const initialTile = new Image();
        initialTile.src = "data:image/jpeg;base64,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";
        this.setState(() => {return {grid: initialGrid, selectedTile: initialTile}});
        return;
    }

    render() {
        const {activeObject, gameObjects, tileSize, backgroundColor, lineColor, drawGrid, selectedTile} = this.state;
        return(
            <div className="side-by-side">
                <SideBar gameObjects={gameObjects} onGameObjectClicked={this.onGameObjectClicked}/>
                <GameWindow 
                tileSize={tileSize}
                backgroundColor={backgroundColor}
                lineColor={lineColor}
                drawGrid={drawGrid}
                selectedTile={selectedTile}
                onTileClick={this.onTileClick}
                ref={this.gameWindowRef}/>
                <ObjectEditor gameObject={activeObject}/>
            </div>
        )
    }
} 