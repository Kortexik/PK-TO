package VectorsLib

import "math"

type Vector2D struct {
	x float64
	y float64
}

func NewVector2D(x, y float64) *Vector2D {
	return &Vector2D{x: x, y: y}
}

func (v *Vector2D) GetComponents() []float64 {
	return []float64{v.x, v.y}
}

func (v *Vector2D) GetX() float64 {
	return v.x
}

func (v *Vector2D) GetY() float64 {
	return v.y
}

func (v *Vector2D) SetX(x float64) {
	v.x = x
}

func (v *Vector2D) SetY(y float64) {
	v.y = y
}

func (v *Vector2D) Set(x, y float64) {
	v.x = x
	v.y = y
}

func (v *Vector2D) Abs() float64 {
	data := v.GetComponents()
	return math.Sqrt(math.Pow(data[0], 2) + math.Pow(data[1], 2))
}

func (v *Vector2D) Cdot(other IVector) float64 {
	first := v.GetComponents()
	second := other.GetComponents()
	return first[0]*second[0] + first[1]*second[1]
}

func (v *Vector2D) Normalize() {
	abs := v.Abs()
	v.Set(v.GetX()/abs, v.GetY()/abs)
}

func (v *Vector2D) Scale(scalar float64) {
	v.SetX(v.GetX() * scalar)
	v.SetY(v.GetY() * scalar)
}

func (v *Vector2D) CalculateDistance(other *Vector2D) float64 {
	return math.Sqrt(math.Pow(v.GetX()-other.GetX(), 2) + math.Pow(v.GetY()-other.GetY(), 2))
}
