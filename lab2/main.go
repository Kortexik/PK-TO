package main

import (
	"TO/lab2/VectorsLib"
	"fmt"
)

func main() {
	vec1 := VectorsLib.NewVector2D(1.32, 2.65)
	vec2 := VectorsLib.NewVector2D(3.123, 4.43)
	vec3 := VectorsLib.NewVector2D(5.09, 6)

	vec1P := VectorsLib.NewVector2DPolarA(vec1)
	vec2P := VectorsLib.NewVector2DPolarA(vec2)
	vec3P := VectorsLib.NewVector2DPolarA(vec3)

	vec13d := VectorsLib.NewVector3dD(vec1, 0)
	vec23d := VectorsLib.NewVector3dD(vec2, 0)
	vec33d := VectorsLib.NewVector3dD(vec3, 0)

	fmt.Println("Wektor\tWspolrzedne w ukladzie kartezjanskim\tWspolrzedne w ukladzie biegunowym")
	fmt.Printf("Vec1\t%v\tr = %f\tphi = %f\n", vec1.GetComponents(), vec1P.Abs(), vec1P.GetAngle())
	fmt.Printf("Vec2\t%v\tr = %f\tphi = %f\n", vec2.GetComponents(), vec2P.Abs(), vec2P.GetAngle())
	fmt.Printf("Vec3\t%v\tr = %f\tphi = %f\n", vec3.GetComponents(), vec3P.Abs(), vec3P.GetAngle())

	fmt.Println("\nv1 dot v2 =", vec1.Cdot(vec2))
	fmt.Println("v1 dot v3 =", vec1.Cdot(vec3))
	fmt.Println("v2 dot v3 =", vec2.Cdot(vec3))

	fmt.Println("\nv1 cross v2 =", vec13d.Cross(vec23d).GetComponents())
	fmt.Println("v1 cross v3 =", vec13d.Cross(vec33d).GetComponents())
	fmt.Println("v2 cross v3 =", vec23d.Cross(vec33d).GetComponents())

	fmt.Println("\nv2 cross v1 =", vec23d.Cross(vec13d).GetComponents())
	fmt.Println("v3 cross v1 =", vec33d.Cross(vec13d).GetComponents())
	fmt.Println("v3 cross v2 =", vec33d.Cross(vec23d).GetComponents())

	/* DZIEDZICZENIE

	vec1i := VectorsLib.NewVector2D(112, -2)
	vec2i := VectorsLib.NewVector2D(-3, -432)
	vec3i := VectorsLib.NewVector2D(54, 6)

	vec1Pi := VectorsLib.NewVector2DPolarI(vec1i)
	vec2Pi := VectorsLib.NewVector2DPolarI(vec2i)
	vec3Pi := VectorsLib.NewVector2DPolarI(vec3i)

	vec13di := VectorsLib.NewVector3dI(vec1i, 0)
	vec23di := VectorsLib.NewVector3dI(vec2i, 0)
	vec33di := VectorsLib.NewVector3dI(vec3i, 0)

	fmt.Println("\n\nWektor\tWspolrzedne w ukladzie kartezjanskim\tWspolrzedne w ukladzie biegunowym")
	fmt.Printf("Vec1\t%v\tr = %f\tphi = %f\n", vec1i.GetComponents(), vec1Pi.Abs(), vec1Pi.GetAngle())
	fmt.Printf("Vec2\t%v\tr = %f\tphi = %f\n", vec2i.GetComponents(), vec2Pi.Abs(), vec2Pi.GetAngle())
	fmt.Printf("Vec3\t%v\tr = %f\tphi = %f\n", vec3i.GetComponents(), vec3Pi.Abs(), vec3Pi.GetAngle())

	fmt.Println("\nv1 dot v2 =", vec1i.Cdot(vec2i))
	fmt.Println("v1 dot v3 =", vec1i.Cdot(vec3i))
	fmt.Println("v2 dot v3 =", vec2i.Cdot(vec3i))

	fmt.Println("\nv1 cross v2 =", vec13di.Cross(vec23di).GetComponents())
	fmt.Println("v1 cross v3 =", vec13di.Cross(vec33di).GetComponents())
	fmt.Println("v2 cross v3 =", vec23di.Cross(vec33di).GetComponents())

	*/
}
