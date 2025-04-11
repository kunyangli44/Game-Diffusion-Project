import pygame
from constants import directions, level_one_map
from sokoban import Sokoban

def main():
    sokoban = Sokoban(level_one_map)
    clock = pygame.time.Clock()
    running = True

    while running:
        sokoban.render()
        for event in pygame.event.get():
            # print(event)
            if event.type == pygame.QUIT:
                running = False

            # If the player clicks restart
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if sokoban.button_rect.collidepoint(event.pos):
                    print("Restart button clicked")
                    sokoban.restart()

            elif event.type == pygame.KEYDOWN:
                # Move player on key press
                # print("Key pressed:", event.key)
                if event.key in (pygame.K_UP, pygame.K_w):
                    sokoban.move(directions['up'])
                elif event.key in (pygame.K_DOWN, pygame.K_s):
                    sokoban.move(directions['down'])
                elif event.key in (pygame.K_LEFT, pygame.K_a):
                    sokoban.move(directions['left'])
                elif event.key in (pygame.K_RIGHT, pygame.K_d):
                    sokoban.move(directions['right'])



    clock.tick(10)

    pygame.quit()

if __name__ == '__main__':
    main()