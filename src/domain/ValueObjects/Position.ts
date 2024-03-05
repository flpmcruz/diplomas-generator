interface PositionProps {
  xFallback: number;
  yFallback: number;
  x?: number;
  y?: number;
}

export class Position {
  x: number;
  y: number;

  constructor({ xFallback, yFallback, x, y }: PositionProps) {
    const xValue = Number(x);
    const yValue = Number(y);

    if (isNaN(xValue) || xValue === 0) this.x = xFallback / 2;
    else this.x = xValue;

    if (isNaN(yValue) || yValue === 0) this.y = yFallback / 2;
    else this.y = yValue;
  }
}
