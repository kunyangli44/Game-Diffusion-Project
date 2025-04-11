from typing import List, Dict, Tuple, Optional

class Game():
    gameId: str
    userId: str
    type: str = "puzzle"
    boardSize: Tuple[int, int]  # e.g., (5, 5)
    layout: List[List[str]]  # 2D grid, values like "wall", "box", "goal"
    assetRefs: Dict[str, str]  # e.g., { "wall": "asset123", "player": "asset456" }
    createdAt: Optional[str] = None
    lastUpdated: Optional[str] = None