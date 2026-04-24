interface ShapeDiagramProps {
  shapeKey: string
}

export function ShapeDiagram({ shapeKey }: ShapeDiagramProps) {
  const svgs: Record<string, JSX.Element> = {
    'rectangle-6x4': (
      <svg viewBox="0 0 200 140" className="w-48 h-32">
        <rect x="20" y="20" width="160" height="100" fill="none" stroke="blue" strokeWidth="2" />
        <text x="110" y="75" textAnchor="middle" fontSize="14" fill="blue">
          6 cm × 4 cm
        </text>
        <text x="195" y="70" fontSize="12" fill="gray">
          Area = 24 cm²
        </text>
      </svg>
    ),
    square: (
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        <rect x="10" y="10" width="100" height="100" fill="none" stroke="blue" strokeWidth="2" />
        <text x="60" y="65" textAnchor="middle" fontSize="14" fill="blue">
          Side
        </text>
      </svg>
    ),
    triangle: (
      <svg viewBox="0 0 200 180" className="w-40 h-36">
        <polygon points="100,20 20,160 180,160" fill="none" stroke="blue" strokeWidth="2" />
        <text x="100" y="100" textAnchor="middle" fontSize="14" fill="blue">
          Triangle
        </text>
      </svg>
    ),
    circle: (
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        <circle cx="60" cy="60" r="50" fill="none" stroke="blue" strokeWidth="2" />
        <line x1="60" y1="60" x2="110" y2="60" stroke="blue" strokeWidth="2" />
        <text x="85" y="55" fontSize="12" fill="blue">
          r
        </text>
        <text x="60" y="15" textAnchor="middle" fontSize="14" fill="blue">
          Circle
        </text>
      </svg>
    ),
    cube: (
      <svg viewBox="0 0 150 150" className="w-36 h-36">
        <polygon points="30,50 80,20 130,50 130,100 80,130 30,100" fill="lightblue" stroke="blue" strokeWidth="2" />
        <line x1="30" y1="50" x2="30" y2="100" stroke="blue" strokeWidth="2" />
        <line x1="80" y1="20" x2="80" y2="130" stroke="blue" strokeWidth="2" />
        <line x1="130" y1="50" x2="130" y2="100" stroke="blue" strokeWidth="2" />
        <text x="75" y="75" textAnchor="middle" fontSize="14" fill="darkblue">
          Cube
        </text>
      </svg>
    ),
    cylinder: (
      <svg viewBox="0 0 150 200" className="w-32 h-40">
        <ellipse cx="75" cy="30" rx="40" ry="15" fill="lightblue" stroke="blue" strokeWidth="2" />
        <line x1="35" y1="30" x2="35" y2="150" stroke="blue" strokeWidth="2" />
        <line x1="115" y1="30" x2="115" y2="150" stroke="blue" strokeWidth="2" />
        <ellipse cx="75" cy="150" rx="40" ry="15" fill="lightblue" stroke="blue" strokeWidth="2" />
        <text x="75" y="95" textAnchor="middle" fontSize="14" fill="darkblue">
          Cylinder
        </text>
      </svg>
    ),
  }

  return (
    <div className="flex justify-center my-6">
      {svgs[shapeKey] || <div className="text-gray-500">Shape not found</div>}
    </div>
  )
}
