package mylib

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

func (v *Vector2D) Abs() float64 {
	data := v.GetComponents()
	return math.Sqrt(math.Pow(data[0], 2) + math.Pow(data[1], 2))
}

func (v *Vector2D) Cdot(other IVector) float64 {
	first := v.GetComponents()
	second := other.GetComponents()
	return first[0]*second[0] + first[1]*second[1]
}
