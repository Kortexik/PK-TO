package VectorsLib

import "math"

type Polar2DAdapter struct {
	srcVector *Vector2D
}

func NewVector2DPolarA(vec2d *Vector2D) *Polar2DAdapter {
	return &Polar2DAdapter{srcVector: vec2d}
}

func (vp *Polar2DAdapter) GetComponents() []float64 {
	return vp.srcVector.GetComponents()
}

func (vp *Polar2DAdapter) Abs() float64 {
	return vp.srcVector.Abs()
}

func (vp *Polar2DAdapter) GetSrc() *Vector2D {
	return vp.srcVector
}

func (vp *Polar2DAdapter) SetSrc(vec2d *Vector2D) {
	vp.srcVector = vec2d
}

func (vp *Polar2DAdapter) Cdot(other IVector) float64 {
	return vp.srcVector.Cdot(other)
}

func (vp *Polar2DAdapter) GetAngle() float64 {
	data := vp.GetComponents()
	AngleRadians := math.Atan(data[1] / data[0])
	return AngleRadians * 180 / math.Pi
}
