package VectorsLib

import "math"

type PolarInheritance2D struct {
	*Vector2D
}

func NewVector2DPolarI(v2 *Vector2D) *PolarInheritance2D {
	return &PolarInheritance2D{v2}
}

func (v *PolarInheritance2D) GetAngle() float64 {
	data := v.GetComponents()
	AngleRadians := math.Atan(data[1] / data[0])
	return AngleRadians * 180 / math.Pi
}
