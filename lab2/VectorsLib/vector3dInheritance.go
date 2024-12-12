package VectorsLib

import "math"

type Vector3dInheritance struct {
	*Vector2D
	z float64
}

func NewVector3dI(v2 *Vector2D, z_new float64) *Vector3dInheritance {
	return &Vector3dInheritance{v2, z_new}
}

func (v3 *Vector3dInheritance) GetComponents() []float64 {
	return []float64{v3.x, v3.y, v3.z}
}

func (v3 *Vector3dInheritance) Abs() float64 {
	data := v3.GetComponents()
	return math.Sqrt(math.Pow(data[0], 2) + math.Pow(data[1], 2) + math.Pow(data[2], 2))
}

func (v3 *Vector3dInheritance) Cdot(other IVector) float64 {
	data := v3.GetComponents()
	otherdata := other.GetComponents()
	return data[0]*otherdata[0] + data[1]*otherdata[1] + data[2]*otherdata[2]
}

func (v3 *Vector3dInheritance) GetSrcV() IVector {
	return v3
}

func (v3 *Vector3dInheritance) Cross(other IVector) *Vector3dInheritance {
	a := v3.GetComponents()
	b := other.GetComponents()

	var b_z float64 = 0
	if len(b) > 2 {
		b_z = b[2]
	}

	res_x := a[1]*b_z - a[2]*b[1]
	res_y := a[2]*b[0] - a[0]*b_z
	res_z := a[0]*b[1] - a[1]*b[0]

	return &Vector3dInheritance{
		Vector2D: &Vector2D{x: res_x, y: res_y},
		z:        res_z,
	}
}
