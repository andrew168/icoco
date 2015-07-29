/**
 * Created by admin on 7/29/2015.
 */
module cc.demo {
    export class MeshObj {
        numberOfPoint: number = 0;
        numberOfPointX: number = 0;
        numberOfPointY: number = 0;
        vertices: Array<number> = [];  // (x,y,z) for each points, z = 0
        UVs: Array<number> = [];
        indices: Array<number> = []; // index of vertex, anti-clockwise

        constructor(numberOfPointX, numberOfPointY) {
            this.numberOfPointX = numberOfPointX;
            this.numberOfPointY = numberOfPointY;
        }

        addVertex2D(x,y, u,v) {
            this.vertices.push(x);
            this.vertices.push(y);
            this.vertices.push(0);
            this.UVs.push(u);
            this.UVs.push(v);
            this.numberOfPoint++;
        }

        addQuadCell(p0, p1, p2, p3) {
            // Quad Cell format:
            // p2 -----  p3
            //    |   |
            // p0 -----  p1

            // triangle 1: p0-p1-p2;
            var triangles = this.indices;
            triangles.push(p0);
            triangles.push(p1);
            triangles.push(p2);

            // triangle 2: p1-p3-p2;
            triangles.push(p1);
            triangles.push(p3);
            triangles.push(p2);
        }

        // plus the patch at point[i,j]
        plus(i:number, j:number, dx: number, dy:number) {
            var xIndex = this._getXIndex(i, j);
            var yIndex = xIndex + 1;

            this.vertices[xIndex] += dx;
            this.vertices[yIndex] += dy;
        }

        minus(i:number, j:number, dx: number, dy:number) {
            var xIndex = this._getXIndex(i, j);
            var yIndex = xIndex + 1;

            this.vertices[xIndex] -= dx;
            this.vertices[yIndex] -= dy;
        }

        _getXIndex(i, j) {
            if ((i > this.numberOfPointX) ||
                (j > this.numberOfPointY)) {
                return 0;
            }

            var pt = i + j * this.numberOfPointX;
            return pt * 3;
        }
    }
}
