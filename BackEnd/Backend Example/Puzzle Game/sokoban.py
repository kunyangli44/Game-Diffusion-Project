import time

import pygame

from constants import *
from utils import *


class Sokoban:
    def __init__(self, level_map):
        """
        Initialize the Sokoban game with the given level map.
        Sets up the pygame window, screen, board state, buttons, and font.
        """
        pygame.init()
        self.screen = pygame.display.set_mode(size)
        pygame.display.set_caption("Sokoban")

        # Deep copy of the level map to avoid mutating the original
        self.level_map = level_map
        self.board = [row[:] for row in level_map]

        self.font = pygame.font.SysFont("sans", 60, bold=True)
        self.font_small = pygame.font.SysFont("sans", 20)

        # Timer
        self.start_time = time.time()
        self.elapsed_time = 0
        self.win = False

        # Restart button & attempt count
        self.button_rect = pygame.Rect(20, 40, 60, 30)  # (x, y, width, height)
        self.attempts = 0

    def paint_cell(self, cell, x, y):
        """
        Draw a single cell at position (x, y) based on its type.
        Special handling for 'void' and 'player' as they use circles.
        """
        px = x * multiplier
        py = y * multiplier

        if cell in (VOID, PLAYER):
            circle_size = 20 if cell == PLAYER else 10
            # Background base
            pygame.draw.rect(self.screen, colors[EMPTY], (px, py, multiplier, multiplier))
            # Overlay circle
            pygame.draw.circle(
                self.screen,
                colors[cell],
                (px + multiplier // 2, py + multiplier // 2),
                circle_size
            )
        else:
            # Normal filled rectangle for other tile types
            pygame.draw.rect(
                self.screen,
                colors[cell],
                (px + 5, py + 5, multiplier - 10, multiplier - 10)
            )

    def render(self):
        """
        Render the entire board and check for win condition.
        """
        self.screen.fill(colors[EMPTY])
        for y, row in enumerate(self.board):
            for x, cell in enumerate(row):
                self.paint_cell(cell, x, y)

        # Restart button
        pygame.draw.rect(self.screen, colors[BUTTON], self.button_rect)
        button_label = self.font_small.render("Restart", True, (255, 255, 255))
        self.screen.blit(button_label, (24, 44))

        if not self.win:
            self.elapsed_time = int(time.time() - self.start_time)
        # Draw timer at top left
        timer_text = self.font_small.render(f"Time: {self.elapsed_time}s", True, (0, 0, 0))
        self.screen.blit(timer_text, (20, 10))

        # Win condition: all VOID cells are filled and enough SUCCESS_BLOCKs exist
        void_count = sum(row.count(VOID) for row in self.board)
        success_count = sum(row.count(SUCCESS_BLOCK) for row in self.board)
        if void_count == 0 and success_count >= 6:
            # Show win message
            self.win = True
            # Win screen
            self.screen.fill((17, 17, 17))
            win_msg = self.font.render("U WIN!!", True, colors[SUCCESS_BLOCK])
            time_msg = self.font.render(f"Time: {self.elapsed_time}s", True, (255, 255, 255))
            attempt_msg = self.font.render(f"Attempts: {self.attempts}", True, (255, 255, 255))
            self.screen.blit(win_msg, (65, 250))
            self.screen.blit(time_msg, (65, 320))
            self.screen.blit(attempt_msg, (65, 390))

        pygame.display.flip()

    def find_player_coords(self):
        """
        Locate the player on the board.
        Returns a dict with player's x, y coordinates.
        """
        for y, row in enumerate(self.board):
            if PLAYER in row:
                x = row.index(PLAYER)
                return {'x': x, 'y': y}

    def move_player(self, player, direction):
        """
        Move the player one step in the specified direction.
        Replaces the previous cell with either EMPTY or VOID depending on original map.
        """
        x, y = player['x'], player['y']
        dx, dy = direction

        # Restore previous cell to original state
        self.board[y][x] = VOID if isVoid(self.level_map[y][x]) else EMPTY
        self.board[y + dy][x + dx] = PLAYER

    def move_player_and_boxes(self, player, direction):
        """
        Handles logic for moving boxes (blocks) if the player is pushing one.
        Supports pushing multiple blocks if space allows.
        """
        x, y = player['x'], player['y']
        dx, dy = direction

        new_x, new_y = x + dx, y + dy
        box_x, box_y = x + 2 * dx, y + 2 * dy

        # Abort if pushing into a wall
        if isWall(self.board[box_y][box_x]):
            return

        # Case: pushing multiple blocks in a line
        if isBlock(self.board[box_y][box_x]):
            blocks = countBlocks(1, box_y, box_x, direction, self.board)
            final_x = getX(new_x, direction, blocks)
            final_y = getY(new_y, direction, blocks)

            if isTraversible(self.board[final_y][final_x]):
                # Push all blocks one step
                for i in range(blocks):
                    bx = getX(box_x, direction, i)
                    by = getY(box_y, direction, i)
                    self.board[by][bx] = SUCCESS_BLOCK if isVoid(self.level_map[by][bx]) else BLOCK
                self.move_player(player, direction)
        else:
            # Single block push
            self.board[box_y][box_x] = SUCCESS_BLOCK if isVoid(self.level_map[box_y][box_x]) else BLOCK
            self.move_player(player, direction)

    def move(self, direction):
        """
        General movement handler for the player.
        If adjacent cell is walkable, move there.
        If it's a block, attempt to push.
        """
        player = self.find_player_coords()
        x, y = player['x'], player['y']
        dx, dy = direction

        adj = self.board[y + dy][x + dx]

        if isTraversible(adj):
            self.move_player(player, direction)
        elif isBlock(adj):
            self.move_player_and_boxes(player, direction)

    def restart(self):
        """
        Restart the game
        """
        self.board = [row[:] for row in self.level_map]
        self.start_time = time.time()
        self.elapsed_time = 0
        self.win = False
        self.attempts += 1
