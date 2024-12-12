package VectorsLib

type IVector interface {
	Abs() float64
	Cdot(other IVector) float64
	GetComponents() []float64
}
