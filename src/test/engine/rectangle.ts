/**
 * Created by admin on 7/29/2015.
 */
/// <reference path = "meshObj.ts"/>
module cc.demo {
    // make mesh Obj from a rectangle
    export class Rectangle {
        numberOfPoint: number = 0;
        static generateMesh(width, height, numberOfPointX, numberOfPointY):MeshObj {
            var obj = new MeshObj(numberOfPointX, numberOfPointY);
            var i, j, x, y, u, v;
            var p0, p1, p2, p3;

            // generate points
            for (j = 0; j < numberOfPointY; j++) {
                y = j * (height/(numberOfPointY - 1));
                u = y / height;
                for (i = 0;  i < numberOfPointX; i++) {
                    x = i * (width/(numberOfPointX - 1));
                    v = x / width;
                    obj.addVertex2D(x, y, u, v);
                }
            }

            // generate cells:
            for (j = 0; j < numberOfPointY - 1; j++) {
                for (i = 0; i < numberOfPointX - 1; i++) {
                    p0 = i + (j * numberOfPointX);
                    p1 = p0 + 1;
                    p2 = p0 + numberOfPointX;
                    p3 = p2 + 1;
                    obj.addQuadCell(p0, p1, p2, p3);
                }
            }

            return obj;
        }
    }
}