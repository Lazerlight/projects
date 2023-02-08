const GRID_SIZE = 32;

export function randomPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}
export function outsideGrid(position) {
  return (
    position.x > GRID_SIZE ||
    position.y > GRID_SIZE ||
    position.x < 1 ||
    position.y < 1
  );
}
