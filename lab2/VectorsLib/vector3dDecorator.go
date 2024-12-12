package VectorsLib

import "math"

type Vector3DDecorator struct {
	srcVector IVector
	z         float64
}

func NewVector3dD(Src IVector, ZValue float64) *Vector3DDecorator {
	return &Vector3DDecorator{srcVector: Src, z: ZValue}
}

func (v3 *Vector3DDecorator) Abs() float64 {
	data := v3.GetComponents()
	return math.Sqrt(math.Pow(data[0], 2) + math.Pow(data[1], 2) + math.Pow(data[2], 2))
}

func (v3 *Vector3DDecorator) Cdot(other IVector) float64 {
	data := v3.GetComponents()
	otherdata := other.GetComponents()
	return data[0]*otherdata[0] + data[1]*otherdata[1] + data[2]*otherdata[2]
}

func (v3 *Vector3DDecorator) GetComponents() []float64 {
	data := v3.srcVector.GetComponents()
	return append(data, v3.z)
}

func (v3 *Vector3DDecorator) Cross(other IVector) *Vector3DDecorator {
	a := v3.GetComponents()
	b := other.GetComponents()

	b_z := 0.0
	if len(b) > 2 {
		b_z = b[2]
	}

	resX := a[1]*b_z - a[2]*b[1]
	resY := a[2]*b[0] - a[0]*b_z
	resZ := a[0]*b[1] - a[1]*b[0]

	return &Vector3DDecorator{
		srcVector: &Vector2D{x: resX, y: resY},
		z:         resZ,
	}
}

func (v3 *Vector3DDecorator) GetSrcV() IVector {
	return v3.srcVector
}
