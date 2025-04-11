from constants import BLOCK, SUCCESS_BLOCK, WALL, VOID, EMPTY

def getX(x, direction, step=1):
    """
    Calculate new x-coordinate.
    """
    dx, _ = direction
    return x + dx * step

def getY(y, direction, step=1):
    """
    Calculate new y-coordinate.
    """
    _, dy = direction
    return y + dy * step

def isWall(cell):
    """
    Check if a cell is a wall.
    """
    return cell == WALL

def isVoid(cell):
    """
    Check if a cell is a void tile (goal location).
    """
    return cell == VOID

def isBlock(cell):
    """
    Check if a cell is a moveable box (either regular or on a goal).
    """
    return cell in (BLOCK, SUCCESS_BLOCK)

def isTraversible(cell):
    """
    Check if a cell can be walked into (empty space or goal).
    """
    return cell in (EMPTY, VOID)

def countBlocks(depth, y, x, direction, board):
    """
    Count how many consecutive blocks are aligned in the given direction.
    Used to determine if multiple blocks can be pushed.

    Args:
        depth: not used (reserved for future)
        y, x: starting coordinates
        direction: (dx, dy) tuple
        board: 2D list representing the board

    Returns:
        Integer number of consecutive blocks in the direction
    """
    count = 1
    while True:
        new_x = getX(x, direction, count)
        new_y = getY(y, direction, count)

        # Out of bounds
        if new_y < 0 or new_y >= len(board) or new_x < 0 or new_x >= len(board[0]):
            break

        # Not a block anymore
        if not isBlock(board[new_y][new_x]):
            break

        count += 1

    return count