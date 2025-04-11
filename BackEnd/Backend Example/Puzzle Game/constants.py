# Cell types
EMPTY = 'empty'
WALL = 'wall'
BLOCK = 'block'
SUCCESS_BLOCK = 'success_block'
VOID = 'void'
PLAYER = 'player'
BUTTON = 'button'

# Directions as (dx, dy)
directions = {
    'up': (0, -1),
    'down': (0, 1),
    'left': (-1, 0),
    'right': (1, 0),
}

# Canvas size
size = (600, 675)  # width, height
multiplier = 75    # size of each tile in pixels

# Colors
colors = {
    EMPTY: (222, 215, 179),
    WALL: (134, 134, 135),
    BLOCK: (217, 174, 10),
    SUCCESS_BLOCK: (76, 205, 90),
    VOID: (223, 187, 177),
    PLAYER: (79, 153, 232),
    BUTTON: (50, 50, 50)
}

# Initial game map (level 1)
level_one_map = [
    [EMPTY, EMPTY, WALL, WALL, WALL, WALL, WALL, EMPTY],
    [WALL, WALL, WALL, EMPTY, EMPTY, EMPTY, WALL, EMPTY],
    [WALL, VOID, PLAYER, BLOCK, EMPTY, EMPTY, WALL, EMPTY],
    [WALL, WALL, WALL, EMPTY, BLOCK, VOID, WALL, EMPTY],
    [WALL, VOID, WALL, WALL, BLOCK, EMPTY, WALL, EMPTY],
    [WALL, EMPTY, WALL, EMPTY, VOID, EMPTY, WALL, WALL],
    [WALL, BLOCK, EMPTY, SUCCESS_BLOCK, BLOCK, BLOCK, VOID, WALL],
    [WALL, EMPTY, EMPTY, EMPTY, VOID, EMPTY, EMPTY, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
]
